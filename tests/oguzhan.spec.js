
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('oguzhan', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'oguzhan' başladı...\n");

    await page.goto('http://localhost:5173/');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173/\n");

    await customClick(
        customLocator(page, '#LoginEmailInput'),
        'Step #2 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#LoginEmailInput'),
        'oguzhan@gmail.com',
        'Step #3 - Fill Button',
        page
    );

    await customClick(
        customLocator(page, '#loginPasswordInput'),
        'Step #4 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#loginPasswordInput'),
        '1234',
        'Step #5 - Fill Button',
        page
    );

    await customClick(
        customLocator(page, '#loginButton'),
        'Step #6 - Click Button',
        page
    );

    await page.waitForLoadState('load');
    console.log("Step #7 - Wait For Load State - Waited for load state: load\n");

    await customClick(
        customLocator(page, '//*[@id="app"]/div/div/div[1]/button'),
        'Step #8 - Click Button',
        page
    );

    await customWaitForTimeout(5000);
    console.log("Step #9 - Wait For Timeout - Waited for 5000 ms\n");

    console.log("Test 'oguzhan' bitti.\n");
    await context.close();
});
