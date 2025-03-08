
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('heybooster1234', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'heybooster1234' başladı...\n");

    await page.goto('https://app.heybooster.ai/auth/login?redirect=/');
    console.log("Step #1 - Goto URL - Gidilecek URL: https://app.heybooster.ai/auth/login?redirect=/\n");

    await page.waitForLoadState('load');
    console.log("Step #2 - Wait For Load State - Waited for load state: load\n");

    await customClick(
        customLocator(page, '#email'),
        'Step #3 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#email'),
        'oguzhan_saritass@hotmail.com',
        'Step #4 - Fill Button',
        page
    );

    await customClick(
        customLocator(page, '#password'),
        'Step #5 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#password'),
        '12345',
        'Step #6 - Fill Button',
        page
    );

    await customClick(
        customLocator(page, '//*[@id="app"]/main/article/section/form/button[1]'),
        'Step #7 - Click Button',
        page
    );

    await page.waitForLoadState('load');
    console.log("Step #8 - Wait For Load State - Waited for load state: load\n");

    await customClick(
        customLocator(page, '//*[@id="app"]/main/section/article/section/section[1]/section[2]/a[1]'),
        'Step #9 - Click Button',
        page
    );

    await customWaitForTimeout(5000);
    console.log("Step #10 - Wait For Timeout - Waited for 5000 ms\n");

    console.log("Test 'heybooster1234' bitti.\n");
    await context.close();
});
