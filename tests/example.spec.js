import {expect, request, test} from "@playwright/test";

test('Ana sayfa başlığını kontrol et', async ({ page }) => {
    await page.goto('http://localhost:5173'); // React projenin çalıştığı URL
    await expect(page).toHaveTitle(/Test Base/);
});