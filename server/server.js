import express from 'express';
import fs from 'fs';
import { exec } from 'child_process';
import cors from 'cors';
import path from 'path';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5003;
const TESTS_DIR = path.join(process.cwd(), 'tests');
const VIDEOS_DIR = path.join(process.cwd(), 'videos');
const SCREENSHOTS_DIR = path.resolve(process.cwd(), 'screenshots');


const JENKINS_URL = 'http://localhost:8080/job/testBase/build';
const JENKINS_USER = 'oguzhansaritas';
const JENKINS_TOKEN = '11ebe8b143b2208b33e74508265c356812';
const JENKINS_LAST_BUILD_URL = 'http://localhost:8080/job/testBase/lastBuild/api/json';

// ✅ **Jenkins'in en son build ID'sini alır**
async function getLastBuildId() {
    console.log("⏳ Build ID alınmadan önce 5 saniye bekleniyor...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        const response = await axios.get(JENKINS_LAST_BUILD_URL, {
            auth: { username: JENKINS_USER, password: JENKINS_TOKEN }
        });
        return response.data.id;
    } catch (error) {
        console.error("❌ Jenkins build ID alınırken hata:", error.message);
        return null;
    }
}

// ✅ **Jenkins job'unun bitmesini bekler**
async function waitForJenkinsSuccess(buildId) {
    if (!buildId) {
        console.error("❌ Geçerli bir build ID bulunamadı!");
        return false;
    }

    const consoleLogUrl = `http://localhost:8080/job/testBase/${buildId}/consoleText`;
    console.log(`⏳ Jenkins çıktısı kontrol ediliyor: ${consoleLogUrl}`);

    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
        try {
            const response = await axios.get(consoleLogUrl, {
                auth: { username: JENKINS_USER, password: JENKINS_TOKEN }
            });

            if (response.data.includes("Finished: SUCCESS")) {
                console.log("✅ Jenkins job başarıyla tamamlandı!");
                return true;
            }

            if (response.data.includes("Finished: FAILURE") || response.data.includes("Finished: ABORTED")) {
                console.error("❌ Jenkins job başarısız veya iptal edildi!");
                return false;
            }

        } catch (error) {
            console.error("❌ Jenkins console log okunurken hata:", error.message);
        }

        console.log(`🔄 Jenkins bitmemiş, 5 saniye sonra tekrar kontrol edilecek... (${attempts + 1}/30)`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
    }

    console.error("⏳ Jenkins 2.5 dakika boyunca bitmedi, API timeout!");
    return false;
}

// ✅ **Son oluşturulan WebM dosyasını bul**
function getNewestWebmFile(dir) {
    console.log(`📂 ${dir} klasöründeki dosyalar kontrol ediliyor...`);

    if (!fs.existsSync(dir)) {
        console.error("❌ Video dizini mevcut değil!");
        return null;
    }

    const files = fs.readdirSync(dir);
    console.log(`📝 Bulunan dosyalar:`, files);

    const webmFiles = files.filter(f => f.endsWith('.webm'));
    if (webmFiles.length === 0) {
        console.error("⚠️ WebM dosyası bulunamadı!");
        return null;
    }

    const sorted = webmFiles
        .map(file => ({ file, time: fs.statSync(path.join(dir, file)).mtime.getTime() }))
        .sort((a, b) => b.time - a.time);

    const newestFile = sorted[0]?.file || null;
    console.log(`✅ En son oluşturulan WebM dosyası: ${newestFile}`);

    return newestFile;
}


