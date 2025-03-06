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
    await waitForLoadState(page);
    console.log("Test '${testName}' başladı...\\n");
`;

        steps.forEach((step, index) => {
            const { mainLabel, testButton, type, selectedStep, value } = step;
            const stepNumber = index + 1;
            const stepDesc = 'Step #' + stepNumber + ' - ' + testButton;

            if (mainLabel === 'Test Steps') {
                // Goto URL
                if (testButton === 'Goto URL') {
                    testScript += `
    await page.goto('${selectedStep}');
    console.log("${stepDesc} - Gidilecek URL: ${selectedStep}\\n");
`;
                    return;
                }

                // Click Button
                if (testButton === 'Click Button') {
                    let finalLocator = '';
                    if (type === 'xpath') {
                        // Eğer "//" ile başlıyorsa tekrar eklemeyelim
                        if (selectedStep.startsWith('//')) {
                            finalLocator = selectedStep;
                        } else {
                            finalLocator = '//' + selectedStep;
                        }
                    } else if (type === 'id') {
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

                // Fill Button
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

                // Diğer testButton
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

        testScript += `
    console.log("Test '${testName}' bitti.\\n");
});
`;

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
