# EncoderUnlimited Automation Framework

A powerful automation framework that combines **Model Context Protocol (MCP)**, **Playwright**, and **TypeScript** to create intelligent, AI-driven browser automation capabilities.

## 🚀 Features

- **MCP Integration**: Expose automation tools via Model Context Protocol for AI/LLM interaction
- **Playwright Automation**: Robust browser automation with cross-browser support
- **Allure Reporting**: Beautiful and comprehensive test reports with detailed logs and attachments
- **TypeScript**: Type-safe development with modern TypeScript features
- **Page Object Model**: Structured approach to organizing test code
- **Extensible Architecture**: Easy to extend with custom tools and utilities

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Java 8+ (required for Allure)

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Install Allure (choose one method):

   **Option A: Using npm (recommended)**
   ```bash
   npm install -g allure-commandline
   ```

   **Option B: Using Homebrew (macOS)**
   ```bash
   brew install allure
   ```

   **Option C: Using Scoop (Windows)**
   ```bash
   scoop install allure
   ```

   **Option D: Manual installation**
   - Download from [Allure Releases](https://github.com/allure-framework/allure2/releases)
   - Extract and add to PATH

## 📁 Project Structure

```
.
├── config/                # Environment configurations
│   ├── preview.json       # Preview environment config
│   ├── staging.json       # Staging environment config
│   ├── production.json    # Production environment config
│   └── README.md          # Environment config documentation
├── src/
│   ├── bdd/               # BDD/Gherkin step definitions
│   │   ├── steps.ts       # Gherkin step definitions
│   │   └── gherkin-helper.ts  # Gherkin helper utilities
│   ├── config/            # Configuration utilities
│   │   └── environment.ts # Environment loader
│   ├── core/              # Core framework classes
│   │   ├── base-page.ts   # Base Page Object Model class
│   │   └── playwright-automation.ts  # Core automation engine
│   ├── mcp/               # MCP integration
│   │   ├── server.ts      # MCP server exposing automation tools
│   │   └── client.ts      # MCP client for interacting with server
│   ├── pages/             # Page Object Models
│   │   ├── example-page.ts
│   │   ├── login-page.ts
│   │   └── dashboard-page.ts
│   ├── utils/             # Utility functions
│   │   ├── logger.ts      # Basic logging utility
│   │   ├── allure-logger.ts  # Allure-integrated logger
│   │   ├── web-operations.ts  # Web UI operations utility
│   │   ├── assertions.ts  # Reusable assertion functions
│   │   └── helpers.ts     # Helper functions
│   └── index.ts           # Main exports
├── tests/                 # Test files
│   ├── example.spec.ts    # Example Playwright tests
│   └── mcp-integration.spec.ts  # MCP integration tests
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## 🌍 Environment Configuration

The framework supports multiple environments (Preview, Staging, Production) with environment-specific configurations.

### Environment Files

Configuration files are located in the `config/` directory:
- `config/preview.json` - Preview/Development environment
- `config/staging.json` - Staging environment  
- `config/production.json` - Production environment

### Setting Environment

**Method 1: Using npm scripts (Recommended)**
```bash
# Run tests on Preview environment (default)
npm run test:preview
npm run test:headed:preview
npm run test:allure:preview

# Run tests on Staging environment
npm run test:staging
npm run test:headed:staging
npm run test:allure:staging

# Run tests on Production environment
npm run test:production
npm run test:headed:production
npm run test:allure:production
```

**Method 2: Using environment variable**
```bash
ENV=staging npm test
ENV=production npm run test:headed
```

**Method 3: Using .env file**
Create a `.env` file in the `config/` directory:
```
ENV=staging
```

### Environment Configuration Structure

Each environment file contains:
```json
{
  "name": "preview",
  "baseURL": "https://preview.example.com",
  "apiURL": "https://api-preview.example.com",
  "timeout": 30000,
  "retries": 1,
  "workers": 2,
  "headless": true,
  "screenshot": "only-on-failure",
  "video": "retain-on-failure",
  "trace": "on-first-retry",
  "credentials": {
    "username": "preview_user",
    "password": "preview_password"
  },
  "features": {
    "enableDebugMode": true,
    "enableScreenshots": true,
    "enableVideos": true
  }
}
```

### Using Environment Config in Code

```typescript
import { EnvironmentLoader } from './src/config/environment';

// Get current environment configuration
const config = EnvironmentLoader.getConfig();

// Get specific values
const baseURL = EnvironmentLoader.getBaseURL();
const apiURL = EnvironmentLoader.getAPIURL();
const credentials = EnvironmentLoader.getCredentials();

// Check feature flags
if (EnvironmentLoader.isFeatureEnabled('enableDebugMode')) {
  // Debug code
}
```

### Overriding Configuration Values

You can override specific values using environment variables:

```bash
ENV=staging BASE_URL=https://custom.example.com npm test
ENV=production TIMEOUT=60000 npm test
```

### Updating Environment Files

1. Edit the JSON file in `config/` directory for the desired environment
2. Update `baseURL`, `apiURL`, `credentials`, etc.
3. Run tests with the corresponding environment script

⚠️ **Security Note**: Never commit sensitive credentials to version control. Consider using environment variables or a secrets management system for production credentials.

## 🎯 Usage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug

# Run tests and generate Allure report
npm run test:allure

# Generate Allure report from existing results
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Serve Allure report (auto-opens in browser)
npm run allure:serve
```

### Allure Reporting

The framework uses **Allure** for comprehensive test reporting. All logs are automatically mapped to Allure reports with detailed step-by-step information.

#### Viewing Reports

After running tests, generate and view the Allure report:

```bash
# Generate and open report
npm run test:allure

# Or manually
npm run allure:generate
npm run allure:open
```

#### Using Allure Logger

The framework provides an Allure-integrated logger that automatically attaches logs to test reports:

```typescript
import { allureLogger } from './src/utils/allure-logger';
import { allure } from 'allure-playwright';

test('example test', async ({ page }) => {
  // Add test metadata
  allure.epic('User Management');
  allure.feature('Login');
  allure.story('User login flow');
  
  // Use Allure logger - logs are automatically attached to report
  allureLogger.info('Starting login test');
  
  await allureLogger.step('Navigate to login page', async () => {
    allureLogger.info('Navigating to login page');
    await page.goto('https://example.com/login');
  });
  
  await allureLogger.step('Fill login form', async () => {
    allureLogger.info('Filling email field');
    await page.fill('#email', 'user@example.com');
    allureLogger.info('Filling password field');
    await page.fill('#password', 'password123');
  });
  
  // Attach custom attachments
  allureLogger.attach('screenshot', await page.screenshot(), 'image/png');
  allureLogger.info('Test completed successfully');
});
```

#### Allure Logger Features

- **Automatic log attachment**: All logs are automatically attached to Allure steps
- **Step creation**: Create nested steps for better organization
- **Custom attachments**: Attach screenshots, JSON, or any content
- **Log levels**: Support for DEBUG, INFO, WARN, ERROR levels

```typescript
// Log with different levels
allureLogger.debug('Debug information');
allureLogger.info('Informational message');
allureLogger.warn('Warning message');
allureLogger.error('Error message');

// Create steps
await allureLogger.step('Step name', async () => {
  // Your code here
});

// Attach custom content
allureLogger.attach('data.json', JSON.stringify(data), 'application/json');
```

### Using MCP Server

The MCP server exposes automation tools that can be used by AI models or other MCP clients:

```bash
# Start MCP server
npm run mcp:server
```

Available tools:
- `navigate` - Navigate to a URL
- `click` - Click an element
- `fill` - Fill an input field
- `screenshot` - Take a screenshot
- `get_text` - Get text from an element
- `wait_for_selector` - Wait for an element to appear

### Using MCP Client

```typescript
import { PlaywrightMCPClient } from './src/mcp/client';

const client = new PlaywrightMCPClient();
await client.connect();

// Navigate to a page
await client.navigate('https://example.com');

// Click an element
await client.click('button');

// Fill a form
await client.fill('#email', 'user@example.com');

// Get text
const text = await client.getText('h1');

await client.disconnect();
```

### Using Core Automation

```typescript
import { PlaywrightAutomation } from './src/core/playwright-automation';

const automation = new PlaywrightAutomation();
await automation.init();

await automation.navigate('https://example.com');
await automation.click('h1');
await automation.screenshot('screenshot.png');

await automation.close();
```

## 📐 Page Object Model (POM) Structure

The framework follows a comprehensive Page Object Model pattern with reusable utilities for web operations and assertions.

### Architecture Overview

```
BasePage (Abstract)
    ├── WebOperations (All web UI operations)
    ├── Assertions (All assertion functions)
    └── Page instance (Playwright Page)
        └── Your Page Objects extend BasePage
```

### Creating Page Objects

```typescript
import { Page } from 'playwright';
import { BasePage } from './src/core/base-page';

class LoginPage extends BasePage {
  // Define selectors as readonly private properties
  private readonly emailInput = '#email';
  private readonly passwordInput = '#password';
  private readonly submitButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';

  constructor(page: Page) {
    super(page);
  }

  // Implement abstract methods
  async navigate(): Promise<void> {
    await this.page.goto('https://example.com/login');
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await this.waitForElement(this.emailInput);
  }

  // Page-specific methods using inherited utilities
  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.emailInput, email, { clear: true });
    await this.fillInput(this.passwordInput, password, { clear: true });
    await this.clickElement(this.submitButton);
  }

  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await this.assertions.assertTextEquals(this.errorMessage, expectedMessage);
  }
}
```

### Web Operations Utility

The `WebOperations` class provides all mandatory web UI operations with automatic Allure logging:

```typescript
import { WebOperations } from './src/utils/web-operations';

// In your page object, access via this.webOps
await this.webOps.click('#button');
await this.webOps.fill('#input', 'value');
await this.webOps.selectOption('#dropdown', 'option1');
await this.webOps.uploadFile('#file-input', 'path/to/file.pdf');
await this.webOps.hover('#menu-item');
await this.webOps.waitForVisible('#element');
```

**Available Operations:**
- **Click Operations**: `click()`, `clickByText()`, `doubleClick()`, `rightClick()`
- **Input Operations**: `fill()`, `type()`, `clear()`
- **Element State**: `isVisible()`, `isEnabled()`, `isChecked()`
- **Checkbox/Radio**: `check()`, `uncheck()`
- **Dropdown**: `selectOption()`
- **Text Operations**: `getText()`, `getInnerText()`, `getAttribute()`, `getAllTexts()`
- **Wait Operations**: `waitForVisible()`, `waitForHidden()`, `waitForCount()`, `waitForNavigation()`, `waitForURL()`
- **File Operations**: `uploadFile()`
- **Navigation**: `reload()`, `goBack()`, `goForward()`
- **Interaction**: `hover()`, `focus()`, `scrollIntoView()`, `pressKey()`
- **Screenshot**: `screenshot()`
- **JavaScript**: `executeScript()`
- **Count**: `getCount()`

### Assertions Utility

The `Assertions` class provides reusable assertion functions with automatic Allure logging:

```typescript
import { Assertions } from './src/utils/assertions';

// In your page object, access via this.assertions
await this.assertions.assertVisible('#element');
await this.assertions.assertTextEquals('#heading', 'Expected Text');
await this.assertions.assertEnabled('#button');
await this.assertions.assertCount('.items', 5);
await this.assertions.assertURL('https://example.com');
```

**Available Assertions:**
- **Visibility**: `assertVisible()`, `assertHidden()`
- **State**: `assertEnabled()`, `assertDisabled()`, `assertEditable()`, `assertNotEditable()`
- **Text**: `assertTextEquals()`, `assertTextContains()`, `assertTextMatches()`
- **Attributes**: `assertAttribute()`, `assertHasAttribute()`
- **Checkbox/Radio**: `assertChecked()`, `assertUnchecked()`
- **Count**: `assertCount()`, `assertCountGreaterThan()`, `assertCountLessThan()`
- **URL**: `assertURL()`, `assertURLContains()`
- **Title**: `assertTitle()`, `assertTitleContains()`
- **CSS**: `assertHasClass()`, `assertCSSProperty()`
- **Value**: `assertValue()`
- **Focus**: `assertFocused()`
- **Viewport**: `assertInViewport()`, `assertNotInViewport()`
- **General**: `assertEqual()`, `assertNotEqual()`, `assertTrue()`, `assertFalse()`
- **Collections**: `assertContains()`, `assertStringContains()`
- **Numbers**: `assertGreaterThan()`, `assertLessThan()`

### Complete Example: Login Page

```typescript
import { Page } from 'playwright';
import { BasePage } from './src/core/base-page';

export class LoginPage extends BasePage {
  private readonly emailInput = '#email';
  private readonly passwordInput = '#password';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';
  private readonly rememberMeCheckbox = '#remember-me';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/login');
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await this.waitForElement(this.emailInput);
  }

  // Using WebOperations
  async enterEmail(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email, { clear: true });
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password, { clear: true });
  }

  async checkRememberMe(): Promise<void> {
    await this.checkElement(this.rememberMeCheckbox);
  }

  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  // Complete workflow
  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickLogin();
  }

  // Using Assertions
  async assertLoginFormVisible(): Promise<void> {
    await this.assertions.assertVisible(this.emailInput);
    await this.assertions.assertVisible(this.passwordInput);
    await this.assertions.assertVisible(this.loginButton);
  }

  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await this.assertions.assertVisible(this.errorMessage);
    await this.assertions.assertTextEquals(this.errorMessage, expectedMessage);
  }

  async assertEmailInputEnabled(): Promise<void> {
    await this.assertions.assertEnabled(this.emailInput);
  }
}
```

### Using Page Objects in Tests

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { allure } from 'allure-playwright';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.assertLoginFormVisible();
    await loginPage.login('user@example.com', 'password123');
    
    // Assertions are built into page objects
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await loginPage.assertErrorMessage('Invalid email or password');
  });
});
```

### Best Practices

1. **Selector Management**: Store all selectors as private readonly properties
2. **Method Naming**: Use descriptive method names (e.g., `enterEmail()` not `fillEmail()`)
3. **Reusability**: Create reusable methods for common workflows
4. **Assertions**: Keep assertions in page objects for better maintainability
5. **Wait Strategies**: Always wait for elements before interacting
6. **Error Handling**: Use assertions to validate expected states
7. **Documentation**: Add JSDoc comments to complex methods

## 🥒 Gherkin/BDD Step Definitions

The framework includes Gherkin-style step definitions that allow you to write tests in simple, understandable language. Each step is automatically logged to Allure reports.

### Using Gherkin Steps

```typescript
import { test } from '@playwright/test';
import { createGherkinHelper } from '../src/bdd/gherkin-helper';

