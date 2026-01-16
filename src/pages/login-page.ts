import { Page } from 'playwright';
import { BasePage } from '../core/base-page.js';

/**
 * Login Page Object Model
 * Example of a complete page object with form interactions
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly emailInput = '#email';
  private readonly passwordInput = '#password';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';
  private readonly forgotPasswordLink = 'a[href*="forgot-password"]';
  private readonly rememberMeCheckbox = '#remember-me';
  private readonly loginForm = 'form.login-form';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigate(): Promise<void> {
    await this.page.goto('/login');
    await this.waitForLoad();
  }

  /**
   * Wait for login page to load
   */
  async waitForLoad(): Promise<void> {
    await this.waitForElement(this.loginForm);
  }

  /**
   * Fill email input
   */
  async enterEmail(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email, { clear: true });
  }

  /**
   * Fill password input
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password, { clear: true });
  }

  /**
   * Check remember me checkbox
   */
  async checkRememberMe(): Promise<void> {
    await this.checkElement(this.rememberMeCheckbox);
  }

  /**
   * Uncheck remember me checkbox
   */
  async uncheckRememberMe(): Promise<void> {
    await this.uncheckElement(this.rememberMeCheckbox);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPasswordLink(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }

  /**
   * Perform complete login
   */
  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickLoginButton();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }

  /**
   * Assert error message is visible
   */
  async assertErrorMessageVisible(): Promise<void> {
    await this.assertions.assertVisible(this.errorMessage);
  }

  /**
   * Assert error message text
   */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await this.assertions.assertTextEquals(this.errorMessage, expectedMessage);
  }

  /**
   * Assert login form is visible
   */
  async assertLoginFormVisible(): Promise<void> {
    await this.assertions.assertVisible(this.loginForm);
  }

  /**
   * Assert email input is enabled
   */
  async assertEmailInputEnabled(): Promise<void> {
    await this.assertions.assertEnabled(this.emailInput);
  }

  /**
   * Assert password input is enabled
   */
  async assertPasswordInputEnabled(): Promise<void> {
    await this.assertions.assertEnabled(this.passwordInput);
  }
}
