import { Page, Locator, expect } from '@playwright/test';
import { allureLogger } from './allure-logger.js';

/**
 * Assertions Utility
 * Contains all reusable assertion functions for test validation
 */
export class Assertions {
  constructor(private page: Page) {}

  /**
   * Assert element is visible
   */
  async assertVisible(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert visible: ${selector}`, async () => {
      allureLogger.info(`Asserting element is visible: ${selector}`);
      await expect(this.page.locator(selector)).toBeVisible({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is visible: ${selector}`);
    });
  }

  /**
   * Assert element is not visible (hidden)
   */
  async assertHidden(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert hidden: ${selector}`, async () => {
      allureLogger.info(`Asserting element is hidden: ${selector}`);
      await expect(this.page.locator(selector)).toBeHidden({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is hidden: ${selector}`);
    });
  }

  /**
   * Assert element is enabled
   */
  async assertEnabled(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert enabled: ${selector}`, async () => {
      allureLogger.info(`Asserting element is enabled: ${selector}`);
      await expect(this.page.locator(selector)).toBeEnabled({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is enabled: ${selector}`);
    });
  }

  /**
   * Assert element is disabled
   */
  async assertDisabled(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert disabled: ${selector}`, async () => {
      allureLogger.info(`Asserting element is disabled: ${selector}`);
      await expect(this.page.locator(selector)).toBeDisabled({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is disabled: ${selector}`);
    });
  }

  /**
   * Assert element text equals expected value
   */
  async assertTextEquals(selector: string, expectedText: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert text equals: ${selector}`, async () => {
      allureLogger.info(`Asserting text equals for: ${selector}`, { expected: expectedText });
      await expect(this.page.locator(selector)).toHaveText(expectedText, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Text matches: ${expectedText}`);
    });
  }

  /**
   * Assert element text contains expected value
   */
  async assertTextContains(selector: string, expectedText: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert text contains: ${selector}`, async () => {
      allureLogger.info(`Asserting text contains for: ${selector}`, { expected: expectedText });
      await expect(this.page.locator(selector)).toContainText(expectedText, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Text contains: ${expectedText}`);
    });
  }

  /**
   * Assert element text matches regex pattern
   */
  async assertTextMatches(selector: string, pattern: RegExp, _message?: string): Promise<void> {
    await allureLogger.step(`Assert text matches pattern: ${selector}`, async () => {
      allureLogger.info(`Asserting text matches pattern for: ${selector}`, { pattern: pattern.toString() });
      await expect(this.page.locator(selector)).toHaveText(pattern, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Text matches pattern`);
    });
  }

  /**
   * Assert element has specific attribute value
   */
  async assertAttribute(selector: string, attributeName: string, expectedValue: string | RegExp, _message?: string): Promise<void> {
    await allureLogger.step(`Assert attribute: ${selector}`, async () => {
      allureLogger.info(`Asserting attribute for: ${selector}`, { attribute: attributeName, expected: expectedValue });
      await expect(this.page.locator(selector)).toHaveAttribute(attributeName, expectedValue, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Attribute matches: ${attributeName} = ${expectedValue}`);
    });
  }

  /**
   * Assert element has attribute (regardless of value)
   */
  async assertHasAttribute(selector: string, attributeName: string, message?: string): Promise<void> {
    await allureLogger.step(`Assert has attribute: ${selector}`, async () => {
      allureLogger.info(`Asserting element has attribute: ${selector}`, { attribute: attributeName });
      const value = await this.page.locator(selector).getAttribute(attributeName);
      if (value === null) {
        throw new Error(message || `Element ${selector} should have attribute ${attributeName}`);
      }
      allureLogger.info(`✓ Element has attribute: ${attributeName}`);
    });
  }

  /**
   * Assert checkbox/radio is checked
   */
  async assertChecked(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert checked: ${selector}`, async () => {
      allureLogger.info(`Asserting element is checked: ${selector}`);
      await expect(this.page.locator(selector)).toBeChecked({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is checked: ${selector}`);
    });
  }

  /**
   * Assert checkbox/radio is not checked
   */
  async assertUnchecked(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert unchecked: ${selector}`, async () => {
      allureLogger.info(`Asserting element is unchecked: ${selector}`);
      await expect(this.page.locator(selector)).not.toBeChecked({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is unchecked: ${selector}`);
    });
  }

  /**
   * Assert element count equals expected
   */
  async assertCount(selector: string, expectedCount: number, _message?: string): Promise<void> {
    await allureLogger.step(`Assert count: ${selector}`, async () => {
      allureLogger.info(`Asserting element count for: ${selector}`, { expected: expectedCount });
      await expect(this.page.locator(selector)).toHaveCount(expectedCount, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Element count matches: ${expectedCount}`);
    });
  }

  /**
   * Assert element count is greater than expected
   */
  async assertCountGreaterThan(selector: string, minCount: number, message?: string): Promise<void> {
    await allureLogger.step(`Assert count greater than: ${selector}`, async () => {
      allureLogger.info(`Asserting element count greater than for: ${selector}`, { min: minCount });
      const count = await this.page.locator(selector).count();
      if (count <= minCount) {
        throw new Error(message || `Expected more than ${minCount} elements for ${selector}, but found ${count}`);
      }
      allureLogger.info(`✓ Element count is greater than ${minCount}: ${count}`);
    });
  }

  /**
   * Assert element count is less than expected
   */
  async assertCountLessThan(selector: string, maxCount: number, message?: string): Promise<void> {
    await allureLogger.step(`Assert count less than: ${selector}`, async () => {
      allureLogger.info(`Asserting element count less than for: ${selector}`, { max: maxCount });
      const count = await this.page.locator(selector).count();
      if (count >= maxCount) {
        throw new Error(message || `Expected less than ${maxCount} elements for ${selector}, but found ${count}`);
      }
      allureLogger.info(`✓ Element count is less than ${maxCount}: ${count}`);
    });
  }

  /**
   * Assert URL equals expected
   */
  async assertURL(expectedURL: string | RegExp, _message?: string): Promise<void> {
    await allureLogger.step(`Assert URL`, async () => {
      allureLogger.info(`Asserting URL`, { expected: expectedURL });
      await expect(this.page).toHaveURL(expectedURL, { 
        timeout: 10000
      });
      allureLogger.info(`✓ URL matches: ${expectedURL}`);
    });
  }

  /**
   * Assert URL contains expected string
   */
  async assertURLContains(expectedString: string, message?: string): Promise<void> {
    await allureLogger.step(`Assert URL contains`, async () => {
      allureLogger.info(`Asserting URL contains`, { expected: expectedString });
      const currentURL = this.page.url();
      if (!currentURL.includes(expectedString)) {
        throw new Error(message || `URL should contain ${expectedString}, but was ${currentURL}`);
      }
      allureLogger.info(`✓ URL contains: ${expectedString}`);
    });
  }

  /**
   * Assert page title equals expected
   */
  async assertTitle(expectedTitle: string | RegExp, _message?: string): Promise<void> {
    await allureLogger.step(`Assert title`, async () => {
      allureLogger.info(`Asserting page title`, { expected: expectedTitle });
      await expect(this.page).toHaveTitle(expectedTitle, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Title matches: ${expectedTitle}`);
    });
  }

  /**
   * Assert page title contains expected string
   */
  async assertTitleContains(expectedString: string, message?: string): Promise<void> {
    await allureLogger.step(`Assert title contains`, async () => {
      allureLogger.info(`Asserting page title contains`, { expected: expectedString });
      const title = await this.page.title();
      if (!title.includes(expectedString)) {
        throw new Error(message || `Page title should contain ${expectedString}, but was ${title}`);
      }
      allureLogger.info(`✓ Title contains: ${expectedString}`);
    });
  }

  /**
   * Assert element has CSS class
   */
  async assertHasClass(selector: string, className: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert has class: ${selector}`, async () => {
      allureLogger.info(`Asserting element has class: ${selector}`, { className });
      await expect(this.page.locator(selector)).toHaveClass(new RegExp(className), { 
        timeout: 10000
      });
      allureLogger.info(`✓ Element has class: ${className}`);
    });
  }

  /**
   * Assert element value equals expected
   */
  async assertValue(selector: string, expectedValue: string | RegExp, _message?: string): Promise<void> {
    await allureLogger.step(`Assert value: ${selector}`, async () => {
      allureLogger.info(`Asserting element value for: ${selector}`, { expected: expectedValue });
      await expect(this.page.locator(selector)).toHaveValue(expectedValue, { 
        timeout: 10000
      });
      allureLogger.info(`✓ Value matches: ${expectedValue}`);
    });
  }

  /**
   * Assert element is focused
   */
  async assertFocused(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert focused: ${selector}`, async () => {
      allureLogger.info(`Asserting element is focused: ${selector}`);
      await expect(this.page.locator(selector)).toBeFocused({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is focused: ${selector}`);
    });
  }

  /**
   * Assert element is editable
   */
  async assertEditable(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert editable: ${selector}`, async () => {
      allureLogger.info(`Asserting element is editable: ${selector}`);
      await expect(this.page.locator(selector)).toBeEditable({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is editable: ${selector}`);
    });
  }

  /**
   * Assert element is not editable
   */
  async assertNotEditable(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert not editable: ${selector}`, async () => {
      allureLogger.info(`Asserting element is not editable: ${selector}`);
      await expect(this.page.locator(selector)).not.toBeEditable({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is not editable: ${selector}`);
    });
  }

  /**
   * Assert element has specific CSS property value
   */
  async assertCSSProperty(selector: string, propertyName: string, expectedValue: string, message?: string): Promise<void> {
    await allureLogger.step(`Assert CSS property: ${selector}`, async () => {
      allureLogger.info(`Asserting CSS property for: ${selector}`, { property: propertyName, expected: expectedValue });
      const actualValue = await this.page.locator(selector).evaluate(
        // @ts-expect-error - window is available in browser context
        (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
        propertyName
      );
      if (actualValue.trim() !== expectedValue.trim()) {
        throw new Error(message || `Element ${selector} should have CSS property ${propertyName} = ${expectedValue}, but was ${actualValue}`);
      }
      allureLogger.info(`✓ CSS property matches: ${propertyName} = ${expectedValue}`);
    });
  }

  /**
   * Assert element is in viewport
   */
  async assertInViewport(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert in viewport: ${selector}`, async () => {
      allureLogger.info(`Asserting element is in viewport: ${selector}`);
      await expect(this.page.locator(selector)).toBeInViewport({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is in viewport: ${selector}`);
    });
  }

  /**
   * Assert element is not in viewport
   */
  async assertNotInViewport(selector: string, _message?: string): Promise<void> {
    await allureLogger.step(`Assert not in viewport: ${selector}`, async () => {
      allureLogger.info(`Asserting element is not in viewport: ${selector}`);
      await expect(this.page.locator(selector)).not.toBeInViewport({ 
        timeout: 10000
      });
      allureLogger.info(`✓ Element is not in viewport: ${selector}`);
    });
  }

  /**
   * Assert two values are equal
   */
  async assertEqual(actual: unknown, expected: unknown, message?: string): Promise<void> {
    await allureLogger.step(`Assert equal`, async () => {
      allureLogger.info(`Asserting values are equal`, { actual, expected });
      if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, but got ${actual}`);
      }
      allureLogger.info(`✓ Values are equal`);
    });
  }

  /**
   * Assert two values are not equal
   */
  async assertNotEqual(actual: unknown, expected: unknown, message?: string): Promise<void> {
    await allureLogger.step(`Assert not equal`, async () => {
      allureLogger.info(`Asserting values are not equal`, { actual, expected });
      if (actual === expected) {
        throw new Error(message || `Expected values to be different, but both were ${actual}`);
      }
      allureLogger.info(`✓ Values are not equal`);
    });
  }

  /**
   * Assert value is truthy
   */
  async assertTrue(value: boolean, message?: string): Promise<void> {
    await allureLogger.step(`Assert true`, async () => {
      allureLogger.info(`Asserting value is true`, { value });
      if (!value) {
        throw new Error(message || `Expected value to be true, but was ${value}`);
      }
      allureLogger.info(`✓ Value is true`);
    });
  }

  /**
   * Assert value is falsy
   */
  async assertFalse(value: boolean, message?: string): Promise<void> {
    await allureLogger.step(`Assert false`, async () => {
      allureLogger.info(`Asserting value is false`, { value });
      if (value) {
        throw new Error(message || `Expected value to be false, but was ${value}`);
      }
      allureLogger.info(`✓ Value is false`);
    });
  }

  /**
   * Assert array contains value
   */
  async assertContains(array: unknown[], value: unknown, message?: string): Promise<void> {
    await allureLogger.step(`Assert contains`, async () => {
      allureLogger.info(`Asserting array contains value`, { array, value });
      if (!array.includes(value)) {
        throw new Error(message || `Array should contain ${value}`);
      }
      allureLogger.info(`✓ Array contains value`);
    });
  }

  /**
   * Assert string contains substring
   */
  async assertStringContains(str: string, substring: string, message?: string): Promise<void> {
    await allureLogger.step(`Assert string contains`, async () => {
      allureLogger.info(`Asserting string contains substring`, { str, substring });
      if (!str.includes(substring)) {
        throw new Error(message || `String should contain ${substring}`);
      }
      allureLogger.info(`✓ String contains substring`);
    });
  }

  /**
   * Assert number is greater than
   */
  async assertGreaterThan(actual: number, expected: number, message?: string): Promise<void> {
    await allureLogger.step(`Assert greater than`, async () => {
      allureLogger.info(`Asserting number is greater than`, { actual, expected });
      if (actual <= expected) {
        throw new Error(message || `Expected ${actual} to be greater than ${expected}`);
      }
      allureLogger.info(`✓ Number is greater than`);
    });
  }

  /**
   * Assert number is less than
   */
  async assertLessThan(actual: number, expected: number, message?: string): Promise<void> {
    await allureLogger.step(`Assert less than`, async () => {
      allureLogger.info(`Asserting number is less than`, { actual, expected });
      if (actual >= expected) {
        throw new Error(message || `Expected ${actual} to be less than ${expected}`);
      }
      allureLogger.info(`✓ Number is less than`);
    });
  }

  /**
   * Get locator for custom assertions
   */
  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
