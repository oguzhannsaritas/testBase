// server.js

import express from 'express';
import fs from 'fs';
import { exec } from 'child_process';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5003;
const TESTS_DIR = path.join(process.cwd(), 'tests');
const VIDEOS_DIR = path.join(process.cwd(), 'videos');

// Klasörler yoksa oluştur
if (!fs.existsSync(TESTS_DIR)) {
    fs.mkdirSync(TESTS_DIR, { recursive: true });
}
if (!fs.existsSync(VIDEOS_DIR)) {
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}

// "videos" klasörünü statik servis edelim (mp4/png erişilebilsin).
app.use('/videos', express.static(VIDEOS_DIR));

/**
 * En son oluşturulan .webm dosyasını bulur.
 * Aynı anda birden fazla test koşmuyorsanız sorun olmaz.
 */
function getNewestWebmFile(dir) {
    // Tüm dosyaları listeleyip .webm ile bitenleri bulalım:
    const webmFiles = fs.readdirSync(dir).filter(f => f.endsWith('.webm'));
    if (webmFiles.length === 0) {
        return null;
    }

    // mtime sıralamasına göre en yeni .webm dosyası:
    const sorted = webmFiles
        .map(file => {
            const fullPath = path.join(dir, file);
            return { file, time: fs.statSync(fullPath).mtime.getTime() };
        })
        .sort((a, b) => b.time - a.time);

    return sorted[0].file; // en yeni dosyanın adı
}

