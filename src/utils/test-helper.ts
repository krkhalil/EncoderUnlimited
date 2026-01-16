import { Page, TestInfo } from '@playwright/test';
import { FailureHandler } from './failure-handler.js';

/**
 * Test Helper
 * Provides utilities for test execution with automatic failure handling
 */
export class TestHelper {
  /**
   * Execute test with automatic failure handling
   */
  static async executeWithFailureHandling(
    page: Page,
    testInfo: TestInfo,
    testFn: () => Promise<void>
  ): Promise<void> {
    try {
      await testFn();
    } catch (error) {
      // Capture failure artifacts before rethrowing
      await FailureHandler.handleFailureComprehensive(page, testInfo);
      throw error;
    }
  }

  /**
   * Wrap test function with failure handling
   */
  static wrapTest(
    testFn: (page: Page, testInfo: TestInfo) => Promise<void>
  ): (page: Page, testInfo: TestInfo) => Promise<void> {
    return async (page: Page, testInfo: TestInfo) => {
      await this.executeWithFailureHandling(page, testInfo, () => testFn(page, testInfo));
    };
  }
}