test('login test with Gherkin steps', async ({ page }) => {
  const gherkin = createGherkinHelper(page);
  const steps = gherkin.getSteps();

  // Feature and Scenario
  await gherkin.feature('User Authentication');
  await gherkin.scenario('User logs in successfully');

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
});
```

### Available Step Definitions

#### Given Steps (Setup)
- `givenINavigateTo(url)` - Navigate to a URL
- `givenIAmOnThePage(pageName)` - Navigate to a specific page
- `givenThePageIsLoaded()` - Wait for page to load

#### When Steps (Actions)
- `whenIClickOn(selector)` - Click on an element
- `whenIClickOnTheButton(text)` - Click on a button by text
- `whenIClickOnTheLink(text)` - Click on a link by text
- `whenIFillWith(selector, value)` - Fill an input field
- `whenITypeInto(text, selector)` - Type text into a field
- `whenIClear(selector)` - Clear an input field
- `whenISelectFrom(value, selector)` - Select an option from dropdown
- `whenICheck(selector)` - Check a checkbox
- `whenIUncheck(selector)` - Uncheck a checkbox
- `whenIHoverOver(selector)` - Hover over an element
- `whenIScrollTo(selector)` - Scroll to an element
- `whenIPressOn(key, selector)` - Press a key on an element
- `whenIUploadTo(filePath, selector)` - Upload a file
- `whenIWaitForToBeVisible(selector)` - Wait for element to be visible
- `whenIWaitForSeconds(timeout)` - Wait for specified seconds
- `whenIReloadThePage()` - Reload the page
- `whenIGoBack()` - Go back in browser history
- `whenIGoForward()` - Go forward in browser history

#### Then Steps (Assertions)
- `thenIShouldSee(selector)` - Assert element is visible
- `thenIShouldNotSee(selector)` - Assert element is hidden
- `thenShouldBeVisible(selector)` - Assert element is visible
- `thenShouldBeHidden(selector)` - Assert element is hidden
- `thenShouldBeEnabled(selector)` - Assert element is enabled
- `thenShouldBeDisabled(selector)` - Assert element is disabled
- `thenShouldContainText(selector, text)` - Assert element contains text
- `thenShouldHaveText(selector, text)` - Assert element has exact text
- `thenThePageTitleShouldBe(title)` - Assert page title
- `thenThePageTitleShouldContain(text)` - Assert page title contains text
- `thenTheURLShouldBe(url)` - Assert URL
- `thenTheURLShouldContain(text)` - Assert URL contains text
- `thenShouldBeChecked(selector)` - Assert checkbox is checked
- `thenShouldNotBeChecked(selector)` - Assert checkbox is not checked
- `thenShouldHaveValue(selector, value)` - Assert element value
- `thenShouldHaveAttributeWithValue(selector, attribute, value)` - Assert attribute value
- `thenThereShouldBeElements(count, selector)` - Assert element count
- `thenIShouldSeeOnThePage(text)` - Assert text is visible on page
- `thenIShouldNotSeeOnThePage(text)` - Assert text is not visible on page

#### And Steps (Additional Actions/Assertions)
- `andIClickOn(selector)` - Additional click action
- `andIFillWith(selector, value)` - Additional fill action
- `andIShouldSee(selector)` - Additional assertion
- `andShouldContainText(selector, text)` - Additional text assertion

### Complete Example

```typescript
import { test } from '@playwright/test';
import { createGherkinHelper } from '../src/bdd/gherkin-helper';

