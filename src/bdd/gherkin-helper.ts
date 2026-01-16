import { Page } from '@playwright/test';
import { StepDefinitions } from './steps.js';
import { allure } from 'allure-playwright';

/**
 * Gherkin Helper
 * Provides helper functions to use Gherkin steps in tests
 */
export class GherkinHelper {
  private steps: StepDefinitions;

  constructor(page: Page) {
    this.steps = new StepDefinitions(page);
  }

  /**
   * Start a feature scenario
   */
  async feature(name: string, description?: string): Promise<void> {
    allure.epic('Feature');
    allure.feature(name);
    if (description) {
      allure.description(description);
    }
  }

  /**
   * Start a scenario
   */
  async scenario(name: string, description?: string): Promise<void> {
    allure.story(name);
    if (description) {
      allure.description(description);
    }
  }

  /**
   * Get step definitions instance
   */
  getSteps(): StepDefinitions {
    return this.steps;
  }

  /**
   * Execute a custom step with description
   */
  async step(description: string, action: () => Promise<void>): Promise<void> {
    const { allureLogger } = await import('../utils/allure-logger.js');
    await allureLogger.step(description, action);
  }
}

/**
 * Create a Gherkin helper instance
 */
export function createGherkinHelper(page: Page): GherkinHelper {
  return new GherkinHelper(page);
}
