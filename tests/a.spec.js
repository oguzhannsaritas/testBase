
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('a', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: { dir: 'videos/' }
    });
    const page = await context.newPage();
    try {
        await waitForLoadState(page);
        console.log("Test 'a' başladı...\n");

    await page.goto('http://localhost:5173/dashboard');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173/dashboard\n");

    await customClick(
        customLocator(page, '##dsadsada'),
        'Step #2 - Click Button',
        page
    );

        console.log("Test 'a' bitti.\n");
    } catch (error) {
        console.error("Test sırasında hata oluştu:", error);
        throw error;
    } finally {
        await context.close();
    }
});
