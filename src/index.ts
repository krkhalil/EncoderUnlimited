/**
 * Main entry point for the automation framework
 */

// Core classes
export { PlaywrightAutomation } from './core/playwright-automation.js';
export { BasePage } from './core/base-page.js';

// MCP integration
export { PlaywrightMCPClient } from './mcp/client.js';

// Configuration
export { EnvironmentLoader, type EnvironmentConfig } from './config/environment.js';

// BDD/Gherkin
export { StepDefinitions } from './bdd/steps.js';
export { GherkinHelper, createGherkinHelper } from './bdd/gherkin-helper.js';

// Failure Handling
export { FailureHandler } from './utils/failure-handler.js';
export { TestHelper } from './utils/test-helper.js';

// Utilities
export { logger, Logger, LogLevel } from './utils/logger.js';
export { allureLogger, AllureLogger } from './utils/allure-logger.js';
export { WebOperations } from './utils/web-operations.js';
export { Assertions } from './utils/assertions.js';
export * from './utils/helpers.js';

// Page Objects
export { ExamplePage } from './pages/example-page.js';
export { LoginPage } from './pages/login-page.js';
export { DashboardPage } from './pages/dashboard-page.js';
