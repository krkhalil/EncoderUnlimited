import { test } from '@playwright/test';
import { createGherkinHelper } from '../src/bdd/gherkin-helper.js';

/**
 * Login test using Gherkin/BDD step definitions
 * Written in simple, understandable language
 */
test.describe('Login Feature - Gherkin Style', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    // Feature and Scenario
    await gherkin.feature('User Authentication');
    await gherkin.scenario('User logs in with valid credentials');

    // Given - Setup
    await steps.givenINavigateTo('/login');
    await steps.givenThePageIsLoaded();

    // When - Actions
    await steps.whenIFillWith('#email', 'user@example.com');
    await steps.whenIFillWith('#password', 'password123');
    await steps.whenIClickOn('button[type="submit"]');

    // Then - Assertions
    await steps.thenTheURLShouldContain('/dashboard');
    await steps.thenIShouldSee('.welcome-message');
    await steps.thenShouldContainText('.welcome-message', 'Welcome');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('User Authentication');
    await gherkin.scenario('User attempts login with invalid credentials');

    // Given
    await steps.givenINavigateTo('/login');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIFillWith('#email', 'invalid@example.com');
    await steps.whenIFillWith('#password', 'wrongpassword');
    await steps.whenIClickOn('button[type="submit"]');

    // Then
    await steps.thenIShouldSee('.error-message');
    await steps.thenShouldContainText('.error-message', 'Invalid');
  });

  test('should validate required fields', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('Form Validation');
    await gherkin.scenario('User attempts to submit form without required fields');

    // Given
    await steps.givenINavigateTo('/login');
    await steps.givenThePageIsLoaded();

    // When
    await steps.whenIClickOn('button[type="submit"]');

    // Then
    await steps.thenIShouldSee('.error-message');
    await steps.thenShouldContainText('.error-message', 'required');
  });
});
