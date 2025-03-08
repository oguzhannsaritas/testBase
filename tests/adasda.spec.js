
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('adasda', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'adasda' başladı...\n");

    await page.goto('http://localhost:5173/dashboard');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173/dashboard\n");

    await customWaitForTimeout(3333);
    console.log("Step #2 - Wait For Timeout - Waited for 3333 ms\n");

    await customFill(
        customLocator(page, '#sa'),
        'S',
        'Step #3 - Fill Button',
        page
    );

    console.log("Test 'adasda' bitti.\n");
    await context.close();
});
