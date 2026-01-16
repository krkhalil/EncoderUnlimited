import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { allureLogger } from '../src/utils/allure-logger.js';
import { FailureHandler } from '../src/utils/failure-handler.js';

/**
 * Example test using Playwright directly with Allure reporting
 */
test.describe('Example Tests', () => {
  test('should navigate to example.com', async ({ page }) => {
    allure.epic('Navigation');
    allure.feature('Basic Navigation');
    allure.story('Navigate to example.com');
    
    await allureLogger.step('Navigate to example.com', async () => {
      allureLogger.info('Starting navigation to example.com');
      await page.goto('https://example.com');
      allureLogger.info('Navigation completed');
    });

    await allureLogger.step('Verify page title', async () => {
      allureLogger.info('Checking page title');
      await expect(page).toHaveTitle(/Example Domain/);
      allureLogger.info('Page title verified successfully');
    });
  });

  test('should interact with elements', async ({ page }) => {
    allure.epic('Element Interaction');
    allure.feature('Element Visibility');
    allure.story('Interact with page elements');

    await allureLogger.step('Navigate to example.com', async () => {
      allureLogger.info('Navigating to example.com');
      await page.goto('https://example.com');
    });

    await allureLogger.step('Verify heading element', async () => {
      allureLogger.info('Locating heading element');
      const heading = page.locator('h1');
      
      allureLogger.info('Checking if heading is visible');
      await expect(heading).toBeVisible();
      
      allureLogger.info('Verifying heading text content');
      await expect(heading).toContainText('Example');
      allureLogger.info('Heading element verified successfully');
    });
  });

  // Add afterEach hook to automatically handle failures
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
  });
});
