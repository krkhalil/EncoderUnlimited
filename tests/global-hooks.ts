import { test as baseTest } from '@playwright/test';
import { FailureHandler } from '../src/utils/failure-handler.js';

/**
 * Global test hooks
 * Automatically handles failures for all tests
 */

// Extend base test with automatic failure handling
export const test = baseTest.extend({
  // This will run after each test
});

// Add afterEach hook to all tests
test.afterEach(async ({ page }, testInfo) => {
  // Automatically capture screenshots and videos on failure
  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    await FailureHandler.handleFailureComprehensive(page, testInfo);
  }
  
  // Close browser after every test (pass or fail)
  // Configurable via BROWSER_CLOSE_DELAY_MS environment variable (set to 0 to disable)
  const closeDelay = parseInt(process.env.BROWSER_CLOSE_DELAY_MS || '5000', 10);
  if (closeDelay > 0) {
    // Run in background - don't wait for it to complete
    FailureHandler.closeBrowserAfterTest(page, closeDelay, testInfo.status).catch(err => {
      console.error('Error in background browser close:', err);
    });
  }
});

export { expect } from '@playwright/test';
