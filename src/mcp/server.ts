#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { PlaywrightAutomation } from '../core/playwright-automation.js';

/**
 * MCP Server for Playwright Automation
 * Exposes automation tools via Model Context Protocol
 */
class PlaywrightMCPServer {
  private server: Server;
  private automation: PlaywrightAutomation;

  constructor() {
    this.server = new Server(
      {
        name: 'playwright-automation-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.automation = new PlaywrightAutomation();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'navigate',
          description: 'Navigate to a URL',
          inputSchema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'The URL to navigate to',
              },
            },
            required: ['url'],
          },
        },
        {
          name: 'click',
          description: 'Click an element',
          inputSchema: {
            type: 'object',
            properties: {
              selector: {
                type: 'string',
                description: 'CSS selector or text to click',
              },
            },
            required: ['selector'],
          },
        },
        {
          name: 'fill',
          description: 'Fill an input field',
          inputSchema: {
            type: 'object',
            properties: {
              selector: {
                type: 'string',
                description: 'CSS selector for the input',
              },
              value: {
                type: 'string',
                description: 'Value to fill',
              },
            },
            required: ['selector', 'value'],
          },
        },
        {
          name: 'screenshot',
          description: 'Take a screenshot',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to save screenshot',
              },
            },
          },
        },
        {
          name: 'get_text',
          description: 'Get text content from an element',
          inputSchema: {
            type: 'object',
            properties: {
              selector: {
                type: 'string',
                description: 'CSS selector for the element',
              },
            },
            required: ['selector'],
          },
        },
        {
          name: 'wait_for_selector',
          description: 'Wait for an element to appear',
          inputSchema: {
            type: 'object',
            properties: {
              selector: {
                type: 'string',
                description: 'CSS selector to wait for',
              },
              timeout: {
                type: 'number',
                description: 'Timeout in milliseconds',
              },
            },
            required: ['selector'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'navigate':
            await this.automation.navigate(args.url as string);
            return {
              content: [
                {
                  type: 'text',
                  text: `Navigated to ${args.url}`,
                },
              ],
            };

          case 'click':
            await this.automation.click(args.selector as string);
            return {
              content: [
                {
                  type: 'text',
                  text: `Clicked element: ${args.selector}`,
                },
              ],
            };

          case 'fill':
            await this.automation.fill(args.selector as string, args.value as string);
            return {
              content: [
                {
                  type: 'text',
                  text: `Filled ${args.selector} with ${args.value}`,
                },
              ],
            };

          case 'screenshot':
            const screenshotPath = await this.automation.screenshot(args.path as string);
            return {
              content: [
                {
                  type: 'text',
                  text: `Screenshot saved to ${screenshotPath}`,
                },
              ],
            };

          case 'get_text':
            const text = await this.automation.getText(args.selector as string);
            return {
              content: [
                {
                  type: 'text',
                  text: text,
                },
              ],
            };

          case 'wait_for_selector':
            await this.automation.waitForSelector(
              args.selector as string,
              args.timeout as number | undefined
            );
            return {
              content: [
                {
                  type: 'text',
                  text: `Element ${args.selector} appeared`,
                },
              ],
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'playwright://browser-state',
          name: 'Browser State',
          description: 'Current browser state and context',
          mimeType: 'application/json',
        },
      ],
    }));

    // Read resources
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      if (request.params.uri === 'playwright://browser-state') {
        const state = await this.automation.getBrowserState();
        return {
          contents: [
            {
              uri: request.params.uri,
              mimeType: 'application/json',
              text: JSON.stringify(state, null, 2),
            },
          ],
        };
      }
      throw new Error(`Unknown resource: ${request.params.uri}`);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Playwright MCP Server running on stdio');
  }
}

// Start server if run directly
if (require.main === module) {
  const server = new PlaywrightMCPServer();
  server.run().catch(console.error);
}
