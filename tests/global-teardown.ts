import { FullConfig } from '@playwright/test';

/**
 * Global teardown - runs once after all tests
 */
async function globalTeardown(config: FullConfig) {
  console.log('✅ Test execution completed');
}

export default globalTeardown;
