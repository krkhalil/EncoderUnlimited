import { test, expect } from '@playwright/test';
import { FailureHandler } from '../src/utils/failure-handler.js';

/**
 * Example demonstrating automatic failure handling
 * Screenshots and videos are automatically captured and attached to Allure
 */
test.describe('Failure Handling Demo', () => {
  test('this test will pass - no artifacts captured', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('this test will fail - artifacts automatically captured', async ({ page }) => {
    await page.goto('https://example.com');
    
    // This assertion will fail
    // Screenshot and video will be automatically captured by Playwright
    // and attached to Allure by the FailureHandler in afterEach hook
    await expect(page.locator('h1')).toHaveText('This text does not exist');
  });

  test('manual failure handling example', async ({ page }) => {
    // Note: Manual failure handling is not needed as afterEach hook handles it automatically
    // This example shows that failures are automatically captured
    await page.goto('https://example.com');
    await expect(page.locator('h1')).toHaveText('Wrong Text');
  });

  // Automatic failure handling and browser close for all tests in this describe block
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
    
    // Close browser after every test (pass or fail)
    const closeDelay = parseInt(process.env.BROWSER_CLOSE_DELAY_MS || '5000', 10);
    if (closeDelay > 0) {
      FailureHandler.closeBrowserAfterTest(page, closeDelay, testInfo.status).catch(err => {
        console.error('Error in background browser close:', err);
      });
    }
  });
});
