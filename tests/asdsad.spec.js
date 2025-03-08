
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('asdsad', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'asdsad' başladı...\n");

    await page.goto('https://www.google.com');
    console.log("Step #1 - Goto URL - Gidilecek URL: https://www.google.com\n");

    await customClick(
        customLocator(page, '##dsadasdsa'),
        'Step #2 - Click Button',
        page
    );

    console.log("Test 'asdsad' bitti.\n");
    await context.close();
});
