<div align="center">

# 🚗 PakWheels Test Suite

**Comprehensive UI test cases for PakWheels website**

[Test Cases](#-test-cases-overview) • [Running Tests](#-running-tests) • [Configuration](#-browser-configuration) • [Structure](#-test-structure)

</div>

---

## 📋 Test Cases Overview

This directory contains **30 UI test cases** for the PakWheels website (https://www.pakwheels.com/), organized into three main categories.

### 📊 Test Categories

| Category | Test IDs | File | Description |
|----------|----------|------|-------------|
| **Homepage Tests** | TC001-TC010 | `pakwheels-homepage.spec.ts` | Homepage navigation and main elements |
| **Car Search Tests** | TC011-TC020 | `pakwheels-car-search.spec.ts` | Car search and filtering functionality |
| **User Interaction Tests** | TC021-TC030 | `pakwheels-user-interactions.spec.ts` | User interactions and advanced features |

---

## 🏠 Homepage Tests (TC001-TC010)

| Test ID | Test Case | Description |
|---------|-----------|-------------|
| **TC001** | Verify homepage loads with all main elements | Homepage loads successfully with navigation menu |
| **TC002** | Verify navigation menu items are visible and clickable | All navigation items functional |
| **TC003** | Verify search functionality for used cars | Search feature works correctly |
| **TC004** | Verify user can navigate to Used Cars section | Navigation to Used Cars works |
| **TC005** | Verify user can navigate to New Cars section | Navigation to New Cars works |
| **TC006** | Verify user can navigate to Bikes section | Navigation to Bikes works |
| **TC007** | Verify Sign In button is visible and clickable | Sign In button accessible |
| **TC008** | Verify Sign Up button is visible and clickable | Sign Up button accessible |
| **TC009** | Verify Post an Ad button is visible | Post an Ad button visible |
| **TC010** | Verify featured cars section is displayed | Featured cars section visible |

---

## 🔍 Car Search Tests (TC011-TC020)

| Test ID | Test Case | Description |
|---------|-----------|-------------|
| **TC011** | Verify user can search for cars by city | City-based search works |
| **TC012** | Verify user can filter cars by make/brand | Brand filter functional |
| **TC013** | Verify user can filter cars by price range | Price filter works |
| **TC014** | Verify car listing cards display essential information | Listing cards show required info |
| **TC015** | Verify user can click on a car listing to view details | Car detail page accessible |
| **TC016** | Verify user can sort car listings | Sorting functionality works |
| **TC017** | Verify popular car models are displayed | Popular models visible |
| **TC018** | Verify user can navigate to car reviews section | Reviews section accessible |
| **TC019** | Verify user can access car comparisons | Comparison feature works |
| **TC020** | Verify user can filter by car body type | Body type filter functional |

---

## 👤 User Interaction Tests (TC021-TC030)

| Test ID | Test Case | Description |
|---------|-----------|-------------|
| **TC021** | Verify user can open Sign In modal/dialog | Sign In modal opens |
| **TC022** | Verify user can access Forums section | Forums section accessible |
| **TC023** | Verify user can access Videos section | Videos section accessible |
| **TC024** | Verify user can access Auto Store section | Auto Store accessible |
| **TC025** | Verify user can access Blog section | Blog section accessible |
| **TC026** | Verify mobile app download section is visible | Mobile app section visible |
| **TC027** | Verify user can view popular cities for car listings | Popular cities displayed |
| **TC028** | Verify footer links are accessible | Footer links functional |
| **TC029** | Verify user can view featured used cars | Featured cars visible |
| **TC030** | Verify user can access car price calculator | Price calculator accessible |

---

## 🚀 Running Tests

### Run All PakWheels Tests

```bash
npm run test:preview -- tests/pakwheels
```

### Run Specific Test File

```bash
# Homepage tests
npm run test:preview -- tests/pakwheels/pakwheels-homepage.spec.ts

# Car search tests
npm run test:preview -- tests/pakwheels/pakwheels-car-search.spec.ts

# User interaction tests
npm run test:preview -- tests/pakwheels/pakwheels-user-interactions.spec.ts
```

### Run Specific Test Case

```bash
# Run test by ID
npm run test:preview -- tests/pakwheels -g "TC001"

# Run test by name
npm run test:preview -- tests/pakwheels -g "Verify homepage loads"
```

### Run with Allure Report

```bash
npm run test:allure:preview -- tests/pakwheels
```

### Run in Headed Mode (See Browser)

```bash
npm run test:headed:preview -- tests/pakwheels
```

### Run in UI Mode (Interactive)

```bash
npm run test:ui:preview -- tests/pakwheels
```

---

## 🌐 Browser Configuration

All tests are configured to run in **Chrome browser** by default.

### Configuration in `playwright.config.ts`

```typescript
projects: [
  {
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      channel: 'chrome', // Use Chrome browser specifically
    },
  },
]
```

### Running in Different Browsers

To run in different browsers, modify the project selection:

```bash
# Run in Firefox
npm run test:preview -- tests/pakwheels --project=firefox

# Run in Safari/WebKit
npm run test:preview -- tests/pakwheels --project=webkit
```

---

## 📐 Test Structure

Each test follows the **Gherkin/BDD pattern** for readability:

### Test Pattern

```typescript
test('TC001: Verify homepage loads with all main elements', async ({ page }) => {
  const gherkin = createGherkinHelper(page);
  const steps = gherkin.getSteps();

  await gherkin.feature('Homepage Navigation');
  await gherkin.scenario('User visits PakWheels homepage');

  // Given - Setup
  await steps.givenINavigateTo('https://www.pakwheels.com/');
  await steps.givenThePageIsLoaded();

  // When - Actions (if needed)
  // ...

  // Then - Assertions
  await steps.thenThePageTitleShouldContain('PakWheels');
  await steps.thenIShouldSee('text=Used Cars');
});
```

### Test Components

| Component | Description |
|-----------|-------------|
| **Given** | Setup and initial state |
| **When** | Actions performed |
| **Then** | Assertions and validations |

---

## ✨ Test Features

### ✅ Automatic Features

- **Failure Handling**: Screenshots and videos automatically captured on failure
- **Allure Logging**: All steps logged to Allure reports
- **Browser Cleanup**: Browsers automatically close after each test
- **Flexible Selectors**: Handles dynamic content gracefully
- **Wait Strategies**: Proper waits for element visibility

### 📸 Failure Artifacts

When a test fails, the following are automatically captured:

- 📸 **Screenshot**: Full-page screenshot at failure
- 🎥 **Video**: Complete video recording
- 📄 **Page HTML**: HTML snapshot
- 📊 **Trace File**: Playwright trace for debugging
- 📝 **Error Details**: Stack trace and metadata

All artifacts are attached to **Allure reports** automatically.

---

## 📝 Notes

### Selector Strategy

- Tests use **flexible selectors** to handle dynamic content
- Multiple selector strategies (text, CSS, XPath) are used
- Selectors are designed to be resilient to UI changes

### Wait Strategy

- All tests wait for elements to be **visible** before interaction
- Uses `waitForLoadState` for page navigation
- Implements proper timeout handling

### Test Data

- Tests use **real website data** (PakWheels.com)
- No test data setup required
- Tests validate actual website functionality

---

## 📚 Additional Documentation

- [Test Cases Summary](./TEST_CASES_SUMMARY.md) - Detailed test case descriptions
- [Main README](../../README.md) - Framework documentation
- [How to Run Tests](../../HOW_TO_RUN_TESTS.md) - Running tests guide

---

<div align="center">

**Happy Testing! 🚗**

[⬆ Back to Top](#-pakwheels-test-suite)

</div>
