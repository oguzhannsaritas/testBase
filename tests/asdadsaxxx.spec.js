
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('asdadsaxxx', async ({ browser }) => {
    // Video kaydı için context oluşturuluyor
    const context = await browser.newContext({
        recordVideo: { dir: 'videos/' }
    });
    const page = await context.newPage();
    try {
        await waitForLoadState(page);
        console.log("Test 'asdadsaxxx' başladı...\n");

        // --- Test adımlarınız burada eklenecek ---

    await page.goto('http://localhost:5173/dashboard');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173/dashboard\n");

    await customWaitForTimeout(3000);
    console.log("Step #2 - Wait For Timeout - Waited for 3000 ms\n");

        console.log("Test 'asdadsaxxx' bitti.\n");
    } catch (error) {
        console.error("Test sırasında hata oluştu:", error);
        console.log("Test hata oluştu :", error);
        throw error;
    } finally {
    console.log("Test tamamlandı, context kapatılıyor...");
        await context.close(); // Hata alsa bile context kapanır.
    }
});
