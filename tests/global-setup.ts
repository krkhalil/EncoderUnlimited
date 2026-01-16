import { FullConfig } from '@playwright/test';

/**
 * Global setup - runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting test execution...');
  console.log(`Environment: ${process.env.ENV || 'preview'}`);
}

export default globalSetup;
