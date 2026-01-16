import { test, expect } from '@playwright/test';
import { createGherkinHelper } from '../../src/bdd/gherkin-helper.js';
import { allure } from 'allure-playwright';
import { FailureHandler } from '../../src/utils/failure-handler.js';

/**
 * PakWheels Car Search Test Cases
 * Test Case 11-20: Car search and filtering functionality
 */
test.describe('PakWheels Car Search Tests', () => {
  test('TC011: Verify user can search for cars by city', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Search');
    await gherkin.scenario('User searches for cars by city');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Look for city filter or search
    await steps.whenIWaitForToBeVisible('select, [name*="city"], .city-filter, [placeholder*="City"]');

    // Then
    await steps.thenIShouldSee('select, [name*="city"], .city-filter, [placeholder*="City"]');
    await steps.thenIShouldSeeOnThePage('Karachi');
    await steps.thenIShouldSeeOnThePage('Lahore');
  });

  test('TC012: Verify user can filter cars by make/brand', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Filtering');
    await gherkin.scenario('User filters cars by brand');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Look for brand/make filter
    await steps.whenIWaitForToBeVisible('select, [name*="make"], [name*="brand"], .brand-filter');

    // Then - Verify popular brands are visible
    await steps.thenIShouldSeeOnThePage('Toyota');
    await steps.thenIShouldSeeOnThePage('Honda');
    await steps.thenIShouldSeeOnThePage('Suzuki');
  });

  test('TC013: Verify user can filter cars by price range', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Price Filtering');
    await gherkin.scenario('User filters cars by price range');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Look for price filter
    await steps.whenIWaitForToBeVisible('input[type="range"], [name*="price"], .price-filter, select[name*="price"]');

    // Then
    await steps.thenIShouldSee('input[type="range"], [name*="price"], .price-filter, select[name*="price"]');
  });

  test('TC014: Verify car listing cards display essential information', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Listings');
    await gherkin.scenario('User views car listing details');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Wait for listings to load
    await steps.whenIWaitForToBeVisible('.car-listing, .listing-card, [class*="car-card"], [class*="listing"]');

    // Then - Verify listing elements
    await steps.thenIShouldSee('.car-listing, .listing-card, [class*="car-card"], [class*="listing"]');
    // Verify price, model, or other details are visible
    await steps.thenIShouldSeeOnThePage('PKR');
  });

  test('TC015: Verify user can click on a car listing to view details', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Details');
    await gherkin.scenario('User views detailed car information');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();
    await steps.whenIWaitForToBeVisible('.car-listing, .listing-card, a[href*="/used-cars/"]');

    // When - Click on first car listing
    const firstListing = page.locator('.car-listing, .listing-card, a[href*="/used-cars/"]').first();
    if (await firstListing.isVisible()) {
      await firstListing.click();
      await steps.whenIWaitForToBeVisible('body');

      // Then - Verify detail page loaded
      await steps.thenTheURLShouldContain('/used-cars/');
    }
  });

  test('TC016: Verify user can sort car listings', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Sorting');
    await gherkin.scenario('User sorts car listings');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Look for sort options
    await steps.whenIWaitForToBeVisible('select[name*="sort"], .sort-dropdown, [class*="sort"]');

    // Then - Verify sort options exist
    await steps.thenIShouldSee('select[name*="sort"], .sort-dropdown, [class*="sort"]');
  });

  test('TC017: Verify popular car models are displayed', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Popular Models');
    await gherkin.scenario('User views popular car models');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // Then - Verify popular models section
    await steps.thenIShouldSeeOnThePage('Toyota Corolla');
    await steps.thenIShouldSeeOnThePage('Honda Civic');
    await steps.thenIShouldSeeOnThePage('Honda City');
  });

  test('TC018: Verify user can navigate to car reviews section', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Reviews');
    await gherkin.scenario('User accesses car reviews');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/');
    await steps.givenThePageIsLoaded();

    // When - Navigate to reviews
    await steps.whenIClickOnTheLink('Reviews');
    await steps.whenIWaitForToBeVisible('body');

    // Then
    await steps.thenTheURLShouldContain('review');
    await steps.thenIShouldSeeOnThePage('Review');
  });

  test('TC019: Verify user can access car comparisons', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Car Comparisons');
    await gherkin.scenario('User accesses car comparison feature');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/new-cars');
    await steps.givenThePageIsLoaded();

    // When - Look for comparison link
    await steps.whenIWaitForToBeVisible('a[href*="compar"], .compare, [class*="compar"]');

    // Then
    await steps.thenIShouldSeeOnThePage('Compar');
  });

  test('TC020: Verify user can filter by car body type', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Body Type Filter');
    await gherkin.scenario('User filters cars by body type');

    // Given
    await steps.givenINavigateTo('https://www.pakwheels.com/used-cars');
    await steps.givenThePageIsLoaded();

    // When - Look for body type filter
    await steps.whenIWaitForToBeVisible('select, [name*="body"], .body-type-filter, [class*="body-type"]');

    // Then - Verify body type options
    await steps.thenIShouldSeeOnThePage('Sedan');
    await steps.thenIShouldSeeOnThePage('SUV');
    await steps.thenIShouldSeeOnThePage('Hatchback');
  });

  // Automatic failure handling and browser close
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      await FailureHandler.handleFailureComprehensive(page, testInfo);
    }
    
    // Close browser after every test (pass or fail)
    const closeDelay = parseInt(process.env.BROWSER_CLOSE_DELAY_MS || '5000', 10);
    if (closeDelay > 0) {
      FailureHandler.closeBrowserAfterTest(page, closeDelay, testInfo.status).catch(err => {
        console.error('Error in background browser close:', err);
      });
    }
  });
});
