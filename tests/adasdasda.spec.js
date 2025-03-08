
import { test, expect, chromium } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('adasdasda', async ({ browser }) => {
    // Video kaydı için context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
        }
    });
    const page = await context.newPage();

    await waitForLoadState(page);
    console.log("Test 'adasdasda' başladı...\n");

    await page.goto('https://www.google.com');
    console.log("Step #1 - Goto URL - Gidilecek URL: https://www.google.com\n");

    await customClick(
        customLocator(page, '//dsadsadsadasdsada'),
        'Step #2 - Click Button',
        page
    );

    await customFill(
        customLocator(page, 'dsadsad'),
        'asdasda',
        'Step #3 - Fill Button',
        page
    );

    console.log("Test 'adasdasda' bitti.\n");
    await context.close();
});
