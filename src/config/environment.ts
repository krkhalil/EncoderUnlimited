import * as fs from 'fs';
import * as path from 'path';

/**
 * Environment Configuration Interface
 */
export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  apiURL: string;
  timeout: number;
  retries: number;
  workers: number;
  headless: boolean;
  screenshot: 'on' | 'off' | 'only-on-failure';
  video: 'on' | 'off' | 'on-first-retry' | 'retain-on-failure';
  trace: 'on' | 'off' | 'on-first-retry' | 'retain-on-failure';
  credentials: {
    username: string;
    password: string;
  };
  features: {
    enableDebugMode: boolean;
    enableScreenshots: boolean;
    enableVideos: boolean;
  };
}

/**
 * Environment Loader
 * Loads environment-specific configuration from JSON files
 */
export class EnvironmentLoader {
  private static config: EnvironmentConfig | null = null;
  private static currentEnv: string = 'preview';

  /**
   * Get current environment name
   */
  static getCurrentEnvironment(): string {
    return this.currentEnv;
  }

  /**
   * Load environment configuration
   * @param envName - Environment name (preview, staging, production)
   */
  static loadEnvironment(envName?: string): EnvironmentConfig {
    // Determine environment from parameter, env variable, or default
    const env = envName || process.env.ENV || process.env.NODE_ENV || 'preview';
    this.currentEnv = env.toLowerCase();

    // If config already loaded for this environment, return cached
    if (this.config && this.config.name === this.currentEnv) {
      return this.config;
    }

    // Load configuration file
    const configPath = path.join(process.cwd(), 'config', `${this.currentEnv}.json`);

    if (!fs.existsSync(configPath)) {
      throw new Error(
        `Environment configuration file not found: ${configPath}\n` +
        `Available environments: preview, staging, production`
      );
    }

    try {
      const configData = fs.readFileSync(configPath, 'utf-8');
      this.config = JSON.parse(configData) as EnvironmentConfig;
      this.config.name = this.currentEnv;

      // Override with environment variables if set
      if (process.env.BASE_URL) {
        this.config.baseURL = process.env.BASE_URL;
      }
      if (process.env.API_URL) {
        this.config.apiURL = process.env.API_URL;
      }
      if (process.env.TIMEOUT) {
        this.config.timeout = parseInt(process.env.TIMEOUT, 10);
      }

      console.log(`✓ Loaded environment configuration: ${this.currentEnv.toUpperCase()}`);
      console.log(`  Base URL: ${this.config.baseURL}`);

      return this.config;
    } catch (error) {
      throw new Error(
        `Failed to load environment configuration from ${configPath}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get current environment configuration
   */
  static getConfig(): EnvironmentConfig {
    if (!this.config) {
      return this.loadEnvironment();
    }
    return this.config;
  }

  /**
   * Reset configuration (useful for testing)
   */
  static reset(): void {
    this.config = null;
    this.currentEnv = 'preview';
  }

  /**
   * Get base URL for current environment
   */
  static getBaseURL(): string {
    return this.getConfig().baseURL;
  }

  /**
   * Get API URL for current environment
   */
  static getAPIURL(): string {
    return this.getConfig().apiURL;
  }

  /**
   * Get credentials for current environment
   */
  static getCredentials(): { username: string; password: string } {
    return this.getConfig().credentials;
  }

  /**
   * Check if feature is enabled
   */
  static isFeatureEnabled(feature: keyof EnvironmentConfig['features']): boolean {
    return this.getConfig().features[feature];
  }
}

// Auto-load environment on module import
EnvironmentLoader.loadEnvironment();
