
import { test, expect } from '@playwright/test';
import {
    customWaitForTimeout,
    waitForLoadState,
    customClick,
    customFill,
    customLocator
} from '../utilities/utilities.js';

test('sonDeneme', async ({ page }) => {
    // İlk adımda sayfanın default "load" state'ini beklemek isterseniz (opsiyonel):
    await waitForLoadState(page);

    console.log("Test 'sonDeneme' başladı...\n");

    await page.goto('http://localhost:5173');
    console.log("Step #1 - Goto URL - Gidilecek URL: http://localhost:5173\n");

    await page.waitForLoadState('load');
    console.log("Step #2 - Wait For Load State - Waited for load state: load\n");

    await customClick(
        customLocator(page, '#LoginEmailInput'),
        'Step #3 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#LoginEmailInput'),
        'oguzhan@gmail.com',
        'Step #4 - Fill Button',
        page
    );

    await customWaitForTimeout(5000);
    console.log("Step #5 - Wait For Timeout - Waited for 5000 ms\n");

    await customClick(
        customLocator(page, '#loginPasswordInput'),
        'Step #6 - Click Button',
        page
    );

    await customFill(
        customLocator(page, '#loginPasswordInput'),
        '1234',
        'Step #7 - Fill Button',
        page
    );

    await customWaitForTimeout(5000);
    console.log("Step #8 - Wait For Timeout - Waited for 5000 ms\n");

    await customClick(
        customLocator(page, '#loginButton'),
        'Step #9 - Click Button',
        page
    );

    console.log("Test 'sonDeneme' bitti.\n");
});
