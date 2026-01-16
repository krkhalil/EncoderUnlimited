import { Browser, BrowserContext, Page, chromium } from 'playwright';

/**
 * Core Playwright Automation Class
 * Provides high-level automation methods
 */
export class PlaywrightAutomation {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  /**
   * Initialize browser and context
   */
  async init(headless: boolean = true): Promise<void> {
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    this.page = await this.context.newPage();
  }

  /**
   * Navigate to a URL
   */
  async navigate(url: string): Promise<void> {
    if (!this.page) {
      await this.init();
    }
    await this.page!.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Click an element by selector or text
   */
  async click(selector: string): Promise<void> {
    if (!this.page) {
      throw new Error('Page not initialized. Call navigate() first.');
    }

    // Try as CSS selector first, then as text
    try {
      await this.page.click(selector, { timeout: 5000 });
    } catch {
      await this.page.click(`text=${selector}`, { timeout: 5000 });
    }
  }

  /**
   * Fill an input field
   */
  async fill(selector: string, value: string): Promise<void> {
    if (!this.page) {
      throw new Error('Page not initialized. Call navigate() first.');
    }
    await this.page.fill(selector, value);
  }

  /**
   * Take a screenshot
   */
  async screenshot(path?: string): Promise<string> {
    if (!this.page) {
      throw new Error('Page not initialized. Call navigate() first.');
    }
    const screenshotPath = path || `screenshot-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  /**
   * Get text content from an element
   */
  async getText(selector: string): Promise<string> {
    if (!this.page) {
      throw new Error('Page not initialized. Call navigate() first.');
    }
    return await this.page.textContent(selector) || '';
  }

  /**
   * Wait for an element to appear
   */
  async waitForSelector(selector: string, timeout?: number): Promise<void> {
    if (!this.page) {
      throw new Error('Page not initialized. Call navigate() first.');
    }
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Get current browser state
   */
  async getBrowserState(): Promise<{
    url: string;
    title: string;
    viewport: { width: number; height: number };
  }> {
    if (!this.page) {
      throw new Error('Page not initialized. Call navigate() first.');
    }
    return {
      url: this.page.url(),
      title: await this.page.title(),
      viewport: this.page.viewportSize() || { width: 1920, height: 1080 },
    };
  }

  /**
   * Clean up resources
   */
  async close(): Promise<void> {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
    this.page = null;
    this.context = null;
    this.browser = null;
  }
}
