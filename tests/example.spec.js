import { expect, test } from "@playwright/test";
import {
    customClick,
    waitForLoadState,
    customFill,
    customWaitForTimeout,
    customLocator
} from '../utilities/utilities.js';

test('Kullanıcı giriş senaryosu', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Gerekirse URL'yi değiştirin

    // Sayfa yüklenmesini bekle
    await waitForLoadState(page);

    // 2 saniye bekle
    await customWaitForTimeout(2000);

    // Email inputuna tıkla ve doldur
    const emailInput = customLocator(page, 'input[type="email"]');
    await customClick(emailInput, 'Email inputuna tıklama', page);
    await customFill(emailInput, 'oguzhan@gmail.com', 'Email inputuna yazma', page);

    // Şifre inputuna tıkla ve doldur
    await customClick(customLocator(page, 'input[type="password"]'), 'Şifre inputuna tıklama', page);
    await customFill(customLocator(page, 'input[type="password"]'), '1234', 'Şifre inputuna yazma', page);

    // Submit butonuna tıkla
    const submitButton = customLocator(page, 'button[type="submit"]');
    await customClick(submitButton, 'Submit butonuna tıklama', page);

    // 5 saniye bekle
    await customWaitForTimeout(5000);
});
