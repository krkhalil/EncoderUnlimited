import { test, expect } from '@playwright/test';
import { FailureHandler } from '../src/utils/failure-handler.js';

/**
 * Example test demonstrating automatic failure handling
 * Screenshots and videos are automatically captured and attached to Allure
 */
test.describe('Example Tests with Failure Handling', () => {
  test('should pass and not capture artifacts', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should fail and automatically capture screenshot and video', async ({ page }) => {
    await page.goto('https://example.com');
    
    // This will fail - screenshot and video will be automatically captured
    // by the afterEach hook
    await expect(page.locator('h1')).toHaveText('This text does not exist');
  });

  test('should demonstrate manual failure handling', async ({ page }) => {
    // Note: Manual failure handling is not needed as afterEach hook handles it automatically
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
