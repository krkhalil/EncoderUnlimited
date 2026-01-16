import { Page, expect } from '@playwright/test';
import { WebOperations } from '../utils/web-operations.js';
import { Assertions } from '../utils/assertions.js';
import { allureLogger } from '../utils/allure-logger.js';
import { allure } from 'allure-playwright';

/**
 * Gherkin Step Definitions
 * Provides readable, BDD-style step definitions for test cases
 */
export class StepDefinitions {
  private webOps: WebOperations;
  private assertions: Assertions;

  constructor(private page: Page) {
    this.webOps = new WebOperations(page);
    this.assertions = new Assertions(page);
  }

  /**
   * Given Steps - Setup and Initial State
   */

  /**
   * Given I navigate to "{url}"
   */
  async givenINavigateTo(url: string): Promise<void> {
    await allureLogger.step(`Given I navigate to "${url}"`, async () => {
      await this.page.goto(url);
      await this.webOps.waitForNavigation();
    });
  }

  /**
   * Given I am on the "{page}" page
   */
  async givenIAmOnThePage(pageName: string): Promise<void> {
    await allureLogger.step(`Given I am on the "${pageName}" page`, async () => {
      // This is a placeholder - implement based on your page routing
      allureLogger.info(`Navigating to ${pageName} page`);
    });
  }

  /**
   * Given the page is loaded
   */
  async givenThePageIsLoaded(): Promise<void> {
    await allureLogger.step('Given the page is loaded', async () => {
      await this.webOps.waitForNavigation();
    });
  }

  /**
   * When Steps - Actions
   */

  /**
   * When I click on "{selector}"
   */
  async whenIClickOn(selector: string): Promise<void> {
    await allureLogger.step(`When I click on "${selector}"`, async () => {
      await this.webOps.click(selector);
    });
  }

  /**
   * When I click on the "{text}" button
   */
  async whenIClickOnTheButton(text: string): Promise<void> {
    await allureLogger.step(`When I click on the "${text}" button`, async () => {
      await this.webOps.clickByText(text);
    });
  }

  /**
   * When I click on the "{text}" link
   */
  async whenIClickOnTheLink(text: string): Promise<void> {
    await allureLogger.step(`When I click on the "${text}" link`, async () => {
      await this.webOps.clickByText(text);
    });
  }

  /**
   * When I fill "{selector}" with "{value}"
   */
  async whenIFillWith(selector: string, value: string): Promise<void> {
    await allureLogger.step(`When I fill "${selector}" with "${value}"`, async () => {
      await this.webOps.fill(selector, value, { clear: true });
    });
  }

  /**
   * When I type "{text}" into "{selector}"
   */
  async whenITypeInto(text: string, selector: string): Promise<void> {
    await allureLogger.step(`When I type "${text}" into "${selector}"`, async () => {
      await this.webOps.type(selector, text);
    });
  }

  /**
   * When I clear "{selector}"
   */
  async whenIClear(selector: string): Promise<void> {
    await allureLogger.step(`When I clear "${selector}"`, async () => {
      await this.webOps.clear(selector);
    });
  }

  /**
   * When I select "{value}" from "{selector}"
   */
  async whenISelectFrom(value: string, selector: string): Promise<void> {
    await allureLogger.step(`When I select "${value}" from "${selector}"`, async () => {
      await this.webOps.selectOption(selector, value);
    });
  }

  /**
   * When I check "{selector}"
   */
  async whenICheck(selector: string): Promise<void> {
    await allureLogger.step(`When I check "${selector}"`, async () => {
      await this.webOps.check(selector);
    });
  }

  /**
   * When I uncheck "{selector}"
   */
  async whenIUncheck(selector: string): Promise<void> {
    await allureLogger.step(`When I uncheck "${selector}"`, async () => {
      await this.webOps.uncheck(selector);
    });
  }

  /**
   * When I hover over "{selector}"
   */
  async whenIHoverOver(selector: string): Promise<void> {
    await allureLogger.step(`When I hover over "${selector}"`, async () => {
      await this.webOps.hover(selector);
    });
  }

