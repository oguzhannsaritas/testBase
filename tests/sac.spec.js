
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('sac', async ({ browser }) => {
    // Video kaydı için context oluşturuluyor
    const context = await browser.newContext({
        recordVideo: { dir: 'videos/' }
    });
    const page = await context.newPage();
    try {
        await waitForLoadState(page);
        console.log("Test 'sac' başladı...\n");

        // --- Test adımlarınız burada eklenecek ---

    await page.goto('http://localhost:5173/dashboard');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173/dashboard\n");

    await customClick(
        customLocator(page, '#sadasdad'),
        'Step #2 - Click Button',
        page
    );

        console.log("Test 'sac' bitti.\n");
    } catch (error) {
        console.error("Test sırasında hata oluştu:", error);
        throw error;
    } finally {
    console.log("Test tamamlandı, context kapatılıyor...");
        await context.close(); // Hata alsa bile context kapanır.
    }
});
