
import { test, expect } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('TestHakan', async ({ page }) => {
    await waitForLoadState(page);
    console.log("Test 'TestHakan' başladı...\n");

    await page.goto('http://localhost:5173');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173\n");
    await page.pause();

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

    console.log("Test 'TestHakan' bitti.\n");
});
