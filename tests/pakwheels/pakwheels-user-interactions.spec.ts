import { test, expect } from '@playwright/test';
import { createGherkinHelper } from '../../src/bdd/gherkin-helper.js';
import { allure } from 'allure-playwright';
import { FailureHandler } from '../../src/utils/failure-handler.js';

/**
 * PakWheels User Interaction Test Cases
 * Test Case 21-30: User interactions and advanced features
 */
test.describe('PakWheels User Interaction Tests', () => {
  test('TC021: Verify user can open Sign In modal/dialog', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('User Authentication');
    await gherkin.scenario('User opens Sign In dialog');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Click Sign In
    await steps.whenIClickOnTheButton('Sign In');
    await steps.whenIWaitForToBeVisible('.modal, .dialog, [class*="sign-in"], [class*="login"]');

    // Then - Verify sign in form appears
    await steps.thenIShouldSee('.modal, .dialog, [class*="sign-in"], [class*="login"]');
    await steps.thenIShouldSeeOnThePage('Mobile Number');
  });

  test('TC022: Verify user can access Forums section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Forums');
    await gherkin.scenario('User navigates to forums');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('Forums');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('forum');
    await steps.thenIShouldSeeOnThePage('Forum');
  });

  test('TC023: Verify user can access Videos section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Videos');
    await gherkin.scenario('User navigates to videos section');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('Videos');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('video');
    await steps.thenIShouldSeeOnThePage('Video');
  });

  test('TC024: Verify user can access Auto Store section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Auto Store');
    await gherkin.scenario('User navigates to Auto Store');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('Auto Store');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('store');
    await steps.thenIShouldSeeOnThePage('Store');
  });

  test('TC025: Verify user can access Blog section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Blog');
    await gherkin.scenario('User navigates to blog');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOnTheLink('Blog');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('blog');
    await steps.thenIShouldSeeOnThePage('Blog');
  });

  test('TC026: Verify mobile app download section is visible', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Mobile App');
    await gherkin.scenario('User views mobile app download options');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Scroll to find app download section
    await steps.whenIScrollTo('body');

    // Then - Verify app download links
    await steps.thenIShouldSeeOnThePage('Download');
    await steps.thenIShouldSeeOnThePage('App');
  });

  test('TC027: Verify user can view popular cities for car listings', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('City Selection');
    await gherkin.scenario('User views popular cities');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // Then - Verify popular cities are displayed
    await steps.thenIShouldSeeOnThePage('Karachi');
    await steps.thenIShouldSeeOnThePage('Lahore');
    await steps.thenIShouldSeeOnThePage('Islamabad');
  });

  test('TC028: Verify footer links are accessible', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Footer Navigation');
    await gherkin.scenario('User accesses footer links');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Scroll to footer
    await steps.whenIScrollTo('footer');

    // Then - Verify footer is visible with links
    await steps.thenIShouldSee('footer');
    await steps.thenIShouldSeeOnThePage('About');
  });

  test('TC029: Verify user can view featured used cars', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Featured Cars');
    await gherkin.scenario('User views featured used cars');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Wait for featured section
    await steps.whenIWaitForToBeVisible('.featured, [class*="featured"], .car-listing, .listing-card');

    // Then - Verify featured cars are displayed
    await steps.thenIShouldSee('.featured, [class*="featured"], .car-listing, .listing-card');
  });

  test('TC030: Verify user can access car price calculator', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Price Calculator');
    await gherkin.scenario('User accesses price calculator');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Look for price calculator link
    await steps.whenIWaitForToBeVisible('a[href*="calculator"], a[href*="price"], .calculator, [class*="calculator"]');

    // Then - Verify calculator is accessible
    await steps.thenIShouldSeeOnThePage('Calculator');
  });

  // Automatic failure handling
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
  });
});
