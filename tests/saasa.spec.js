
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('saasa', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'saasa' başladı...\n");

    await page.goto('https://www.google.com');
    console.log("Step #1 - Goto URL - Gidilecek URL: https://www.google.com\n");

    await customWaitForTimeout(1000);
    console.log("Step #2 - Wait For Timeout - Waited for 1000 ms\n");

    console.log("Test 'saasa' bitti.\n");
    await context.close();
});
