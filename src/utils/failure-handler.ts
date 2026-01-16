import { Page, TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Failure Handler Utility
 * Handles screenshot and video capture on test failures
 * Automatically attaches them to Allure reports
 */
export class FailureHandler {
  /**
   * Attach screenshot to Allure report
   */
  static async attachScreenshot(page: Page, _testInfo: TestInfo, name: string = 'Screenshot on Failure'): Promise<void> {
    try {
      const { allure } = await import('allure-playwright');
      const screenshot = await page.screenshot({ fullPage: true });
      if (screenshot) {
        allure.attachment(name, screenshot, 'image/png');
      }
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  }

  /**
   * Attach video to Allure report
   */
  static async attachVideo(testInfo: TestInfo, name: string = 'Video on Failure'): Promise<void> {
    try {
      const { allure } = await import('allure-playwright');
      
      // Try to find video in test results directory
      const testResultsDir = path.join(process.cwd(), 'test-results');
      if (fs.existsSync(testResultsDir)) {
        const videoFiles = this.findVideoFiles(testResultsDir, testInfo.title);
        if (videoFiles.length > 0) {
          const latestVideo = videoFiles[videoFiles.length - 1];
          const videoBuffer = fs.readFileSync(latestVideo);
          allure.attachment(name, videoBuffer, 'video/webm');
        }
      }
    } catch (error) {
      console.error('Failed to attach video:', error);
    }
  }

  /**
   * Attach trace to Allure report
   */
  static async attachTrace(testInfo: TestInfo, name: string = 'Trace on Failure'): Promise<void> {
    try {
      const { allure } = await import('allure-playwright');
      const tracePath = testInfo.outputPath('trace.zip');
      
      if (tracePath && fs.existsSync(tracePath)) {
        const traceBuffer = fs.readFileSync(tracePath);
        allure.attachment(name, traceBuffer, 'application/zip');
      }
    } catch (error) {
      console.error('Failed to attach trace:', error);
    }
  }

  /**
   * Handle test failure - capture screenshot, video, and trace
   */
  static async handleTestFailure(page: Page, testInfo: TestInfo): Promise<void> {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      try {
        const { allureLogger } = await import('./allure-logger.js');
        const { allure } = await import('allure-playwright');
        
        allureLogger.info('Test failed - capturing screenshots and videos');
        
        // Attach screenshot
        await this.attachScreenshot(page, testInfo, `Screenshot - ${testInfo.title}`);
        
        // Attach video if available
        await this.attachVideo(testInfo, `Video - ${testInfo.title}`);
        
        // Attach trace if available
        if (testInfo.outputPath('trace.zip')) {
          await this.attachTrace(testInfo, `Trace - ${testInfo.title}`);
        }
        
        // Attach error details
        if (testInfo.error) {
          const errorDetails = {
            message: testInfo.error.message,
            stack: testInfo.error.stack,
            timestamp: new Date().toISOString(),
          };
          allure.attachment(
            'Error Details',
            JSON.stringify(errorDetails, null, 2),
            'application/json'
          );
        }
        
        allureLogger.info('Failure artifacts attached to Allure report');
      } catch (error) {
        console.error('Error handling test failure:', error);
      }
    }
  }

  /**
   * Find video files in test results directory
   */
  private static findVideoFiles(dir: string, _testTitle: string): string[] {
    const videoFiles: string[] = [];
    
    try {
      const files = fs.readdirSync(dir, { recursive: true });
      for (const file of files) {
        if (typeof file === 'string') {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isFile() && (file.endsWith('.webm') || file.endsWith('.mp4'))) {
            videoFiles.push(filePath);
          }
        }
      }
    } catch (error) {
      console.error('Error finding video files:', error);
    }
    
    return videoFiles.sort();
  }

  /**
   * Attach page HTML snapshot
   */
  static async attachPageHTML(page: Page, name: string = 'Page HTML on Failure'): Promise<void> {
    try {
      const { allure } = await import('allure-playwright');
      const html = await page.content();
      allure.attachment(name, html, 'text/html');
    } catch (error) {
      console.error('Failed to capture page HTML:', error);
    }
  }

  /**
   * Attach console logs
   */
  static async attachConsoleLogs(page: Page, name: string = 'Console Logs on Failure'): Promise<void> {
    try {
      const { allure } = await import('allure-playwright');
      const logs: string[] = [];
      page.on('console', (msg) => {
        logs.push(`[${msg.type()}] ${msg.text()}`);
      });
      
      if (logs.length > 0) {
        allure.attachment(name, logs.join('\n'), 'text/plain');
      }
    } catch (error) {
      console.error('Failed to capture console logs:', error);
    }
  }

  /**
   * Close browser after test with a delay
   * This prevents browsers from staying open indefinitely after tests
   * Only closes in headless mode - keeps browser open in headed mode for debugging
   * @param page - Playwright page object
   * @param delayMs - Delay in milliseconds before closing (default: 5 seconds)
   * @param testStatus - Status of the test ('passed', 'failed', 'timedOut', etc.)
   */
  static async closeBrowserAfterTest(page: Page, delayMs: number = 5000, testStatus?: string): Promise<void> {
    try {
      const { allureLogger } = await import('./allure-logger.js');
      const context = page.context();
      
      // Check if browser is already closed
      if (!context || !context.browser()?.isConnected()) {
        allureLogger.info('Browser already closed');
        return;
      }

      // Check if we're in headed mode (not headless) - don't close if debugging
      // In headed mode, user might want to inspect the page
      const isHeadless = process.env.HEADLESS !== 'false' && 
                        !process.env.PWDEBUG && 
                        !process.env.DEBUG;
      
      if (!isHeadless) {
        allureLogger.info('Browser kept open for debugging (headed mode)');
        return;
      }

      const statusText = testStatus === 'failed' || testStatus === 'timedOut' 
        ? 'after failure' 
        : 'after test';
      allureLogger.info(`Browser will close in ${delayMs / 1000} seconds ${statusText}`);
      
      // Wait for the specified delay to allow user to see the result
      await new Promise(resolve => setTimeout(resolve, delayMs));
      
      // Close the browser context
      if (context && context.browser()?.isConnected()) {
        await context.close();
        allureLogger.info(`Browser closed ${statusText}`);
      }
    } catch (error) {
      console.error('Error closing browser after test:', error);
      // Don't throw - this is cleanup, not critical
    }
  }

  /**
   * Close browser after failure with a delay
   * @deprecated Use closeBrowserAfterTest instead
   * This method is kept for backward compatibility
   */
  static async closeBrowserAfterFailure(page: Page, delayMs: number = 5000): Promise<void> {
    return this.closeBrowserAfterTest(page, delayMs, 'failed');
  }

  /**
   * Comprehensive failure handling with all artifacts
   */
  static async handleFailureComprehensive(page: Page, testInfo: TestInfo, closeBrowserDelayMs?: number): Promise<void> {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      const { allureLogger } = await import('./allure-logger.js');
      await allureLogger.step('Capturing failure artifacts', async () => {
        // Screenshot
        await this.attachScreenshot(page, testInfo, 'Failure Screenshot');
        
        // Video
        await this.attachVideo(testInfo, 'Failure Video');
        
        // Page HTML
        await this.attachPageHTML(page, 'Page HTML');
        
        // Trace
        await this.attachTrace(testInfo, 'Trace File');
        
        // Error details
        if (testInfo.error) {
          const { allure } = await import('allure-playwright');
          const errorInfo = {
            test: testInfo.title,
            error: testInfo.error.message,
            stack: testInfo.error.stack,
            duration: testInfo.duration,
            retry: testInfo.retry,
            timestamp: new Date().toISOString(),
          };
          allure.attachment(
            'Test Failure Details',
            JSON.stringify(errorInfo, null, 2),
            'application/json'
          );
        }
      });

      // Close browser after failure if delay is specified (default: 5 seconds)
      // Only closes in headless mode - keeps browser open in headed mode for debugging
      // Configurable via BROWSER_CLOSE_DELAY_MS environment variable (set to 0 to disable)
      const closeDelay = closeBrowserDelayMs ?? parseInt(process.env.BROWSER_CLOSE_DELAY_MS || '5000', 10);
      if (closeDelay > 0) {
        // Run in background - don't wait for it to complete
        // This allows the test to finish while browser closes after delay
        this.closeBrowserAfterTest(page, closeDelay, testInfo.status).catch(err => {
          console.error('Error in background browser close:', err);
        });
      }
    }
  }
}