  /**
   * When I scroll to "{selector}"
   */
  async whenIScrollTo(selector: string): Promise<void> {
    await allureLogger.step(`When I scroll to "${selector}"`, async () => {
      await this.webOps.scrollIntoView(selector);
    });
  }

  /**
   * When I press "{key}" on "{selector}"
   */
  async whenIPressOn(key: string, selector: string): Promise<void> {
    await allureLogger.step(`When I press "${key}" on "${selector}"`, async () => {
      await this.webOps.pressKey(selector, key);
    });
  }

  /**
   * When I upload "{filePath}" to "{selector}"
   */
  async whenIUploadTo(filePath: string, selector: string): Promise<void> {
    await allureLogger.step(`When I upload "${filePath}" to "${selector}"`, async () => {
      await this.webOps.uploadFile(selector, filePath);
    });
  }

  /**
   * When I wait for "{selector}" to be visible
   */
  async whenIWaitForToBeVisible(selector: string): Promise<void> {
    await allureLogger.step(`When I wait for "${selector}" to be visible`, async () => {
      await this.webOps.waitForVisible(selector);
    });
  }

  /**
   * When I wait for "{timeout}" seconds
   */
  async whenIWaitForSeconds(timeout: number): Promise<void> {
    await allureLogger.step(`When I wait for ${timeout} seconds`, async () => {
      await new Promise(resolve => setTimeout(resolve, timeout * 1000));
    });
  }

  /**
   * When I reload the page
   */
  async whenIReloadThePage(): Promise<void> {
    await allureLogger.step('When I reload the page', async () => {
      await this.webOps.reload();
    });
  }

  /**
   * When I go back
   */
  async whenIGoBack(): Promise<void> {
    await allureLogger.step('When I go back', async () => {
      await this.webOps.goBack();
    });
  }

  /**
   * When I go forward
   */
  async whenIGoForward(): Promise<void> {
    await allureLogger.step('When I go forward', async () => {
      await this.webOps.goForward();
    });
  }

  /**
   * Then Steps - Assertions
   */

  /**
   * Then I should see "{selector}"
   */
  async thenIShouldSee(selector: string): Promise<void> {
    await allureLogger.step(`Then I should see "${selector}"`, async () => {
      await this.assertions.assertVisible(selector);
    });
  }

  /**
   * Then I should not see "{selector}"
   */
  async thenIShouldNotSee(selector: string): Promise<void> {
    await allureLogger.step(`Then I should not see "${selector}"`, async () => {
      await this.assertions.assertHidden(selector);
    });
  }

