import { Page, TestInfo } from '@playwright/test';
import { FailureHandler } from '../utils/failure-handler.js';

/**
 * Test Hooks
 * Global hooks for handling test lifecycle events
 */

/**
 * Setup hook - runs before each test
 */
export async function beforeEachHook(_page: Page, testInfo: TestInfo): Promise<void> {
  // Add test metadata to Allure (using available methods)
  // Note: testCaseId and historyId are not available in allure-playwright
  // Allure automatically tracks test cases by title
  
  // Log test start
  console.log(`\n🧪 Starting test: ${testInfo.title}`);
}

/**
 * Teardown hook - runs after each test
 * Handles failure artifacts automatically
 */
export async function afterEachHook(page: Page, testInfo: TestInfo): Promise<void> {
  // Handle failures
  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    console.log(`❌ Test failed: ${testInfo.title}`);
    
    try {
      // Attach failure artifacts to Allure
      await FailureHandler.handleFailureComprehensive(page, testInfo);
      
      // Note: statusDetails is not available in allure-playwright
      // Failure details are automatically captured by Allure
    } catch (error) {
      console.error('Error in failure handler:', error);
    }
  } else if (testInfo.status === 'passed') {
    console.log(`✅ Test passed: ${testInfo.title}`);
  } else if (testInfo.status === 'skipped') {
    console.log(`⏭️  Test skipped: ${testInfo.title}`);
  }
}

/**
 * Create a test wrapper that automatically handles failures
 */
export function withFailureHandling<T extends any[]>(
  testFn: (page: Page, testInfo: TestInfo, ...args: T) => Promise<void>
) {
  return async (page: Page, testInfo: TestInfo, ...args: T): Promise<void> => {
    try {
      await beforeEachHook(page, testInfo);
      await testFn(page, testInfo, ...args);
    } catch (error) {
      // Error will be handled by afterEachHook
      throw error;
    } finally {
      await afterEachHook(page, testInfo);
    }
  };
}
