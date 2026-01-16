import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

/**
 * MCP Client for interacting with Playwright Automation Server
 */
export class PlaywrightMCPClient {
  private client: Client;
  private transport: StdioClientTransport;

  constructor(serverCommand: string[] = ['tsx', 'src/mcp/server.ts']) {
    this.transport = new StdioClientTransport({
      command: serverCommand[0],
      args: serverCommand.slice(1),
    });
    this.client = new Client(
      {
        name: 'playwright-automation-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );
  }

  async connect(): Promise<void> {
    await this.client.connect(this.transport);
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  /**
   * List all available automation tools
   */
  async listTools() {
    const response = await this.client.listTools();
    return response.tools;
  }

  /**
   * Execute an automation tool
   */
  async callTool(name: string, args: Record<string, unknown>) {
    const response = await this.client.callTool({
      name,
      arguments: args,
    });
    return response;
  }

  /**
   * Navigate to a URL
   */
  async navigate(url: string) {
    return this.callTool('navigate', { url });
  }

  /**
   * Click an element
   */
  async click(selector: string) {
    return this.callTool('click', { selector });
  }

  /**
   * Fill an input field
   */
  async fill(selector: string, value: string) {
    return this.callTool('fill', { selector, value });
  }

  /**
   * Take a screenshot
   */
  async screenshot(path?: string) {
    return this.callTool('screenshot', { path });
  }

  /**
   * Get text from an element
   */
  async getText(selector: string) {
    return this.callTool('get_text', { selector });
  }

  /**
   * Wait for an element to appear
   */
  async waitForSelector(selector: string, timeout?: number) {
    return this.callTool('wait_for_selector', { selector, timeout });
  }
}
