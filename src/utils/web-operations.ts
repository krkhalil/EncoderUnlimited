import { Page, Locator, ElementHandle } from 'playwright';
import { allureLogger } from './allure-logger.js';

/**
 * Web Operations Utility
 * Contains all mandatory operations for web-based UI automation
 */
export class WebOperations {
  constructor(private page: Page) {}

  /**
   * Click on an element by selector
   */
  async click(selector: string, options?: { timeout?: number; force?: boolean }): Promise<void> {
    await allureLogger.step(`Click element: ${selector}`, async () => {
      allureLogger.info(`Attempting to click element: ${selector}`);
      const locator = this.page.locator(selector);
      await locator.click({ timeout: options?.timeout, force: options?.force });
      allureLogger.info(`Successfully clicked element: ${selector}`);
    });
  }

  /**
   * Click on an element by text content
   */
  async clickByText(text: string, options?: { exact?: boolean; timeout?: number }): Promise<void> {
    await allureLogger.step(`Click element by text: ${text}`, async () => {
      allureLogger.info(`Attempting to click element with text: ${text}`);
      await this.page.getByText(text, { exact: options?.exact }).click({ timeout: options?.timeout });
      allureLogger.info(`Successfully clicked element with text: ${text}`);
    });
  }

  /**
   * Double click on an element
   */
  async doubleClick(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Double click element: ${selector}`, async () => {
      allureLogger.info(`Attempting to double click element: ${selector}`);
      await this.page.locator(selector).dblclick({ timeout: options?.timeout });
      allureLogger.info(`Successfully double clicked element: ${selector}`);
    });
  }

  /**
   * Right click on an element
   */
  async rightClick(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Right click element: ${selector}`, async () => {
      allureLogger.info(`Attempting to right click element: ${selector}`);
      await this.page.locator(selector).click({ button: 'right', timeout: options?.timeout });
      allureLogger.info(`Successfully right clicked element: ${selector}`);
    });
  }

  /**
   * Fill an input field
   */
  async fill(selector: string, value: string, options?: { timeout?: number; clear?: boolean }): Promise<void> {
    await allureLogger.step(`Fill input: ${selector} with value: ${value}`, async () => {
      allureLogger.info(`Filling input field: ${selector}`);
      const locator = this.page.locator(selector);
      if (options?.clear) {
        await locator.clear({ timeout: options?.timeout });
      }
      await locator.fill(value, { timeout: options?.timeout });
      allureLogger.info(`Successfully filled input: ${selector}`);
    });
  }

  /**
   * Type text into an input field (simulates typing)
   */
  async type(selector: string, text: string, options?: { delay?: number; timeout?: number }): Promise<void> {
    await allureLogger.step(`Type text: ${text} into: ${selector}`, async () => {
      allureLogger.info(`Typing text into: ${selector}`);
      await this.page.locator(selector).type(text, { delay: options?.delay, timeout: options?.timeout });
      allureLogger.info(`Successfully typed text into: ${selector}`);
    });
  }

  /**
   * Clear an input field
   */
  async clear(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Clear input: ${selector}`, async () => {
      allureLogger.info(`Clearing input field: ${selector}`);
      await this.page.locator(selector).clear({ timeout: options?.timeout });
      allureLogger.info(`Successfully cleared input: ${selector}`);
    });
  }

  /**
   * Get text content from an element
   */
  async getText(selector: string, options?: { timeout?: number }): Promise<string> {
    return await allureLogger.step(`Get text from: ${selector}`, async () => {
      allureLogger.info(`Getting text from element: ${selector}`);
      const text = await this.page.locator(selector).textContent({ timeout: options?.timeout }) || '';
      allureLogger.info(`Retrieved text: ${text}`);
      return text;
    });
  }

  /**
   * Get inner text from an element
   */
  async getInnerText(selector: string, options?: { timeout?: number }): Promise<string> {
    return await allureLogger.step(`Get inner text from: ${selector}`, async () => {
      allureLogger.info(`Getting inner text from element: ${selector}`);
      const text = await this.page.locator(selector).innerText({ timeout: options?.timeout });
      allureLogger.info(`Retrieved inner text: ${text}`);
      return text;
    });
  }

  /**
   * Get attribute value from an element
   */
  async getAttribute(selector: string, attributeName: string, options?: { timeout?: number }): Promise<string | null> {
    return await allureLogger.step(`Get attribute ${attributeName} from: ${selector}`, async () => {
      allureLogger.info(`Getting attribute ${attributeName} from element: ${selector}`);
      const value = await this.page.locator(selector).getAttribute(attributeName, { timeout: options?.timeout });
      allureLogger.info(`Retrieved attribute value: ${value}`);
      return value;
    });
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string, options?: { timeout?: number }): Promise<boolean> {
    return await allureLogger.step(`Check visibility of: ${selector}`, async () => {
      allureLogger.info(`Checking visibility of element: ${selector}`);
      const isVisible = await this.page.locator(selector).isVisible({ timeout: options?.timeout });
      allureLogger.info(`Element ${selector} is ${isVisible ? 'visible' : 'not visible'}`);
      return isVisible;
    });
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector: string, options?: { timeout?: number }): Promise<boolean> {
    return await allureLogger.step(`Check if enabled: ${selector}`, async () => {
      allureLogger.info(`Checking if element is enabled: ${selector}`);
      const isEnabled = await this.page.locator(selector).isEnabled({ timeout: options?.timeout });
      allureLogger.info(`Element ${selector} is ${isEnabled ? 'enabled' : 'disabled'}`);
      return isEnabled;
    });
  }

  /**
   * Check if checkbox/radio is checked
   */
  async isChecked(selector: string, options?: { timeout?: number }): Promise<boolean> {
    return await allureLogger.step(`Check if checked: ${selector}`, async () => {
      allureLogger.info(`Checking if element is checked: ${selector}`);
      const isChecked = await this.page.locator(selector).isChecked({ timeout: options?.timeout });
      allureLogger.info(`Element ${selector} is ${isChecked ? 'checked' : 'not checked'}`);
      return isChecked;
    });
  }

  /**
   * Check a checkbox or radio button
   */
  async check(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Check element: ${selector}`, async () => {
      allureLogger.info(`Checking element: ${selector}`);
      await this.page.locator(selector).check({ timeout: options?.timeout });
      allureLogger.info(`Successfully checked element: ${selector}`);
    });
  }

  /**
   * Uncheck a checkbox
   */
  async uncheck(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Uncheck element: ${selector}`, async () => {
      allureLogger.info(`Unchecking element: ${selector}`);
      await this.page.locator(selector).uncheck({ timeout: options?.timeout });
      allureLogger.info(`Successfully unchecked element: ${selector}`);
    });
  }

  /**
   * Select an option from a dropdown/select element
   */
  async selectOption(selector: string, value: string | string[], options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Select option from: ${selector}`, async () => {
      allureLogger.info(`Selecting option: ${value} from: ${selector}`);
      await this.page.locator(selector).selectOption(value, { timeout: options?.timeout });
      allureLogger.info(`Successfully selected option from: ${selector}`);
    });
  }

  /**
   * Hover over an element
   */
  async hover(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Hover over: ${selector}`, async () => {
      allureLogger.info(`Hovering over element: ${selector}`);
      await this.page.locator(selector).hover({ timeout: options?.timeout });
      allureLogger.info(`Successfully hovered over element: ${selector}`);
    });
  }

  /**
   * Focus on an element
   */
  async focus(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Focus on: ${selector}`, async () => {
      allureLogger.info(`Focusing on element: ${selector}`);
      await this.page.locator(selector).focus({ timeout: options?.timeout });
      allureLogger.info(`Successfully focused on element: ${selector}`);
    });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Scroll into view: ${selector}`, async () => {
      allureLogger.info(`Scrolling element into view: ${selector}`);
      await this.page.locator(selector).scrollIntoViewIfNeeded({ timeout: options?.timeout });
      allureLogger.info(`Successfully scrolled element into view: ${selector}`);
    });
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(selector: string, options?: { timeout?: number; state?: 'visible' | 'hidden' | 'attached' | 'detached' }): Promise<void> {
    await allureLogger.step(`Wait for visible: ${selector}`, async () => {
      allureLogger.info(`Waiting for element to be visible: ${selector}`);
      await this.page.locator(selector).waitFor({ 
        state: options?.state || 'visible', 
        timeout: options?.timeout 
      });
      allureLogger.info(`Element is now visible: ${selector}`);
    });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Wait for hidden: ${selector}`, async () => {
      allureLogger.info(`Waiting for element to be hidden: ${selector}`);
      await this.page.locator(selector).waitFor({ state: 'hidden', timeout: options?.timeout });
      allureLogger.info(`Element is now hidden: ${selector}`);
    });
  }

  /**
   * Wait for element count
   */
  async waitForCount(selector: string, count: number, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Wait for count ${count} of: ${selector}`, async () => {
      allureLogger.info(`Waiting for ${count} elements: ${selector}`);
      await this.page.locator(selector).first().waitFor({ timeout: options?.timeout });
      const elements = await this.page.locator(selector).count();
      if (elements !== count) {
        throw new Error(`Expected ${count} elements, but found ${elements}`);
      }
      allureLogger.info(`Found ${count} elements: ${selector}`);
    });
  }

  /**
   * Get count of elements matching selector
   */
  async getCount(selector: string): Promise<number> {
    return await allureLogger.step(`Get count of: ${selector}`, async () => {
      allureLogger.info(`Getting count of elements: ${selector}`);
      const count = await this.page.locator(selector).count();
      allureLogger.info(`Found ${count} elements: ${selector}`);
      return count;
    });
  }

  /**
   * Upload a file
   */
  async uploadFile(selector: string, filePath: string | string[], options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Upload file to: ${selector}`, async () => {
      allureLogger.info(`Uploading file to: ${selector}`);
      await this.page.locator(selector).setInputFiles(filePath, { timeout: options?.timeout });
      allureLogger.info(`Successfully uploaded file to: ${selector}`);
    });
  }

  /**
   * Press a key
   */
  async pressKey(selector: string, key: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Press key ${key} on: ${selector}`, async () => {
      allureLogger.info(`Pressing key ${key} on element: ${selector}`);
      await this.page.locator(selector).press(key, { timeout: options?.timeout });
      allureLogger.info(`Successfully pressed key on element: ${selector}`);
    });
  }

  /**
   * Press keyboard key (page level)
   */
  async pressKeyboardKey(key: string): Promise<void> {
    await allureLogger.step(`Press keyboard key: ${key}`, async () => {
      allureLogger.info(`Pressing keyboard key: ${key}`);
      await this.page.keyboard.press(key);
      allureLogger.info(`Successfully pressed keyboard key: ${key}`);
    });
  }

  /**
   * Take screenshot
   */
  async screenshot(path?: string, options?: { fullPage?: boolean }): Promise<Buffer> {
    return await allureLogger.step(`Take screenshot`, async () => {
      allureLogger.info(`Taking screenshot`);
      const screenshot = await this.page.screenshot({ 
        path, 
        fullPage: options?.fullPage ?? true 
      });
      if (screenshot) {
        allureLogger.attach('screenshot', screenshot, 'image/png');
      }
      allureLogger.info(`Screenshot taken successfully`);
      return screenshot;
    });
  }

  /**
   * Get all text contents from multiple elements
   */
  async getAllTexts(selector: string): Promise<string[]> {
    return await allureLogger.step(`Get all texts from: ${selector}`, async () => {
      allureLogger.info(`Getting all text contents from: ${selector}`);
      const texts = await this.page.locator(selector).allTextContents();
      allureLogger.info(`Retrieved ${texts.length} text contents`);
      return texts;
    });
  }

  /**
   * Get all inner texts from multiple elements
   */
  async getAllInnerTexts(selector: string): Promise<string[]> {
    return await allureLogger.step(`Get all inner texts from: ${selector}`, async () => {
      allureLogger.info(`Getting all inner texts from: ${selector}`);
      const texts = await this.page.locator(selector).allInnerTexts();
      allureLogger.info(`Retrieved ${texts.length} inner texts`);
      return texts;
    });
  }

  /**
   * Switch to iframe
   */
  async switchToIframe(selector: string, options?: { timeout?: number }): Promise<void> {
    await allureLogger.step(`Switch to iframe: ${selector}`, async () => {
      allureLogger.info(`Switching to iframe: ${selector}`);
      const frame = await this.page.locator(selector).contentFrame();
      if (!frame) {
        throw new Error(`Could not find iframe: ${selector}`);
      }
      allureLogger.info(`Successfully switched to iframe: ${selector}`);
    });
  }

  /**
   * Switch to main frame
   */
  async switchToMainFrame(): Promise<void> {
    await allureLogger.step(`Switch to main frame`, async () => {
      allureLogger.info(`Switching to main frame`);
      // Playwright automatically works with main frame, but we can ensure it
      allureLogger.info(`Successfully switched to main frame`);
    });
  }

  /**
   * Handle alert/dialog
   */
  async handleDialog(accept: boolean, promptText?: string): Promise<string | null> {
    return await allureLogger.step(`Handle dialog (${accept ? 'accept' : 'dismiss'})`, async () => {
      allureLogger.info(`Handling dialog`);
      return new Promise((resolve) => {
        this.page.once('dialog', async (dialog) => {
          const message = dialog.message();
          if (accept) {
            if (promptText && dialog.type() === 'prompt') {
              await dialog.accept(promptText);
            } else {
              await dialog.accept();
            }
          } else {
            await dialog.dismiss();
          }
          resolve(message);
        });
      });
    });
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }): Promise<void> {
    await allureLogger.step(`Wait for navigation`, async () => {
      allureLogger.info(`Waiting for navigation`);
      await this.page.waitForLoadState(options?.waitUntil || 'networkidle', { timeout: options?.timeout });
      allureLogger.info(`Navigation completed`);
    });
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForURL(url: string | RegExp, options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' }): Promise<void> {
    await allureLogger.step(`Wait for URL: ${url}`, async () => {
      allureLogger.info(`Waiting for URL: ${url}`);
      await this.page.waitForURL(url, { timeout: options?.timeout, waitUntil: options?.waitUntil });
      allureLogger.info(`URL matched: ${url}`);
    });
  }

  /**
   * Reload the page
   */
  async reload(options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'; timeout?: number }): Promise<void> {
    await allureLogger.step(`Reload page`, async () => {
      allureLogger.info(`Reloading page`);
      await this.page.reload({ waitUntil: options?.waitUntil, timeout: options?.timeout });
      allureLogger.info(`Page reloaded successfully`);
    });
  }

  /**
   * Go back in browser history
   */
  async goBack(options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'; timeout?: number }): Promise<void> {
    await allureLogger.step(`Go back`, async () => {
      allureLogger.info(`Going back in browser history`);
      await this.page.goBack({ waitUntil: options?.waitUntil, timeout: options?.timeout });
      allureLogger.info(`Successfully went back`);
    });
  }

  /**
   * Go forward in browser history
   */
  async goForward(options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'; timeout?: number }): Promise<void> {
    await allureLogger.step(`Go forward`, async () => {
      allureLogger.info(`Going forward in browser history`);
      await this.page.goForward({ waitUntil: options?.waitUntil, timeout: options?.timeout });
      allureLogger.info(`Successfully went forward`);
    });
  }

  /**
   * Execute JavaScript in page context
   */
  async executeScript<T>(script: string | Function, ...args: unknown[]): Promise<T> {
    return await allureLogger.step(`Execute script`, async () => {
      allureLogger.info(`Executing script`);
      const result = await this.page.evaluate(script as any, ...args);
      allureLogger.info(`Script executed successfully`);
      return result as T;
    });
  }

  /**
   * Get page locator
   */
  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get page instance
   */
  getPage(): Page {
    return this.page;
  }
}
