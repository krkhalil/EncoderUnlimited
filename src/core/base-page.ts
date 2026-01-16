import { Page, Locator } from 'playwright';
import { WebOperations } from '../utils/web-operations.js';
import { Assertions } from '../utils/assertions.js';
import { allureLogger } from '../utils/allure-logger.js';

/**
 * Base Page Object Model class
 * Provides common functionality for all page objects
 * Integrates WebOperations and Assertions utilities
 */
export abstract class BasePage {
  protected page: Page;
  protected webOps: WebOperations;
  protected assertions: Assertions;

  constructor(page: Page) {
    this.page = page;
    this.webOps = new WebOperations(page);
    this.assertions = new Assertions(page);
  }

  /**
   * Navigate to the page
   */
  abstract navigate(): Promise<void>;

  /**
   * Wait for page to be loaded
   */
  abstract waitForLoad(): Promise<void>;

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Take a screenshot
   */
  async screenshot(path?: string): Promise<Buffer> {
    return await this.webOps.screenshot(path);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout?: number): Promise<Locator> {
    await this.webOps.waitForVisible(selector, { timeout });
    return this.page.locator(selector);
  }

  /**
   * Click an element
   */
  async clickElement(selector: string, options?: { timeout?: number; force?: boolean }): Promise<void> {
    await this.webOps.click(selector, options);
  }

  /**
   * Click element by text
   */
  async clickByText(text: string, options?: { exact?: boolean; timeout?: number }): Promise<void> {
    await this.webOps.clickByText(text, options);
  }

  /**
   * Fill an input field
   */
  async fillInput(selector: string, value: string, options?: { timeout?: number; clear?: boolean }): Promise<void> {
    await this.webOps.fill(selector, value, options);
  }

  /**
   * Get text from an element
   */
  async getElementText(selector: string, options?: { timeout?: number }): Promise<string> {
    return await this.webOps.getText(selector, options);
  }

  /**
   * Get inner text from an element
   */
  async getElementInnerText(selector: string, options?: { timeout?: number }): Promise<string> {
    return await this.webOps.getInnerText(selector, options);
  }

  /**
   * Get attribute value from an element
   */
  async getAttribute(selector: string, attributeName: string, options?: { timeout?: number }): Promise<string | null> {
    return await this.webOps.getAttribute(selector, attributeName, options);
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string, options?: { timeout?: number }): Promise<boolean> {
    return await this.webOps.isVisible(selector, options);
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(selector: string, options?: { timeout?: number }): Promise<boolean> {
    return await this.webOps.isEnabled(selector, options);
  }

  /**
   * Check if checkbox/radio is checked
   */
  async isElementChecked(selector: string, options?: { timeout?: number }): Promise<boolean> {
    return await this.webOps.isChecked(selector, options);
  }

  /**
   * Check a checkbox or radio button
   */
  async checkElement(selector: string, options?: { timeout?: number }): Promise<void> {
    await this.webOps.check(selector, options);
  }

  /**
   * Uncheck a checkbox
   */
  async uncheckElement(selector: string, options?: { timeout?: number }): Promise<void> {
    await this.webOps.uncheck(selector, options);
  }

  /**
   * Select an option from dropdown
   */
  async selectOption(selector: string, value: string | string[], options?: { timeout?: number }): Promise<void> {
    await this.webOps.selectOption(selector, value, options);
  }

  /**
   * Hover over an element
   */
  async hoverElement(selector: string, options?: { timeout?: number }): Promise<void> {
    await this.webOps.hover(selector, options);
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string, options?: { timeout?: number }): Promise<void> {
    await this.webOps.scrollIntoView(selector, options);
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' }): Promise<void> {
    await this.webOps.waitForNavigation(options);
  }

  /**
   * Wait for URL to match
   */
  async waitForURL(url: string | RegExp, options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' }): Promise<void> {
    await this.webOps.waitForURL(url, options);
  }

  /**
   * Reload the page
   */
  async reload(options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'; timeout?: number }): Promise<void> {
    await this.webOps.reload(options);
  }

  /**
   * Get count of elements
   */
  async getElementCount(selector: string): Promise<number> {
    return await this.webOps.getCount(selector);
  }

  /**
   * Get all text contents from multiple elements
   */
  async getAllTexts(selector: string): Promise<string[]> {
    return await this.webOps.getAllTexts(selector);
  }

  /**
   * Get all inner texts from multiple elements
   */
  async getAllInnerTexts(selector: string): Promise<string[]> {
    return await this.webOps.getAllInnerTexts(selector);
  }

  /**
   * Upload a file
   */
  async uploadFile(selector: string, filePath: string | string[], options?: { timeout?: number }): Promise<void> {
    await this.webOps.uploadFile(selector, filePath, options);
  }

  /**
   * Press a key on an element
   */
  async pressKey(selector: string, key: string, options?: { timeout?: number }): Promise<void> {
    await this.webOps.pressKey(selector, key, options);
  }

  /**
   * Execute JavaScript in page context
   */
  async executeScript<T>(script: string | Function, ...args: unknown[]): Promise<T> {
    return await this.webOps.executeScript<T>(script, ...args);
  }

  /**
   * Get locator for custom operations
   */
  getLocator(selector: string): Locator {
    return this.webOps.getLocator(selector);
  }

  /**
   * Get page instance
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Get WebOperations instance for advanced operations
   */
  getWebOperations(): WebOperations {
    return this.webOps;
  }

  /**
   * Get Assertions instance for custom assertions
   */
  getAssertions(): Assertions {
    return this.assertions;
  }
}