  /**
   * Then "{selector}" should be visible
   */
  async thenShouldBeVisible(selector: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should be visible`, async () => {
      await this.assertions.assertVisible(selector);
    });
  }

  /**
   * Then "{selector}" should be hidden
   */
  async thenShouldBeHidden(selector: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should be hidden`, async () => {
      await this.assertions.assertHidden(selector);
    });
  }

  /**
   * Then "{selector}" should be enabled
   */
  async thenShouldBeEnabled(selector: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should be enabled`, async () => {
      await this.assertions.assertEnabled(selector);
    });
  }

  /**
   * Then "{selector}" should be disabled
   */
  async thenShouldBeDisabled(selector: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should be disabled`, async () => {
      await this.assertions.assertDisabled(selector);
    });
  }

  /**
   * Then "{selector}" should contain text "{text}"
   */
  async thenShouldContainText(selector: string, text: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should contain text "${text}"`, async () => {
      await this.assertions.assertTextContains(selector, text);
    });
  }

  /**
   * Then "{selector}" should have text "{text}"
   */
  async thenShouldHaveText(selector: string, text: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should have text "${text}"`, async () => {
      await this.assertions.assertTextEquals(selector, text);
    });
  }

  /**
   * Then the page title should be "{title}"
   */
  async thenThePageTitleShouldBe(title: string): Promise<void> {
    await allureLogger.step(`Then the page title should be "${title}"`, async () => {
      await this.assertions.assertTitle(title);
    });
  }

  /**
   * Then the page title should contain "{text}"
   */
  async thenThePageTitleShouldContain(text: string): Promise<void> {
    await allureLogger.step(`Then the page title should contain "${text}"`, async () => {
      await this.assertions.assertTitleContains(text);
    });
  }

  /**
   * Then the URL should be "{url}"
   */
  async thenTheURLShouldBe(url: string): Promise<void> {
    await allureLogger.step(`Then the URL should be "${url}"`, async () => {
      await this.assertions.assertURL(url);
    });
  }

  /**
   * Then the URL should contain "{text}"
   */
  async thenTheURLShouldContain(text: string): Promise<void> {
    await allureLogger.step(`Then the URL should contain "${text}"`, async () => {
      await this.assertions.assertURLContains(text);
    });
  }

  /**
   * Then "{selector}" should be checked
   */
  async thenShouldBeChecked(selector: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should be checked`, async () => {
      await this.assertions.assertChecked(selector);
    });
  }

  /**
   * Then "{selector}" should not be checked
   */
  async thenShouldNotBeChecked(selector: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should not be checked`, async () => {
      await this.assertions.assertUnchecked(selector);
    });
  }

  /**
   * Then "{selector}" should have value "{value}"
   */
  async thenShouldHaveValue(selector: string, value: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should have value "${value}"`, async () => {
      await this.assertions.assertValue(selector, value);
    });
  }

  /**
   * Then "{selector}" should have attribute "{attribute}" with value "{value}"
   */
  async thenShouldHaveAttributeWithValue(selector: string, attribute: string, value: string): Promise<void> {
    await allureLogger.step(`Then "${selector}" should have attribute "${attribute}" with value "${value}"`, async () => {
      await this.assertions.assertAttribute(selector, attribute, value);
    });
  }

  /**
   * Then there should be "{count}" "{selector}" elements
   */
  async thenThereShouldBeElements(count: number, selector: string): Promise<void> {
    await allureLogger.step(`Then there should be ${count} "${selector}" elements`, async () => {
      await this.assertions.assertCount(selector, count);
    });
  }

  /**
   * Then I should see "{text}" on the page
   */
  async thenIShouldSeeOnThePage(text: string): Promise<void> {
    await allureLogger.step(`Then I should see "${text}" on the page`, async () => {
      const locator = this.page.getByText(text);
      await expect(locator).toBeVisible();
    });
  }

  /**
   * Then I should not see "{text}" on the page
   */
  async thenIShouldNotSeeOnThePage(text: string): Promise<void> {
    await allureLogger.step(`Then I should not see "${text}" on the page`, async () => {
      const locator = this.page.getByText(text);
      await expect(locator).toBeHidden();
    });
  }

  /**
   * And Steps - Additional Actions/Assertions (same as When/Then)
   */

  /**
   * And I click on "{selector}"
   */
  async andIClickOn(selector: string): Promise<void> {
    await this.whenIClickOn(selector);
  }

  /**
   * And I fill "{selector}" with "{value}"
   */
  async andIFillWith(selector: string, value: string): Promise<void> {
    await this.whenIFillWith(selector, value);
  }

  /**
   * And I should see "{selector}"
   */
  async andIShouldSee(selector: string): Promise<void> {
    await this.thenIShouldSee(selector);
  }

  /**
   * And "{selector}" should contain text "{text}"
   */
  async andShouldContainText(selector: string, text: string): Promise<void> {
    await this.thenShouldContainText(selector, text);
  }

  /**
   * Get WebOperations instance for advanced operations
   */
  getWebOperations(): WebOperations {
    return this.webOps;
  }

  /**
   * Get Assertions instance for advanced assertions
   */
  getAssertions(): Assertions {
    return this.assertions;
  }

  /**
   * Get Page instance
   */
  getPage(): Page {
    return this.page;
  }
}
