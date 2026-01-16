import { Page } from 'playwright';
import { BasePage } from '../core/base-page.js';

/**
 * Example Page Object Model
 * Demonstrates how to create page objects using the base class
 * with WebOperations and Assertions utilities
 */
export class ExamplePage extends BasePage {
  // Selectors - Use readonly for immutability
  private readonly headingSelector = 'h1';
  private readonly linkSelector = 'a';
  private readonly paragraphSelector = 'p';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the example page
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://example.com');
    await this.waitForLoad();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoad(): Promise<void> {
    await this.waitForElement(this.headingSelector);
  }

  /**
   * Get heading text
   */
  async getHeadingText(): Promise<string> {
    return await this.getElementText(this.headingSelector);
  }

  /**
   * Click the link
   */
  async clickLink(): Promise<void> {
    await this.clickElement(this.linkSelector);
  }

  /**
   * Get all paragraph texts
   */
  async getAllParagraphTexts(): Promise<string[]> {
    return await this.getAllTexts(this.paragraphSelector);
  }

  /**
   * Assert heading is visible
   */
  async assertHeadingVisible(): Promise<void> {
    await this.assertions.assertVisible(this.headingSelector);
  }

  /**
   * Assert heading text equals expected
   */
  async assertHeadingText(expectedText: string): Promise<void> {
    await this.assertions.assertTextEquals(this.headingSelector, expectedText);
  }
}
