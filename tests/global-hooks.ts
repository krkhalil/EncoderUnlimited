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
});

export { expect } from '@playwright/test';
