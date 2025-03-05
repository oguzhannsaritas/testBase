import express from "express";
import fs from "fs";
import { exec } from "child_process";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5003;

// Testlerin kaydedileceği dizin
const TESTS_DIR = path.join(process.cwd(), "tests");

// Eğer `tests` klasörü yoksa oluştur
if (!fs.existsSync(TESTS_DIR)) {
    fs.mkdirSync(TESTS_DIR, { recursive: true });
}

app.post("/run-test", (req, res) => {
    try {
        const { steps } = req.body;

        if (!steps || steps.length === 0) {
            console.error("❌ ERROR: No test steps provided!");
            return res.status(400).json({ error: "No test steps provided" });
        }

        let testScript = `import { test, expect } from '@playwright/test';\n\n`;
        testScript += `test('Generated Test', async ({ page }) => {\n`;

        steps.forEach(step => {
            if (!step.value || step.value.trim() === "") {
                console.error(`🚨 ERROR: Step "${step.subLabel}" has an empty value!`);
            }

            if (step.subLabel === "Goto URL") {
                testScript += `    await page.goto('${step.value}');\n`;
            } else if (step.subLabel === "Click Button") {
                testScript += `    await page.click('${step.value}');\n`;
            } else if (step.subLabel === "Fill Button") {
                const [inputSelector, inputValue] = step.value.split("||").map(val => val.trim());
                testScript += `    await page.fill('${inputSelector}', '${inputValue}');\n`;
            }
        });

        testScript += `});\n`;

        const testFilePath = path.join(TESTS_DIR, "generatedTest.spec.js");
        fs.writeFileSync(testFilePath, testScript);
        console.log(`✅ Test file saved: ${testFilePath}`);
        console.log(testScript);

        exec(`npx playwright test ${testFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Test Execution Error:", stderr);
                return res.status(500).json({ error: stderr });
            }
            console.log("✅ Test Output:", stdout);
            res.json({ output: stdout, errors: stderr });
        });

    } catch (err) {
        console.error("❌ Server Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
