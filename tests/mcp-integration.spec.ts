import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { PlaywrightMCPClient } from '../src/mcp/client.js';
import { allureLogger } from '../src/utils/allure-logger.js';

/**
 * Example test using MCP client for automation with Allure reporting
 */
test.describe('MCP Integration Tests', () => {
  let mcpClient: PlaywrightMCPClient;

  test.beforeAll(async () => {
    allureLogger.info('Initializing MCP client');
    mcpClient = new PlaywrightMCPClient();
    await allureLogger.step('Connect to MCP server', async () => {
      await mcpClient.connect();
      allureLogger.info('MCP client connected successfully');
    });
  });

  test.afterAll(async () => {
    await allureLogger.step('Disconnect MCP client', async () => {
      allureLogger.info('Disconnecting MCP client');
      await mcpClient.disconnect();
      allureLogger.info('MCP client disconnected');
    });
  });

  test('should use MCP client to navigate', async () => {
    allure.epic('MCP Integration');
    allure.feature('MCP Navigation');
    allure.story('Navigate using MCP client');

    await allureLogger.step('Navigate via MCP client', async () => {
      allureLogger.info('Calling MCP navigate tool');
      const response = await mcpClient.navigate('https://example.com');
      const responseContent = response.content as Array<{ type: string; text: string }>;
      const responseText = responseContent[0]?.text || '';
      allureLogger.info('MCP navigate response received', { response: responseText });
      expect(responseText).toContain('Navigated to');
      allureLogger.info('Navigation verified successfully');
    });
  });

  test('should use MCP client to get text', async () => {
    allure.epic('MCP Integration');
    allure.feature('MCP Element Interaction');
    allure.story('Get text using MCP client');

    await allureLogger.step('Navigate to page', async () => {
      allureLogger.info('Navigating to example.com via MCP');
      await mcpClient.navigate('https://example.com');
    });

    await allureLogger.step('Get text from element', async () => {
      allureLogger.info('Retrieving text from h1 element via MCP');
      const response = await mcpClient.getText('h1');
      const responseContent = response.content as Array<{ type: string; text: string }>;
      const responseText = responseContent[0]?.text || '';
      allureLogger.info('Text retrieved', { text: responseText });
      expect(responseText).toContain('Example');
      allureLogger.info('Text verification successful');
    });
  });
});
