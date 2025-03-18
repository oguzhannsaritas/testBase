import { expect } from "@playwright/test";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url';

// ✅ **Belirtilen süre kadar bekler**
export function customWaitForTimeout(time) {
    if (!time || isNaN(time)) {
        throw new Error(`Invalid timeout value: ${time}`);
    }
    console.log(`Waiting for ${time}ms...`);
    return new Promise(resolve => setTimeout(resolve, time));
}

// ✅ **Sayfanın yüklenmesini bekler**
export async function waitForLoadState(page, waitUntilType = 'load') {
    if (!page) {
        throw new Error("Page instance is required for waitForLoadState");
    }

    console.log(`Waiting for page load state: ${waitUntilType}...`);
    return page.waitForLoadState(waitUntilType);
}


// ✅ **Elemente tıklama işlemi**
export async function customClick(locator, stepDescription, page, options = {}) {
    try {
        if (!locator) {
            throw new Error(`Locator is undefined at step: ${stepDescription}`);
        }
        console.log(`WAITING FOR ELEMENT TO BE CLİCKED: ${locator}`);
        await locator.waitFor({ state: "attached", timeout: 10000 });

        // Tıklanacak alanın konumunu ve boyutunu al
        const box = await locator.boundingBox();
        if (box) {

            // Screenshot dizini oluştur
            const screenshotDir = path.resolve("screenshots");
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            // **1. BUTONU KIRMIZI ÇERÇEVE İLE VURGULA**
            await page.evaluate(({ x, y, width, height }) => {
                const highlight = document.createElement("div");
                highlight.style.position = "absolute";
                highlight.style.left = `${x - 5}px`;
                highlight.style.top = `${y - 5}px`;
                highlight.style.width = `${width + 10}px`;
                highlight.style.height = `${height + 10}px`;
                highlight.style.border = "3px solid red";
                highlight.style.borderRadius = "50%";
                highlight.style.zIndex = "9999";
                highlight.style.pointerEvents = "none";
                highlight.setAttribute("id", "click-highlight");

                document.body.appendChild(highlight);
            }, box);

            // **1.1. VURGULANMIŞ HALİ EKRAN GÖRÜNTÜSÜ AL**
            const highlightedScreenshot = path.join(
                screenshotDir,
                `screenshot_${Date.now()}_highlighted.png`
            );
            await page.screenshot({ path: highlightedScreenshot });

            await locator.click(options);

            // **Highlight'ı kaldır**
            await page.evaluate(() => {
                const highlight = document.getElementById("click-highlight");
                if (highlight) {
                    highlight.remove();
                }
            });

            // **3. TIKLAMA SONRASI HALİNİN EKRAN GÖRÜNTÜSÜNÜ AL**
            await page.waitForTimeout(500); // Sayfanın güncellenmesini bekle
            const afterClickScreenshot = path.join(
                screenshotDir,
                `screenshot_${Date.now()}_after_click.png`
            );
            await page.screenshot({ path: afterClickScreenshot });

            console.log(`CLICKED ON ELEMENT: ${locator}`);
        } else {
            console.warn(`⚠ Could not determine bounding box for element: ${locator}`);
        }
    } catch (error) {
        console.error(
            `❌ ERROR CLICKING ON ELEMENT at step: ${stepDescription} - ${error}`
        );
        await captureError(page, error, stepDescription);
        throw new Error(`Failed to click element at step: ${stepDescription}`);
    }
}
// ✅ **Bir input alanını doldurma işlemi**
export async function customFill(locator, value, stepDescription, page) {
    try {
        if (!locator) {
            throw new Error(`Locator is undefined at step: ${stepDescription}`);
        }
        if (!value) {
            throw new Error(`Value is required for filling at step: ${stepDescription}`);
        }

        console.log(`WAITING FOR ELEMENT TO BE VISIBLE: ${locator}`);
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        console.log(`ELEMENT IS VISIBLE, NOW FILLING`);
        await locator.fill(value);

        const inputValue = await locator.inputValue();
        console.log(`ELEMENT VALUE AFTER FILL: ${inputValue}`);

        if (inputValue !== value) {
            throw new Error(`Filled value does not match expected value at step: ${stepDescription}`);
        }

        expect(inputValue).toBe(value);
    } catch (error) {
        console.error(`ERROR FILLING ELEMENT at step: ${stepDescription} - ${error}`);
        await captureError(page, error, stepDescription);
        throw new Error(`Failed to fill element at step: ${stepDescription}`);
    }
}

