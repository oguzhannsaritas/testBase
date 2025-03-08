
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('heybooster22', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'heybooster22' başladı...\n");

    await page.goto('https://app.heybooster.ai');
    console.log("Step #1 - Goto URL - Gidilecek URL: https://app.heybooster.ai\n");

    await page.waitForLoadState('load');
    console.log("Step #2 - Wait For Load State - Waited for load state: load\n");

    await customWaitForTimeout(4000);
    console.log("Step #3 - Wait For Timeout - Waited for 4000 ms\n");

    await customClick(
        customLocator(page, '#email'),
        'Step #4 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#email'),
        'lalalalalalalalalala',
        'Step #5 - Fill Button',
        page
    );

    console.log("Test 'heybooster22' bitti.\n");
    await context.close();
});