test.describe('Login Feature', () => {
  test('should login successfully', async ({ page }) => {
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

  test('should show error for invalid credentials', async ({ page }) => {
    const gherkin = createGherkinHelper(page);
    const steps = gherkin.getSteps();

    await gherkin.feature('User Authentication');
    await gherkin.scenario('User attempts login with invalid credentials');

    // Given
    await steps.givenINavigateTo('/login');

    // When
    await steps.whenIFillWith('#email', 'invalid@example.com');
    await steps.whenIFillWith('#password', 'wrongpassword');
    await steps.whenIClickOn('button[type="submit"]');

    // Then
    await steps.thenIShouldSee('.error-message');
    await steps.thenShouldContainText('.error-message', 'Invalid');
  });
});
```

### Benefits of Gherkin Steps

1. **Readability**: Tests are written in plain, understandable language
2. **Maintainability**: Easy to understand what each test does
3. **Reusability**: Steps can be reused across multiple tests
4. **Allure Integration**: All steps are automatically logged to Allure reports
5. **Non-technical Friendly**: Business stakeholders can understand test scenarios
6. **Consistency**: Standardized way of writing test steps

### Combining Gherkin with Page Objects

You can combine Gherkin steps with Page Objects for maximum flexibility:

```typescript
import { test } from '@playwright/test';
import { createGherkinHelper } from '../src/bdd/gherkin-helper';
import { LoginPage } from '../src/pages/login-page';

test('login with mixed approach', async ({ page }) => {
  const gherkin = createGherkinHelper(page);
  const steps = gherkin.getSteps();
  const loginPage = new LoginPage(page);

  await gherkin.feature('User Authentication');
  await gherkin.scenario('User logs in using page object');

  // Use Gherkin for navigation
  await steps.givenINavigateTo('/login');

  // Use Page Object for complex interactions
  await loginPage.login('user@example.com', 'password123');

  // Use Gherkin for assertions
  await steps.thenTheURLShouldContain('/dashboard');
});
```

## 🔧 Configuration

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Test directories
- Browser configurations
- Base URLs
- Timeouts and retries
- Screenshot/video settings

### TypeScript Configuration

Edit `tsconfig.json` to adjust:
- Compiler options
- Module resolution
- Strict type checking

## 📝 Scripts

### Test Scripts

**Default (Preview Environment):**
- `npm test` - Run tests on Preview environment
- `npm run test:headed` - Run tests in headed mode (Preview)
- `npm run test:ui` - Run tests with Playwright UI (Preview)
- `npm run test:debug` - Debug tests (Preview)
- `npm run test:allure` - Run tests and generate Allure report (Preview)

**Preview Environment:**
- `npm run test:preview` - Run tests on Preview
- `npm run test:headed:preview` - Run tests in headed mode (Preview)
- `npm run test:ui:preview` - Run tests with UI (Preview)
- `npm run test:debug:preview` - Debug tests (Preview)
- `npm run test:allure:preview` - Run tests with Allure (Preview)

**Staging Environment:**
- `npm run test:staging` - Run tests on Staging
- `npm run test:headed:staging` - Run tests in headed mode (Staging)
- `npm run test:ui:staging` - Run tests with UI (Staging)
- `npm run test:debug:staging` - Debug tests (Staging)
- `npm run test:allure:staging` - Run tests with Allure (Staging)

**Production Environment:**
- `npm run test:production` - Run tests on Production
- `npm run test:headed:production` - Run tests in headed mode (Production)
- `npm run test:ui:production` - Run tests with UI (Production)
- `npm run test:debug:production` - Debug tests (Production)
- `npm run test:allure:production` - Run tests with Allure (Production)

### Allure Scripts
- `npm run allure:generate` - Generate Allure report from test results
- `npm run allure:open` - Open generated Allure report in browser
- `npm run allure:serve` - Serve Allure report (auto-opens in browser)

### Build & Development
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Development mode with watch

### MCP Scripts
- `npm run mcp:server` - Start MCP server
- `npm run mcp:client` - Run MCP client example

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT

## 📊 Allure Report Features

- **Detailed Test Steps**: Every action is logged as a step in the report
- **Automatic Log Attachment**: All logs are automatically attached to test steps
- **Screenshots & Videos**: Automatically captured on failures and attached to Allure
- **Test History**: Track test execution history over time
- **Categories & Tags**: Organize tests with epics, features, and stories
- **Environment Information**: View browser, OS, and test environment details
- **Timeline View**: See test execution timeline
- **Retry Information**: Track test retries and failures

## 🎬 Automatic Failure Handling

The framework automatically captures and attaches failure artifacts to Allure reports when tests fail.

### What Gets Captured on Failure

1. **Screenshot**: Full-page screenshot of the browser at the time of failure
2. **Video**: Complete video recording of the test execution
3. **Trace File**: Playwright trace for debugging (if enabled)
4. **Page HTML**: HTML snapshot of the page at failure
5. **Error Details**: Complete error message, stack trace, and test metadata

### Browser Auto-Close After Tests

To prevent browsers from staying open indefinitely, the framework automatically closes browsers after every test (pass or fail) with a configurable delay (default: 5 seconds).

**Features:**
- ✅ Automatically closes browser after **every test** (pass or fail) in **headless mode**
- ✅ Keeps browser open in **headed mode** for debugging
- ✅ Configurable delay before closing
- ✅ Non-blocking - doesn't delay test completion
- ✅ Prevents resource leaks in CI/CD environments

**Configuration:**

Set the delay (in milliseconds) via environment variable:

```bash
# Close browser after 10 seconds (default is 5 seconds)
BROWSER_CLOSE_DELAY_MS=10000 npm run test:preview

# Disable auto-close (keep browser open)
BROWSER_CLOSE_DELAY_MS=0 npm run test:preview
```

**Behavior:**
- **Headless mode**: Browser closes automatically after every test (pass or fail)
- **Headed mode** (debugging): Browser stays open for manual inspection
- **CI/CD**: Auto-close is enabled by default to prevent resource leaks
- **Delay**: Default 5 seconds allows time to capture artifacts before closing

### How It Works

Failure handling is **automatic** - no code changes needed in your tests:

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  // If this fails, screenshot and video are automatically captured
  await expect(page.locator('h1')).toHaveText('Wrong Text');
});
```

### Manual Failure Handling

You can also manually trigger failure handling if needed:

```typescript
import { test, expect } from '@playwright/test';
import { FailureHandler } from '../src/utils/failure-handler';

test('test with manual failure handling', async ({ page, testInfo }) => {
  try {
    await page.goto('https://example.com');
    await expect(page.locator('h1')).toHaveText('Wrong Text');
  } catch (error) {
    // Manually capture failure artifacts
    await FailureHandler.handleFailureComprehensive(page, testInfo);
    throw error;
  }
});
```

### Configuration

Failure handling is configured in `playwright.config.ts`:

```typescript
use: {
  screenshot: 'only-on-failure', // Screenshots captured on failure
  video: 'retain-on-failure',     // Videos retained on failure
  trace: 'on-first-retry',        // Traces captured on retry
}
```

### Viewing Failure Artifacts

1. Run tests: `npm run test:allure`
2. Open Allure report: `npm run allure:open`
3. Navigate to failed test
4. View attachments:
   - Click on "Attachments" section
   - View screenshot, video, trace, and error details

All artifacts are automatically attached and visible in the Allure report!

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [Allure Framework Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Integration](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [TypeScript Documentation](https://www.typescriptlang.org)
