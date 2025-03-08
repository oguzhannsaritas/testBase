
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('s', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 's' başladı...\n");

    await page.goto('https://www.google.com');
    console.log("Step #1 - Goto URL - Gidilecek URL: https://www.google.com\n");

    await customWaitForTimeout(2000);
    console.log("Step #2 - Wait For Timeout - Waited for 2000 ms\n");

    console.log("Test 's' bitti.\n");
    await context.close();
});
