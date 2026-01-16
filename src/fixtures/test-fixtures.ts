import { test as base, Page, TestInfo } from '@playwright/test';
import { FailureHandler } from '../utils/failure-handler.js';

/**
 * Extended test fixtures with automatic failure handling
 * 
 * Note: FailureHandler is a utility class with only static methods.
 * The fixture provides the class reference for type safety, but all
 * methods should be called statically (e.g., FailureHandler.method()).
 */
export const test = base.extend<{
  failureHandler: typeof FailureHandler;
}>({
  failureHandler: async ({ page }, use, testInfo: TestInfo) => {
    // Setup: Nothing needed before test
    
    // Provide the class reference (not an instance, since all methods are static)
    await use(FailureHandler);
    
    // Teardown: Handle failures after test
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
  },
});

export { expect } from '@playwright/test';
