import { test as base, Page, TestInfo } from '@playwright/test';
import { FailureHandler } from '../utils/failure-handler.js';

/**
 * Extended test fixtures with automatic failure handling
 */
export const test = base.extend<{
  failureHandler: FailureHandler;
}>({
  failureHandler: async ({ page }, use, testInfo: TestInfo) => {
    // Setup: Nothing needed before test
    
    await use(FailureHandler);
    
    // Teardown: Handle failures after test
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
  },
});

export { expect } from '@playwright/test';
