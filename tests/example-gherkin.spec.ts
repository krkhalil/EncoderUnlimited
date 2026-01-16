import { test, expect } from '@playwright/test';
import { createGherkinHelper } from '../src/bdd/gherkin-helper.js';

/**
 * Example test using Gherkin/BDD step definitions
 * Tests are written in simple, understandable language
 */
test.describe('Example Gherkin Tests', () => {
  test('should navigate to example.com and verify content', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    // Feature and Scenario
    await gherkin.feature('Example Website Navigation');
    await gherkin.scenario('User navigates to example.com and sees content');

    // Given - Setup
    await steps.givenINavigateTo('https://example.com');
    await steps.givenThePageIsLoaded();

    // When - Actions
    // No actions needed for this simple test

    // Then - Assertions
    await steps.thenThePageTitleShouldContain('Example');
    await steps.thenIShouldSee('h1');
    await steps.thenShouldContainText('h1', 'Example');
  });

  test('should interact with elements using Gherkin steps', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Element Interaction');
    await gherkin.scenario('User interacts with page elements');

    // Given
    await steps.givenINavigateTo('https://example.com');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIWaitForToBeVisible('h1');

    // Then
    await steps.thenIShouldSee('h1');
    await steps.thenShouldContainText('h1', 'Example');
    await steps.thenIShouldSeeOnThePage('Example Domain');
  });

  test('should demonstrate form interaction with Gherkin', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Form Interaction');
    await gherkin.scenario('User fills and submits a form');

    // Given
    await steps.givenINavigateTo('https://example.com');

    // When - Form interactions (example selectors - update based on your app)
    // await steps.whenIFillWith('#email', 'user@example.com');
    // await steps.whenIFillWith('#password', 'password123');
    // await steps.whenIClickOn('#submit-button');

    // Then
    // await steps.thenTheURLShouldContain('dashboard');
    // await steps.thenIShouldSee('.welcome-message');
  });
});
