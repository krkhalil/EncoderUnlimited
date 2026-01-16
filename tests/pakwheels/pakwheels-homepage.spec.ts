import { test, expect } from '@playwright/test';
import { createGherkinHelper } from '../../src/bdd/gherkin-helper.js';
import { allure } from 'allure-playwright';
import { FailureHandler } from '../../src/utils/failure-handler.js';

/**
 * PakWheels Homepage Test Cases
 * Test Case 1: Verify homepage loads successfully
 */
test.describe('PakWheels Homepage Tests', () => {
  test('TC001: Verify homepage loads with all main elements', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Homepage Navigation');
    await gherkin.scenario('User visits PakWheels homepage');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // Then - Verify main elements are visible
    await steps.thenIShouldSee('header');
    await steps.thenIShouldSee('nav');
    await steps.thenIShouldSeeOnThePage('Find Used Cars');
    await steps.thenThePageTitleShouldContain('PakWheels');
  });

  test('TC002: Verify navigation menu items are visible and clickable', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Navigation Menu');
    await gherkin.scenario('User verifies navigation menu functionality');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // Then - Verify navigation items
    await steps.thenIShouldSeeOnThePage('Used Cars');
    await steps.thenIShouldSeeOnThePage('New Cars');
    await steps.thenIShouldSeeOnThePage('Bikes');
    await steps.thenIShouldSeeOnThePage('Auto Store');
    await steps.thenIShouldSeeOnThePage('Videos');
    await steps.thenIShouldSeeOnThePage('Forums');
  });

  test('TC003: Verify search functionality for used cars', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Search Functionality');
    await gherkin.scenario('User searches for used cars');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Interact with search
    await steps.whenIClickOn('a[href*="used-cars"]');
    await steps.whenIWaitForToBeVisible('input[type="search"], input[placeholder*="Search"], .search-input');

    // Then - Verify search is available
    await steps.thenIShouldSee('input[type="search"], input[placeholder*="Search"], .search-input');
  });

  test('TC004: Verify user can navigate to Used Cars section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Used Cars Navigation');
    await gherkin.scenario('User navigates to Used Cars section');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('Used Cars');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('used-cars');
    await steps.thenIShouldSeeOnThePage('Used Cars');
  });

  test('TC005: Verify user can navigate to New Cars section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('New Cars Navigation');
    await gherkin.scenario('User navigates to New Cars section');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('New Cars');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('new-cars');
    await steps.thenIShouldSeeOnThePage('New Cars');
  });

  test('TC006: Verify user can navigate to Bikes section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Bikes Navigation');
    await gherkin.scenario('User navigates to Bikes section');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('Bikes');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('bikes');
    await steps.thenIShouldSeeOnThePage('Bikes');
  });

  test('TC007: Verify Sign In button is visible and clickable', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('User Authentication');
    await gherkin.scenario('User verifies Sign In functionality');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // Then
    await steps.thenIShouldSeeOnThePage('Sign In');
    await steps.thenShouldBeEnabled('a[href*="sign-in"], button:has-text("Sign In"), .sign-in');
  });

  test('TC008: Verify Sign Up button is visible and clickable', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('User Registration');
    await gherkin.scenario('User verifies Sign Up functionality');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // Then
    await steps.thenIShouldSeeOnThePage('Sign Up');
    await steps.thenShouldBeEnabled('a[href*="sign-up"], button:has-text("Sign Up"), .sign-up');
  });

  test('TC009: Verify Post an Ad button is visible', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Ad Posting');
    await gherkin.scenario('User verifies Post an Ad functionality');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // Then
    await steps.thenIShouldSeeOnThePage('Post an Ad');
    await steps.thenShouldBeEnabled('a[href*="post"], button:has-text("Post"), .post-ad');
  });

  test('TC010: Verify featured cars section is displayed on homepage', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Featured Content');
    await gherkin.scenario('User views featured cars on homepage');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Scroll to see featured section
    await steps.whenIScrollTo('body');

    // Then - Verify featured content exists
    await steps.thenIShouldSeeOnThePage('Featured');
    // Verify car listings or cards are present
    await steps.thenIShouldSee('.car-card, .listing-card, .featured-car, [class*="car"], [class*="listing"]');
  });

  // Automatic failure handling
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
  });
});
