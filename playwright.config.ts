import { defineConfig, devices } from '@playwright/test';
import { EnvironmentLoader } from './src/config/environment.js';

// Load environment configuration
const envConfig = EnvironmentLoader.loadEnvironment();

/**
 * Playwright configuration for automation framework
 * Environment-specific configuration is loaded from config/{env}.json
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: envConfig.retries,
  workers: process.env.CI ? 1 : envConfig.workers,
  // Set test timeout from environment config (default 60s for external sites)
  timeout: envConfig.timeout || 60000,
  // Set expect timeout
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  
  use: {
    baseURL: envConfig.baseURL,
    trace: 'on-first-retry', // Always capture trace on retry
    screenshot: 'only-on-failure', // Capture screenshot on failure
    video: 'retain-on-failure', // Retain video on failure
    headless: envConfig.headless,
    // Set navigation timeout from environment config
    navigationTimeout: envConfig.timeout || 60000,
    // Set action timeout
    actionTimeout: 30000,
  },
  
  // Global setup and teardown
  globalSetup: './tests/global-setup.ts',
  globalTeardown: './tests/global-teardown.ts',

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome', // Use Chrome browser specifically
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Only start web server for local development (not for external sites)
  // Disabled for external website testing like PakWheels
  // Uncomment below if you need to test a local development server
  /*
  ...(envConfig.name === 'preview' && process.env.START_WEB_SERVER === 'true' ? {
    webServer: {
      command: 'npm run dev',
      url: envConfig.baseURL,
      reuseExistingServer: !process.env.CI,
    },
  } : {}),
  */
});
