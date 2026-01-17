<div align="center">

# 🚀 EncoderUnlimited Automation Framework

**A powerful, enterprise-grade automation framework combining Model Context Protocol (MCP), Playwright, and TypeScript**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40-green.svg)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-2.13-orange.svg)](https://docs.qameta.io/allure/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Examples](#-examples)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **MCP Integration** | Expose automation tools via Model Context Protocol for AI/LLM interaction |
| 🎭 **Playwright Automation** | Robust browser automation with cross-browser support (Chrome, Firefox, Safari) |
| 📊 **Allure Reporting** | Beautiful and comprehensive test reports with detailed logs and attachments |
| 📝 **TypeScript** | Type-safe development with modern TypeScript features |
| 🏗️ **Page Object Model** | Structured approach to organizing test code with reusable components |
| 🥒 **Gherkin/BDD** | Write tests in simple, understandable language with step definitions |
| 🌍 **Multi-Environment** | Support for Preview, Staging, and Production environments |
| 🔧 **Extensible Architecture** | Easy to extend with custom tools and utilities |
| 🎬 **Auto Failure Handling** | Automatic screenshot, video, and trace capture on test failures |
| 🔄 **Browser Management** | Automatic browser cleanup to prevent resource leaks |
| 🛡️ **Security Protection** | Pre-commit hooks and CI checks to prevent sensitive data commits |
| 🔒 **Branch Protection** | Require 2 approvals before merging to main branch |

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Environment Configuration](#-environment-configuration)
- [Usage Examples](#-usage-examples)
- [Page Object Model](#-page-object-model-pom)
- [Gherkin/BDD](#-gherkinbdd-step-definitions)
- [Allure Reporting](#-allure-reporting)
- [Failure Handling](#-automatic-failure-handling)
- [Configuration](#-configuration)
- [Scripts Reference](#-scripts-reference)
- [Resources](#-resources)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Installation |
|------------|---------|--------------|
| **Node.js** | 18+ | [Download](https://nodejs.org/) |
| **npm** | Latest | Comes with Node.js |
| **Java** | 8+ | Required for Allure reports |

---

## 🚀 Quick Start

> 💡 **Tip**: Commands in code blocks can be copied by clicking them (in most markdown viewers) or selecting the text. Then paste into your terminal and press Enter.

### 1️⃣ Clone and Install

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install Allure (choose one method)
npm install -g allure-commandline
# OR: brew install allure (macOS)
# OR: scoop install allure (Windows)
```

### 2️⃣ Run Your First Test

```bash
# Run all tests
npm test

# Run with Allure report
npm run test:allure:preview

# Run in UI mode (interactive)
npm run test:ui:preview
```

### 3️⃣ View Results

```bash
# Open Allure report
npm run allure:open
```

**That's it!** 🎉 You're ready to start automating.

### 📋 How to Run Commands from Documentation

**Standard Markdown**: Commands cannot be executed directly from `.md` files, but you can:

1. **Copy Commands**: 
   - Click on the code block (in VS Code, GitHub, etc.) to select all
   - Or manually select the command text
   - Copy with `Cmd+C` (Mac) or `Ctrl+C` (Windows)

2. **Paste in Terminal**:
   - Open your terminal/command prompt
   - Paste with `Cmd+V` (Mac) or `Ctrl+V` (Windows)
   - Press `Enter` to execute

3. **VS Code Integration**:
   - Open integrated terminal: `` Ctrl+` `` (backtick)
   - Copy command from markdown
   - Paste and run directly

4. **VS Code Extensions** (Optional):
   - Install "Markdown All in One" for better markdown support
   - Some extensions can execute code blocks, but standard markdown doesn't support this

---

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Install Playwright Browsers

```bash
npx playwright install
```

### Step 3: Install Allure

Choose one of the following methods:

<details>
<summary><b>Option A: Using npm (Recommended)</b></summary>

```bash
npm install -g allure-commandline
```
</details>

<details>
<summary><b>Option B: Using Homebrew (macOS)</b></summary>

```bash
brew install allure
```
</details>

<details>
<summary><b>Option C: Using Scoop (Windows)</b></summary>

```bash
scoop install allure
```
</details>

<details>
<summary><b>Option D: Manual Installation</b></summary>

1. Download from [Allure Releases](https://github.com/allure-framework/allure2/releases)
2. Extract the archive
3. Add `bin` directory to your PATH
</details>

---

## 📁 Project Structure

```
EncoderUnlimited-1/
│
├── 📂 config/                    # Environment configurations
│   ├── preview.json              # Preview environment config
│   ├── staging.json              # Staging environment config
│   ├── production.json           # Production environment config
│   └── README.md                 # Environment config docs
│
├── 📂 src/                       # Source code
│   ├── 📂 bdd/                   # BDD/Gherkin step definitions
│   │   ├── steps.ts              # Gherkin step definitions
│   │   └── gherkin-helper.ts     # Gherkin helper utilities
│   │
│   ├── 📂 config/                 # Configuration utilities
│   │   └── environment.ts        # Environment loader
│   │
│   ├── 📂 core/                   # Core framework classes
│   │   ├── base-page.ts          # Base Page Object Model
│   │   └── playwright-automation.ts
│   │
│   ├── 📂 mcp/                    # MCP integration
│   │   ├── server.ts              # MCP server
│   │   └── client.ts              # MCP client
│   │
│   ├── 📂 pages/                  # Page Object Models
│   │   ├── example-page.ts
│   │   ├── login-page.ts
│   │   └── dashboard-page.ts
│   │
│   ├── 📂 utils/                  # Utility functions
│   │   ├── logger.ts              # Basic logger
│   │   ├── allure-logger.ts       # Allure-integrated logger
│   │   ├── web-operations.ts      # Web UI operations (50+ methods)
│   │   ├── assertions.ts          # Assertion functions (40+ methods)
│   │   ├── failure-handler.ts     # Failure handling
│   │   └── helpers.ts              # Helper functions
│   │
│   └── index.ts                   # Main exports
│
├── 📂 tests/                      # Test files
│   ├── example.spec.ts
│   ├── mcp-integration.spec.ts
│   └── 📂 pakwheels/              # PakWheels test suite
│       ├── pakwheels-homepage.spec.ts
│       ├── pakwheels-car-search.spec.ts
│       └── pakwheels-user-interactions.spec.ts
│
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies
```

---

## 🌍 Environment Configuration

The framework supports **multiple environments** with environment-specific configurations.

### 📂 Environment Files

| Environment | File | Description |
|------------|------|-------------|
| **Preview** | `config/preview.json` | Development/Preview environment |
| **Staging** | `config/staging.json` | Staging environment |
| **Production** | `config/production.json` | Production environment |

### ⚙️ Setting Environment

#### Method 1: Using npm Scripts (Recommended)

```bash
# Preview (default)
npm run test:preview
npm run test:headed:preview
npm run test:allure:preview

# Staging
npm run test:staging
npm run test:headed:staging
npm run test:allure:staging

# Production
npm run test:production
npm run test:headed:production
npm run test:allure:production
```

#### Method 2: Using Environment Variable

```bash
ENV=staging npm test
ENV=production npm run test:headed
```

#### Method 3: Using .env File

Create `.env` in the `config/` directory:

```env
ENV=staging
BASE_URL=https://staging.example.com
```

### 📝 Configuration Structure

Each environment file contains:

```json
{
  "name": "preview",
  "baseURL": "https://preview.example.com",
  "apiURL": "https://api-preview.example.com",
  "timeout": 60000,
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

### 💻 Using Environment Config in Code

```typescript
import { EnvironmentLoader } from './src/config/environment';

// Get current environment configuration
const config = EnvironmentLoader.getConfig();

// Get specific values
const baseURL = EnvironmentLoader.getBaseURL();
const apiURL = EnvironmentLoader.getAPIURL();
const credentials = EnvironmentLoader.getCredentials();
```

> ⚠️ **Security Note**: Never commit sensitive credentials to version control. Use environment variables or secrets management for production.

---

## 💡 Usage Examples

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed:preview

# Run tests with UI mode (interactive)
npm run test:ui:preview

# Debug tests
npm run test:debug:preview

# Run with Allure report
npm run test:allure:preview
```

### Using Allure Logger

```typescript
import { allureLogger } from './src/utils/allure-logger';
import { allure } from 'allure-playwright';

test('example test', async ({ page }) => {
  // Add test metadata
  allure.epic('User Management');
  allure.feature('Login');
  allure.story('User login flow');
  
  // Use Allure logger - logs automatically attached
  allureLogger.info('Starting login test');
  
  await allureLogger.step('Navigate to login page', async () => {
    await page.goto('https://example.com/login');
  });
  
  // Attach custom content
  allureLogger.attach('screenshot', await page.screenshot(), 'image/png');
});
```

---

## 📐 Page Object Model (POM)

The framework follows a comprehensive **Page Object Model** pattern with reusable utilities.

### 🏗️ Architecture

```
BasePage (Abstract)
    ├── WebOperations (50+ web UI operations)
    ├── Assertions (40+ assertion functions)
    └── Page instance (Playwright Page)
        └── Your Page Objects extend BasePage
```

### 📝 Creating Page Objects

```typescript
import { Page } from 'playwright';
import { BasePage } from './src/core/base-page';

class LoginPage extends BasePage {
  private readonly emailInput = '#email';
  private readonly passwordInput = '#password';
  private readonly submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://example.com/login');
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await this.waitForElement(this.emailInput);
  }

  // Using WebOperations
  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.emailInput, email, { clear: true });
    await this.fillInput(this.passwordInput, password, { clear: true });
    await this.clickElement(this.submitButton);
  }

  // Using Assertions
  async assertLoginFormVisible(): Promise<void> {
    await this.assertions.assertVisible(this.emailInput);
    await this.assertions.assertVisible(this.passwordInput);
  }
}
```

### 🛠️ Available Utilities

#### Web Operations (50+ Methods)

| Category | Methods |
|----------|---------|
| **Click** | `click()`, `clickByText()`, `doubleClick()`, `rightClick()` |
| **Input** | `fill()`, `type()`, `clear()` |
| **Element State** | `isVisible()`, `isEnabled()`, `isChecked()` |
| **Dropdown** | `selectOption()` |
| **Text** | `getText()`, `getInnerText()`, `getAttribute()` |
| **Wait** | `waitForVisible()`, `waitForHidden()`, `waitForNavigation()` |
| **File** | `uploadFile()` |
| **Navigation** | `reload()`, `goBack()`, `goForward()` |
| **Interaction** | `hover()`, `focus()`, `scrollIntoView()`, `pressKey()` |

#### Assertions (40+ Methods)

| Category | Methods |
|----------|---------|
| **Visibility** | `assertVisible()`, `assertHidden()` |
| **State** | `assertEnabled()`, `assertDisabled()`, `assertEditable()` |
| **Text** | `assertTextEquals()`, `assertTextContains()`, `assertTextMatches()` |
| **Attributes** | `assertAttribute()`, `assertHasAttribute()` |
| **Count** | `assertCount()`, `assertCountGreaterThan()` |
| **URL** | `assertURL()`, `assertURLContains()` |
| **Title** | `assertTitle()`, `assertTitleContains()` |
| **CSS** | `assertHasClass()`, `assertCSSProperty()` |

---

## 🥒 Gherkin/BDD Step Definitions

Write tests in **simple, understandable language** with automatic Allure logging.

### 📝 Example

```typescript
import { test } from '@playwright/test';
import { createGherkinHelper } from '../src/bdd/gherkin-helper';

test('login test with Gherkin', async ({ page }) => {
  const gherkin = createGherkinHelper(page);
  const steps = gherkin.getSteps();

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

### 📚 Available Steps

<details>
<summary><b>Given Steps (Setup)</b></summary>

- `givenINavigateTo(url)` - Navigate to a URL
- `givenIAmOnThePage(pageName)` - Navigate to a specific page
- `givenThePageIsLoaded()` - Wait for page to load
</details>

<details>
<summary><b>When Steps (Actions)</b></summary>

- `whenIClickOn(selector)` - Click on an element
- `whenIFillWith(selector, value)` - Fill an input field
- `whenISelectFrom(value, selector)` - Select dropdown option
- `whenIWaitForToBeVisible(selector)` - Wait for element
- `whenIReloadThePage()` - Reload the page
- And many more...
</details>

<details>
<summary><b>Then Steps (Assertions)</b></summary>

- `thenIShouldSee(selector)` - Assert element is visible
- `thenShouldContainText(selector, text)` - Assert text contains
- `thenThePageTitleShouldContain(text)` - Assert page title
- `thenTheURLShouldContain(text)` - Assert URL contains
- And many more...
</details>

---

## 📊 Allure Reporting

The framework uses **Allure** for comprehensive test reporting with automatic log mapping.

### 🎯 Features

- ✅ **Detailed Test Steps**: Every action logged as a step
- ✅ **Automatic Log Attachment**: All logs automatically attached
- ✅ **Screenshots & Videos**: Captured on failures
- ✅ **Test History**: Track execution over time
- ✅ **Categories & Tags**: Organize with epics, features, stories
- ✅ **Environment Info**: Browser, OS, and environment details
- ✅ **Timeline View**: See test execution timeline

### 📖 Viewing Reports

```bash
# Generate and open report
npm run test:allure:preview

# Or manually
npm run allure:generate
npm run allure:open
```

---

## 🎬 Automatic Failure Handling

The framework **automatically captures** failure artifacts when tests fail.

### 📸 What Gets Captured

| Artifact | Description |
|----------|-------------|
| **Screenshot** | Full-page screenshot at failure |
| **Video** | Complete video recording |
| **Trace File** | Playwright trace for debugging |
| **Page HTML** | HTML snapshot at failure |
| **Error Details** | Error message, stack trace, metadata |

### 🔄 Browser Auto-Close

Browsers automatically close after every test (pass or fail) in headless mode.

**Configuration:**

```bash
# Default: Close after 5 seconds
npm run test:preview

# Custom delay: Close after 10 seconds
BROWSER_CLOSE_DELAY_MS=10000 npm run test:preview

# Disable auto-close
BROWSER_CLOSE_DELAY_MS=0 npm run test:preview
```

**Behavior:**
- ✅ Headless mode: Auto-closes after every test
- ✅ Headed mode: Stays open for debugging
- ✅ Configurable delay (default: 5 seconds)
- ✅ Prevents resource leaks in CI/CD

---

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

---

## 📜 Scripts Reference

### 🧪 Test Scripts

#### Preview Environment (Default)
```bash
npm run test:preview              # Run tests
npm run test:headed:preview       # Run in headed mode
npm run test:ui:preview          # Run with UI mode
npm run test:debug:preview        # Debug tests
npm run test:allure:preview      # Run with Allure report
```

#### Staging Environment
```bash
npm run test:staging
npm run test:headed:staging
npm run test:ui:staging
npm run test:debug:staging
npm run test:allure:staging
```

#### Production Environment
```bash
npm run test:production
npm run test:headed:production
npm run test:ui:production
npm run test:debug:production
npm run test:allure:production
```

### 📊 Allure Scripts

```bash
npm run allure:generate          # Generate report
npm run allure:open              # Open report
npm run allure:serve              # Serve report (auto-opens)
```

### 🛠️ Build & Development

```bash
npm run build                    # Compile TypeScript
npm run dev                      # Development mode
```

### 🤖 MCP Scripts

```bash
npm run mcp:server               # Start MCP server
npm run mcp:client               # Run MCP client
```

---

## 🛡️ Security & Branch Protection

### Secret Scanning

The framework includes automatic secret scanning to prevent sensitive information from being committed:

- **Pre-commit hook**: Scans before every commit
- **CI/CD check**: Scans on every push/PR
- **Manual scan**: Run `npm run scan:secrets` anytime

See [SECURITY_SETUP.md](./SECURITY_SETUP.md) for details.

### Branch Protection

The main branch is protected with:
- ✅ **2 approvals required** before merging
- ✅ **Secret scan must pass**
- ✅ **CI/CD checks must pass**
- ✅ **Direct pushes blocked**

See [BRANCH_PROTECTION_SETUP.md](./BRANCH_PROTECTION_SETUP.md) for setup instructions.

---

## 🔗 Resources

| Resource | Link |
|---------|------|
| **Playwright Docs** | [playwright.dev](https://playwright.dev) |
| **Allure Framework** | [docs.qameta.io/allure](https://docs.qameta.io/allure/) |
| **Allure Playwright** | [GitHub](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright) |
| **Model Context Protocol** | [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **TypeScript Docs** | [typescriptlang.org](https://www.typescriptlang.org) |

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

<div align="center">

**Made with ❤️ by EncoderUnlimited**

[⬆ Back to Top](#-encoderunlimited-automation-framework)

</div>