// ✅ **WebM → MP4 dönüşümü**
function convertWebMtoMP4(webmPath) {
    return new Promise((resolve, reject) => {
        const mp4Path = webmPath.replace('.webm', '.mp4');
        console.log(`🎥 WebM dosyası MP4'e çevriliyor: ${webmPath} → ${mp4Path}`);

        const ffmpegCommand = `ffmpeg -y -i "${webmPath}" -vf "crop=in_w:in_h-20:0:0" -c:v libx264 -preset slow -crf 23 -b:v 2M "${mp4Path}"`;
        console.log(`🔄 FFmpeg çalıştırılıyor: ${ffmpegCommand}`);

        const process = exec(ffmpegCommand, { timeout: 15000 });

        process.stdout.on("data", (data) => console.log("📝 FFmpeg stdout:", data));
        process.stderr.on("data", (data) => console.log("⚠️ FFmpeg stderr:", data));

        process.on("exit", (code) => {
            if (code === 0) {
                console.log("✅ MP4 dosyası başarıyla oluşturuldu:", mp4Path);
                resolve(mp4Path);
            } else {
                console.error("❌ FFmpeg hatayla çıktı, kod:", code);
                reject(new Error(`FFmpeg başarısız oldu, çıkış kodu: ${code}`));
            }
        });

        process.on("error", (err) => {
            console.error("❌ FFmpeg çalıştırılamadı:", err);
            reject(err);
        });

        process.on("close", (code) => {
            console.log(`🔚 FFmpeg süreci kapandı, çıkış kodu: ${code}`);
        });
    });
}





// ✅ **MP4 → Thumbnail oluşturma**
function createThumbnail(mp4Path) {
    return new Promise((resolve, reject) => {
        const thumbnailPath = mp4Path.replace('.mp4', '.png');
        console.log(`📸 Thumbnail oluşturuluyor: ${mp4Path} → ${thumbnailPath}`);

        const ffmpegCommand = `ffmpeg -y -i "${mp4Path}" -vf "crop=in_w:in_h-20:0:0" -ss 00:00:2 -vframes 1 "${thumbnailPath}"`;
        console.log(`🔄 FFmpeg çalıştırılıyor: ${ffmpegCommand}`);

        const process = exec(ffmpegCommand, { timeout: 15000 });

        process.stdout.on("data", (data) => console.log("📝 FFmpeg stdout:", data));
        process.stderr.on("data", (data) => console.log("⚠️ FFmpeg stderr:", data));

        process.on("exit", (code) => {
            if (code === 0) {
                console.log("✅ Thumbnail başarıyla oluşturuldu:", thumbnailPath);
                resolve(thumbnailPath);
            } else {
                console.error("❌ FFmpeg hatayla çıktı, kod:", code);
                reject(new Error(`FFmpeg başarısız oldu, çıkış kodu: ${code}`));
            }
        });

        process.on("error", (err) => {
            console.error("❌ FFmpeg çalıştırılamadı:", err);
            reject(err);
        });

        process.on("close", (code) => {
            console.log(`🔚 FFmpeg süreci kapandı, çıkış kodu: ${code}`);
        });
    });
}






