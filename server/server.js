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
if (!fs.existsSync(TESTS_DIR)) {
    fs.mkdirSync(TESTS_DIR, { recursive: true });
}

app.post('/run-test', (req, res) => {
    try {
        const { testName, steps } = req.body;

        // Test ismi kontrol
        if (!testName || !testName.trim()) {
            return res.status(400).json({ error: 'Test Name is required' });
        }
        // Steps kontrol
        if (!steps || steps.length === 0) {
            console.error('No test steps provided!');
            return res.status(400).json({ error: 'No test steps provided' });
        }

        // Playwright test dosyası içeriği
        let testScript = `
import { test, expect } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('${testName}', async ({ page }) => {
    // İlk adımda sayfanın default "load" state'ini beklemek isterseniz (opsiyonel):
    await waitForLoadState(page);

    console.log("Test '${testName}' başladı...\\n");
`;

        steps.forEach((step, index) => {
            const { mainLabel, testButton, type, selectedStep, value } = step;
            const stepNumber = index + 1;
            const stepDesc = `Step #${stepNumber} - ${testButton}`;

            if (mainLabel === 'Test Steps') {

                // 1) Goto URL
                if (testButton === 'Goto URL') {
                    testScript += `
    await page.goto('${selectedStep}');
    console.log("${stepDesc} - Gidilecek URL: ${selectedStep}\\n");
`;
                    return;
                }

                // 2) Click Button
                if (testButton === 'Click Button') {
                    let finalLocator = '';
                    if (type === 'xpath') {
                        // XPath ise, "//" ekleyelim
                        if (selectedStep.startsWith('//')) {
                            finalLocator = selectedStep;
                        } else {
                            finalLocator = '//' + selectedStep;
                        }
                    } else if (type === 'id') {
                        // ID ise "#..."
                        finalLocator = '#' + selectedStep;
                    } else {
                        // selector
                        finalLocator = selectedStep;
                    }
                    testScript += `
    await customClick(
        customLocator(page, '${finalLocator}'),
        '${stepDesc}',
        page
    );
`;
                    return;
                }

                // 3) Fill Button
                if (testButton === 'Fill Button') {
                    let finalLocator = '';
                    if (type === 'xpath') {
                        if (selectedStep.startsWith('//')) {
                            finalLocator = selectedStep;
                        } else {
                            finalLocator = '//' + selectedStep;
                        }
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
                    return;
                }

                // 4) Wait For Timeout
                if (testButton === 'Wait For Timeout') {
                    // Kullanıcının girdiği süre (ms)
                    const waitTime = value || 3000; // default 3000 ms
                    testScript += `
    await customWaitForTimeout(${waitTime});
    console.log("${stepDesc} - Waited for ${waitTime} ms\\n");
`;
                    return;
                }

                // 5) Wait For Load State
                if (testButton === 'Wait For Load State') {
                    // Kullanıcının girdiği load state (örn: 'load', 'domcontentloaded', 'networkidle')
                    const loadStateValue = value || 'load';
                    testScript += `
    await page.waitForLoadState('${loadStateValue}');
    console.log("${stepDesc} - Waited for load state: ${loadStateValue}\\n");
`;
                    return;
                }

                // Diğer testButton (henüz tanımlı değilse)
                testScript += `
    console.log("${stepDesc} - (Henüz özel işlem tanımlanmadı)\\n");
`;
            } else {
                // Test Steps harici (Locations, Block, vs.)
                testScript += `
    console.log("${stepDesc} - Ek bilgi: ${value}\\n");
`;
            }
        });

        // Test bitişi
        testScript += `
    console.log("Test '${testName}' bitti.\\n");
});
`;

        // Dosya ismi: testName'deki boşlukları alt çizgi ile değiştir
        const testFileName = testName.replace(/\s+/g, '_') + '.spec.js';
        const testFilePath = path.join(TESTS_DIR, testFileName);
        fs.writeFileSync(testFilePath, testScript, 'utf-8');
        console.log('✅ Test file saved:', testFilePath);

        // Playwright testini çalıştır
        exec('npx playwright test "' + testFilePath + '"', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Test Execution Error:', stderr);
                return res.status(500).json({ error: stderr });
            }
            console.log('✅ Test Output:', stdout);
            res.json({ output: stdout });
        });
    } catch (err) {
        console.error('❌ Server Error:', err.message);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