// ✅ **Placeholder'a göre element bulma**
export function customPlaceholder(page, placeholder) {
    try {
        if (!placeholder) {
            throw new Error("Placeholder value is required");
        }

        const element = page.locator(`[placeholder="${placeholder}"]`);

        if (!element) {
            throw new Error(`No element found with placeholder: ${placeholder}`);
        }

        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH PLACEHOLDER: ${placeholder} - ${error}`);
        throw error;
    }
}

// ✅ **CSS Selector ile element bulma**
export function customLocator(page, selector, { isText = false } = {}) {
    try {
        if (!selector || typeof selector !== "string") {
            throw new Error("❌ Selector value is required and must be a string.");
        }

        let element;
        let finalSelector = selector.trim();

        console.log(`🔍 FINDING ELEMENT: ${finalSelector}`);

        // **XPath olup olmadığını kontrol et**
        if (finalSelector.startsWith("//") || finalSelector.startsWith("(//")) {
            element = page.locator(`xpath=${finalSelector}`);
        }
        // **ID olup olmadığını kontrol et**
        else if (!finalSelector.startsWith("#") && !isText) {
            element = page.locator(`#${finalSelector}`);
        }
        // **Full XPath olup olmadığını kontrol et**
        else if (finalSelector.startsWith("/") || finalSelector.startsWith("(")) {
            element = page.locator(`xpath=${finalSelector}`);
        }
        // **Text içeriğine göre element bulma**
        else if (isText) {
            element = page.locator(`text=${finalSelector}`);
        }
        // **Genel CSS selector olarak kullan**
        else {
            element = page.locator(finalSelector);
        }

        // **Element bulunamazsa hata fırlat**
        if (!element) {
            throw new Error(`❌ No element found with selector: ${finalSelector}`);
        }

        return element;
    } catch (error) {
        console.error(`❌ ERROR FINDING ELEMENT WITH SELECTOR: ${selector} - ${error.message}`);
        throw error;
    }
}


// ✅ **Metne göre element bulma**
export function customByText(page, text, options = {}) {
    try {
        if (!text) {
            throw new Error("Text value is required");
        }

        console.log(`FINDING ELEMENT WITH TEXT: ${text}`);
        const element = page.getByText(text, options);

        if (!element) {
            throw new Error(`No element found with text: ${text}`);
        }

        console.log(`FOUND ELEMENT WITH TEXT: ${text}`);
        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH TEXT: ${text} - ${error}`);
        throw error;
    }
}

// ✅ **Rol bazlı element bulma**
export function customByRole(page, role, options = {}) {
    try {
        if (!role) {
            throw new Error("Role value is required");
        }

        console.log(`FINDING ELEMENT WITH ROLE: ${role}`);
        const element = page.getByRole(role, options);

        if (!element) {
            throw new Error(`No element found with role: ${role}`);
        }

        console.log(`FOUND ELEMENT WITH ROLE: ${role}`);
        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH ROLE: ${role} - ${error}`);
        throw error;
    }
}

// ✅ **Hata durumunda ekran görüntüsü alma**
global.captureError = async function (page, error, step) {
    try {
        console.error(`❌ ERROR OCCURRED AT STEP: ${step} - ${error}`);

        const screenshotPath = `error_${step}.png`;
        const screenshotBuffer = await page.screenshot();

        try {
            await addPhoto(screenshotBuffer, screenshotPath, 'Error');
        } catch (s3Error) {
            console.error(`Failed to upload screenshot to S3: ${s3Error.message}`);
        }

        throw new Error(`Step: ${step} - ${error.message}`);
    } catch (captureError) {
        console.error(`Failed to capture error screenshot: ${captureError.message}`);
    }
};

// ✅ **Başarı durumunda ekran görüntüsü alma**
global.captureSuccess = async function (page, step) {
    try {
        const screenshotPath = `success_${step}.png`;
        const screenshotBuffer = await page.screenshot();

        try {
            await addPhoto(screenshotBuffer, screenshotPath, 'Success');
        } catch (s3Error) {
            console.error(`Failed to upload success screenshot to S3: ${s3Error.message}`);
        }
    } catch (captureError) {
        console.error(`Failed to capture success screenshot: ${captureError.message}`);
    }
};