// ✅ **Run Test Endpoint**
app.post('/run-test', async (req, res) => {
    try {
        console.log("🔹 Yeni test başlatılıyor...");
        const { testName, steps } = req.body;

        if (!testName || !testName.trim()) return res.status(400).json({ error: 'Test Name is required' });
        if (!steps || steps.length === 0) return res.status(400).json({ error: 'No test steps provided' });

        const testFileName = testName.replace(/\s+/g, '_') + '.spec.js';
        const testFilePath = path.join(TESTS_DIR, testFileName);
        let testScript = `
import { test, expect, chromium } from '@playwright/test';
import { customClick, customFill, customWaitForTimeout, customLocator, waitForLoadState, customPlaceholder } from '../utilities/utilities.js';

test('${testName}', async ({  }) => {
 const browser = await chromium.launch({
        headless: true,
        args: ['--window-position=0,0', '--window-size=1920,1080']
    });

    const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
    const page = await context.newPage();
    try {
        console.log("Test başladı...");`;

        steps.forEach(({ testButton, selectedStep, value }) => {
            if (testButton === 'Goto URL') testScript += `await page.goto('${selectedStep}');\n`;
            if (testButton === 'Click Button') testScript += `await customClick(customLocator(page, '${selectedStep}'), '${testButton}', page);\n`;
            if (testButton === 'Fill Button') testScript += `await customFill(customLocator(page, '${selectedStep}'), '${value || ''}', '${testButton}', page);\n`;
            if (testButton === 'Wait For Timeout') testScript += `await customWaitForTimeout(${value || 3000});\n`;
            if (testButton === "Wait For Load State") testScript += `await waitForLoadState(page,"${value}");\n`;
            if(testButton === "PlaceHolder Click Button") testScript += `await customClick(customPlaceholder(page, '${value}'), '${testButton}', page);\n`;
            if(testButton === "PlaceHolder Fill Button") testScript += `await customFill(customPlaceholder(page, '${selectedStep}'), '${value}','${testButton}', page);\n`;
        });

        testScript += `await context.close(); } catch (error) { console.error("Hata:", error); throw error; } });`;

        fs.writeFileSync(testFilePath, testScript, 'utf-8');

        console.log(`🚀 Jenkins Pipeline tetikleniyor. Test dosyası: ${testFileName}`);

        await axios.post(`${JENKINS_URL}?TOKEN=${JENKINS_TOKEN}&TEST_FILE=${testFileName}`, {}, {
            auth: { username: JENKINS_USER, password: JENKINS_TOKEN },
            headers: { 'Content-Type': 'application/json' }
        });


        await new Promise(resolve => setTimeout(resolve, 5000));
        const buildId = await getLastBuildId();
        if (!buildId) return res.status(500).json({ error: 'Jenkins build ID alınamadı' });

        const success = await waitForJenkinsSuccess(buildId);
        if (!success) return res.status(500).json({ error: 'Jenkins başarısız oldu!' });

        const screenshots = fs.readdirSync(SCREENSHOTS_DIR)
            .filter(file => file.endsWith('.png'))
            .map(file => path.join('/screenshots', file))
            .sort((a, b) => {
                const statA = fs.statSync(path.join(SCREENSHOTS_DIR, a.replace('/screenshots/', '')));
                const statB = fs.statSync(path.join(SCREENSHOTS_DIR, b.replace('/screenshots/', '')));
                return statB.mtime - statA.mtime; // Yeni dosyalar önce gelsin
            });

        console.log("✅ Ekran görüntüleri başarıyla alındı!");






        console.log("🔍 Video dosyası aranıyor...");
        const webmFile = getNewestWebmFile(VIDEOS_DIR);
        if (!webmFile) return res.status(500).json({ error: 'WebM dosyası bulunamadı!' });

        const webmPath = path.join(VIDEOS_DIR, webmFile);
        console.log(`🎥 WebM bulunup işleniyor: ${webmPath}`);

        let mp4Path, thumbnailPath;

        try {
            mp4Path = await convertWebMtoMP4(webmPath);
            console.log(`✅ MP4 dosyası oluşturuldu: ${mp4Path}`);

            thumbnailPath = await createThumbnail(mp4Path);
            console.log(`✅ Thumbnail dosyası oluşturuldu: ${thumbnailPath}`);

        } catch (error) {
            console.error("❌ Video veya Thumbnail dönüştürme başarısız:", error);
            return res.status(500).json({ error: "Video veya Thumbnail dönüştürme başarısız!" });
        }

        console.log("✅ Test tamamlandı, video ve thumbnail oluşturuldu!");
        res.json({
            message: "Test başarıyla tamamlandı.",
            video: path.basename(mp4Path),
            thumbnail: path.basename(thumbnailPath),
            screenshots
        });

    } catch (err) {
        console.error("❌ Genel hata:", err.message);
        if (!res.headersSent) {
            return res.status(500).json({ error: err.message });
        }
    }
});


app.get('/api/screenshots', (req, res) => {
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
        return res.status(404).json({ error: "Screenshots directory not found!" });
    }

    fs.readdir(SCREENSHOTS_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading screenshots directory' });
        }

        // Sadece `.png` dosyalarını al ve sıralı bir liste olarak döndür
        const screenshots = files
            .filter(file => file.endsWith('.png'))
            .map(file => path.join('/screenshots', file)) // Sunucuya doğru yol
            .sort((a, b) => {
                const statA = fs.statSync(path.join(SCREENSHOTS_DIR, a.replace('/screenshots/', '')));
                const statB = fs.statSync(path.join(SCREENSHOTS_DIR, b.replace('/screenshots/', '')));
                return statB.mtime - statA.mtime; // Yeni dosyalar önce gelsin
            });

        res.json(screenshots);
    });
});

// ✅ **Screenshots klasörünü statik olarak sun**
app.use('/screenshots', express.static(SCREENSHOTS_DIR));

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
