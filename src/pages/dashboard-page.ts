import { Page } from 'playwright';
import { BasePage } from '../core/base-page.js';

/**
 * Dashboard Page Object Model
 * Example of a page with multiple elements and interactions
 */
export class DashboardPage extends BasePage {
  // Selectors
  private readonly welcomeMessage = '.welcome-message';
  private readonly userMenu = '.user-menu';
  private readonly logoutButton = 'button.logout';
  private readonly searchInput = 'input[type="search"]';
  private readonly searchButton = 'button.search';
  private readonly notificationBell = '.notification-bell';
  private readonly notificationCount = '.notification-count';
  private readonly dataTable = 'table.data-table';
  private readonly tableRows = 'table.data-table tbody tr';
  private readonly paginationNext = 'button.pagination-next';
  private readonly paginationPrev = 'button.pagination-prev';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to dashboard
   */
  async navigate(): Promise<void> {
    await this.page.goto('/dashboard');
    await this.waitForLoad();
  }

  /**
   * Wait for dashboard to load
   */
  async waitForLoad(): Promise<void> {
    await this.waitForElement(this.welcomeMessage);
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.getElementText(this.welcomeMessage);
  }

  /**
   * Click user menu
   */
  async clickUserMenu(): Promise<void> {
    await this.hoverElement(this.userMenu);
    await this.clickElement(this.userMenu);
  }

  /**
   * Click logout button
   */
  async clickLogout(): Promise<void> {
    await this.clickElement(this.logoutButton);
  }

  /**
   * Perform logout
   */
  async logout(): Promise<void> {
    await this.clickUserMenu();
    await this.clickLogout();
  }

  /**
   * Search for a term
   */
  async search(term: string): Promise<void> {
    await this.fillInput(this.searchInput, term);
    await this.clickElement(this.searchButton);
  }

  /**
   * Get notification count
   */
  async getNotificationCount(): Promise<number> {
    const countText = await this.getElementText(this.notificationCount);
    return parseInt(countText) || 0;
  }

  /**
   * Click notification bell
   */
  async clickNotificationBell(): Promise<void> {
    await this.clickElement(this.notificationBell);
  }

  /**
   * Get table row count
   */
  async getTableRowCount(): Promise<number> {
    return await this.getElementCount(this.tableRows);
  }

  /**
   * Get all table row texts
   */
  async getAllTableRowTexts(): Promise<string[]> {
    return await this.getAllTexts(this.tableRows);
  }

  /**
   * Click next page
   */
  async clickNextPage(): Promise<void> {
    await this.clickElement(this.paginationNext);
  }

  /**
   * Click previous page
   */
  async clickPreviousPage(): Promise<void> {
    await this.clickElement(this.paginationPrev);
  }

  /**
   * Assert welcome message contains text
   */
  async assertWelcomeMessageContains(text: string): Promise<void> {
    await this.assertions.assertTextContains(this.welcomeMessage, text);
  }

  /**
   * Assert notification count is greater than
   */
  async assertNotificationCountGreaterThan(count: number): Promise<void> {
    const actualCount = await this.getNotificationCount();
    await this.assertions.assertGreaterThan(actualCount, count);
  }

  /**
   * Assert table is visible
   */
  async assertTableVisible(): Promise<void> {
    await this.assertions.assertVisible(this.dataTable);
  }

  /**
   * Assert table has rows
   */
  async assertTableHasRows(minRows: number): Promise<void> {
    const count = await this.getTableRowCount();
    await this.assertions.assertGreaterThan(count, minRows - 1);
  }
}