// /run-test
app.post('/run-test', (req, res) => {
    try {
        const { testName, steps } = req.body;

        // Kontroller
        if (!testName || !testName.trim()) {
            return res.status(400).json({ error: 'Test Name is required' });
        }
        if (!steps || steps.length === 0) {
            console.error('No test steps provided!');
            return res.status(400).json({ error: 'No test steps provided' });
        }

        // Playwright test dosyası içeriği
        let testScript = `
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('${testName}', async ({ browser }) => {
    // Video kaydı için context oluşturuluyor
    const context = await browser.newContext({
        recordVideo: { dir: 'videos/' }
    });
    const page = await context.newPage();
    try {
        await waitForLoadState(page);
        console.log("Test '${testName}' başladı...\\n");

        // --- Test adımlarınız burada eklenecek ---
`;


        // Steps döngüsü
        steps.forEach((step, index) => {
            const { mainLabel, testButton, type, selectedStep, value } = step;
            const stepNumber = index + 1;
            const stepDesc = `Step #${stepNumber} - ${testButton}`;

            if (mainLabel === 'Test Steps') {
                if (testButton === 'Goto URL') {
                    testScript += `
    await page.goto('${selectedStep}');
    console.log("${stepDesc} - Gidilecek URL: ${selectedStep}\\n");
`;
                } else if (testButton === 'Click Button') {
                    let finalLocator = '';
                    if (type === 'xpath') {
                        finalLocator = selectedStep.startsWith('//') ? selectedStep : '//' + selectedStep;
                    } else if (type === 'id') {
                        finalLocator = '#' + selectedStep;
                    } else {
                        finalLocator = selectedStep;
                    }
                    testScript += `
    await customClick(
        customLocator(page, '${finalLocator}'),
        '${stepDesc}',
        page
    );
`;
                } else if (testButton === 'Fill Button') {
                    let finalLocator = '';
                    if (type === 'xpath') {
                        finalLocator = selectedStep.startsWith('//') ? selectedStep : '//' + selectedStep;
                    } else if (type === 'id') {
                        finalLocator = '#' + selectedStep;
                    } else {
                        finalLocator = selectedStep;
                    }
                    const textToFill = value || '';
                    testScript += `
    await customFill(
        customLocator(page, '${finalLocator}'),
        '${textToFill}',
        '${stepDesc}',
        page
    );
`;
                } else if (testButton === 'Wait For Timeout') {
                    const waitTime = value || 3000;
                    testScript += `
    await customWaitForTimeout(${waitTime});
    console.log("${stepDesc} - Waited for ${waitTime} ms\\n");
`;
                } else if (testButton === 'Wait For Load State') {
                    const loadStateValue = value || 'load';
                    testScript += `
    await page.waitForLoadState('${loadStateValue}');
    console.log("${stepDesc} - Waited for load state: ${loadStateValue}\\n");
`;
                } else {
                    // Diğer
                    testScript += `
    console.log("${stepDesc} - (Henüz özel işlem tanımlanmadı)\\n");
`;
                }
            } else {
                // mainLabel farklıysa
                testScript += `
    console.log("${stepDesc} - Ek bilgi: ${value}\\n");
`;
            }
        });

        testScript += `
        console.log("Test '${testName}' bitti.\\n");
    } catch (error) {
        console.error("Test sırasında hata oluştu:", error);
        console.log("Test hata oluştu :", error);
        throw error;
    } finally {
    console.log("Test tamamlandı, context kapatılıyor...");
        await context.close(); // Hata alsa bile context kapanır.
    }
});
`;

        // Dosya adı
        const testFileName = testName.replace(/\s+/g, '_') + '.spec.js';
        const testFilePath = path.join(TESTS_DIR, testFileName);
        fs.writeFileSync(testFilePath, testScript, 'utf-8');
        console.log('✅ Test file saved:', testFilePath);

        // Playwright testini çalıştır
        exec(`npx playwright test "${testFilePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Test Execution Error:', stderr);
                exec("pkill -f playwright", () => {
                    console.log("Playwright işlemi temizlendi.");
                });

                return res.status(500).json({ error: stderr });
            }
            console.log('✅ Test Output:', stdout);

            // .webm dosyasını bul
            const newestWebm = getNewestWebmFile(VIDEOS_DIR);
            if (!newestWebm) {
                console.error("Hiç .webm dosyası bulunamadı! Video kaydedilmemiş olabilir.");
                return res.status(500).json({ error: "No .webm found in 'videos' directory" });
            }
            const webmPath = path.join(VIDEOS_DIR, newestWebm);
            const mp4Path = path.join(VIDEOS_DIR, testName + '.mp4');

            console.log("Dönüştürülecek webm dosyası:", webmPath);

            // --- ÖNEMLİ: VP8 -> MP4 "copy" yerine H.264'e encode ediyoruz. ---
            //  "Could not find tag for codec vp8" hatasını çözmek için:
            const ffmpegCmd = `ffmpeg -y -i "${webmPath}" \
  -vf "crop=in_w:in_h-80:0:0,scale=1920:1080:flags=lanczos,unsharp=7:7:0.8:7:7:0.8" \
  -b:v 25M -maxrate 30M -bufsize 40M \
  -c:v libx264 -crf 5 -preset veryslow -pix_fmt yuv420p \
  -c:a aac -b:a 320k -movflags +faststart \
  "${mp4Path}"`;



            exec(ffmpegCmd, (convErr, convOut, convStderr) => {
                if (convErr) {
                    console.error("FFmpeg Conversion Error:", convStderr);
                    return res.json({ output: stdout, video: null, error: convStderr });
                }
                console.log("Video converted to MP4:", mp4Path);

                // Thumbnail
                const thumbnailPath = path.join(VIDEOS_DIR, testName + '.png');
                const ffmpegThumbCmd = `ffmpeg -y -i "${mp4Path}" -ss 00:00:01 -vframes 1 -vf "crop=in_w:in_h-1:0:0" "${thumbnailPath}"`;

                exec(ffmpegThumbCmd, (thumbErr) => {
                    if (thumbErr) {
                        console.error('Thumbnail Error:', thumbErr);
                        return res.json({
                            output: stdout,
                            video: testName + '.mp4',
                            thumbnail: null,
                            error: thumbErr
                        });
                    }
                    console.log('Thumbnail created:', thumbnailPath);

                    // Sonuç JSON
                    res.json({
                        output: stdout,
                        video: testName + '.mp4',
                        thumbnail: testName + '.png'
                    });

                    console.log("✅ API yanıtı döndü, frontend şimdi toast gösterebilir!");
                });

            });
        });
    } catch (err) {
        console.error('❌ Server Error:', err.message);
        return res.status(500).json({ error: err.message });
    }
});



app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
