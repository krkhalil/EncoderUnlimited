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
   * Comprehensive failure handling with all artifacts
   */
  static async handleFailureComprehensive(page: Page, testInfo: TestInfo): Promise<void> {
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
    }
  }
}
