import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        timeout: 120 * 1000,
        expect: {
            timeout: 60000,
        },
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: false,
                viewport: { width: 1710, height: 982 },
                launchOptions: {
                    slowMo: 500,
                    args: [
                        '--start-maximized',
                        '--window-size=1710,1112',
                    ],
                },
            },
        }
    ],
});
