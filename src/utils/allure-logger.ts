import { allure } from 'allure-playwright';
import { LogLevel } from './logger.js';

/**
 * Allure-integrated logger that attaches logs to Allure reports
 */
export class AllureLogger {
  private level: LogLevel;
  private logs: Array<{ level: string; message: string; timestamp: string }> = [];

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  private formatMessage(level: string, message: string, ...args: unknown[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
  }

  private attachToAllure(level: string, message: string, ...args: unknown[]): void {
    const formattedMessage = this.formatMessage(level, message, ...args);
    
    // Store log for batch attachment
    this.logs.push({
      level,
      message: formattedMessage,
      timestamp: new Date().toISOString(),
    });

    // Attach individual log as attachment (not as step to avoid too many nested steps)
    try {
      allure.attachment(
        `log-${level.toLowerCase()}`,
        JSON.stringify({ message, args, timestamp: new Date().toISOString() }, null, 2),
        'application/json'
      );
    } catch (error) {
      // If not in test context, skip attachment
    }
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.level <= LogLevel.DEBUG) {
      const formatted = this.formatMessage('DEBUG', message, ...args);
      console.debug(formatted);
      this.attachToAllure('DEBUG', message, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.level <= LogLevel.INFO) {
      const formatted = this.formatMessage('INFO', message, ...args);
      console.info(formatted);
      this.attachToAllure('INFO', message, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.level <= LogLevel.WARN) {
      const formatted = this.formatMessage('WARN', message, ...args);
      console.warn(formatted);
      this.attachToAllure('WARN', message, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.level <= LogLevel.ERROR) {
      const formatted = this.formatMessage('ERROR', message, ...args);
      console.error(formatted);
      this.attachToAllure('ERROR', message, ...args);
    }
  }

  /**
   * Attach all collected logs as a single attachment
   */
  attachLogsToAllure(): void {
    if (this.logs.length > 0) {
      try {
        allure.attachment(
          'test-logs',
          JSON.stringify(this.logs, null, 2),
          'application/json'
        );
      } catch (error) {
        // If not in test context, skip
      }
    }
  }

  /**
   * Clear collected logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Attach a custom attachment to Allure
   */
  attach(name: string, content: string | Buffer, type: string = 'text/plain'): void {
    try {
      allure.attachment(name, content, type);
    } catch (error) {
      console.log(`[Allure] Attachment ${name} skipped (not in test context)`);
    }
  }

  /**
   * Add a step to Allure report
   */
  async step<T>(name: string, body: () => T | Promise<T>): Promise<T> {
    try {
      return await allure.step(name, body);
    } catch (error) {
      // If not in test context, just execute the body
      const result = body();
      return result instanceof Promise ? await result : result;
    }
  }
}

export const allureLogger = new AllureLogger(LogLevel.INFO);
