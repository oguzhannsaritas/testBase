
import { test, expect, chromium } from '@playwright/test';
import { customClick, customFill, customWaitForTimeout, customLocator, waitForLoadState, customPlaceholder } from '../utilities/utilities.js';

test('sasasa', async ({  }) => {
 const browser = await chromium.launch({
        headless: true,
        args: ['--window-position=0,0', '--window-size=1920,1080']
    });

    const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
    const page = await context.newPage();
    try {
        console.log("Test başladı...");await page.goto('http://localhost:5173/login');
await customClick(customLocator(page, '//*[@id="LoginEmailInput"]'), 'Click Button', page);
await customFill(customLocator(page, '//*[@id="LoginEmailInput"]'), 'oguzhan@gmail.com', 'Fill Button', page);
await context.close(); } catch (error) { console.error("Hata:", error); throw error; } });