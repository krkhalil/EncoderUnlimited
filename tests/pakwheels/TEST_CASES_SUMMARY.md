<div align="center">

# 📋 PakWheels - 10 Main UI Test Cases

**Detailed test case documentation**

[Overview](#-overview) • [Test Cases](#-test-cases) • [Running Tests](#-running-the-tests) • [Configuration](#-browser-configuration)

</div>

---

## 📊 Overview

This document outlines the **10 main UI test cases** for PakWheels website (https://www.pakwheels.com/).

### Test Specifications

| Specification | Value |
|---------------|-------|
| **Website** | https://www.pakwheels.com/ |
| **Browser** | Chrome (configured in playwright.config.ts) |
| **Test Style** | Gherkin/BDD with step definitions |
| **Total Test Cases** | 30 (10 per category) |
| **Main Test Cases** | 10 (documented here) |

---

## 🧪 Test Cases

### TC001: Homepage Load and Main Elements Verification

**Objective**: Verify homepage loads successfully with all main navigation elements

**Test Steps**:
1. Navigate to https://www.pakwheels.com/
2. Verify header, navigation menu, and main content are visible
3. Verify page title contains "PakWheels"
4. Verify main sections (Used Cars, New Cars, Bikes) are accessible

**Expected Result**: ✅ Homepage loads with all elements visible

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/"
Given the page is loaded
Then the page title should contain "PakWheels"
Then I should see "text=Used Cars"
Then I should see "text=New Cars"
Then I should see "text=Bikes"
```

---

### TC002: Navigation Menu Functionality

**Objective**: Verify all navigation menu items are visible and clickable

**Test Steps**:
1. Navigate to homepage
2. Verify navigation items: Used Cars, New Cars, Bikes, Auto Store, Videos, Forums
3. Verify each menu item is clickable

**Expected Result**: ✅ All navigation items are visible and functional

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/"
Given the page is loaded
Then I should see "text=Used Cars"
Then I should see "text=New Cars"
Then I should see "text=Bikes"
Then I should see "text=Auto Store"
Then I should see "text=Videos"
Then I should see "text=Forums"
```

---

### TC003: Used Cars Section Navigation

**Objective**: Verify user can navigate to Used Cars section

**Test Steps**:
1. Navigate to homepage
2. Click on "Used Cars" link
3. Verify URL contains "used-cars"
4. Verify page displays used cars content

**Expected Result**: ✅ Successfully navigated to Used Cars section

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/"
When I click on "text=Used Cars"
Then the URL should contain "used-cars"
Then I should see car listings or search filters
```

---

### TC004: New Cars Section Navigation

**Objective**: Verify user can navigate to New Cars section

**Test Steps**:
1. Navigate to homepage
2. Click on "New Cars" link
3. Verify URL contains "new-cars"
4. Verify page displays new cars content

**Expected Result**: ✅ Successfully navigated to New Cars section

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/"
When I click on "text=New Cars"
Then the URL should contain "new-cars"
Then I should see new cars content
```

---

### TC005: Bikes Section Navigation

**Objective**: Verify user can navigate to Bikes section

**Test Steps**:
1. Navigate to homepage
2. Click on "Bikes" link
3. Verify URL contains "bikes"
4. Verify page displays bikes content

**Expected Result**: ✅ Successfully navigated to Bikes section

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/"
When I click on "text=Bikes"
Then the URL should contain "bikes"
Then I should see bikes content
```

---

### TC006: Sign In Functionality

**Objective**: Verify Sign In button opens authentication dialog

**Test Steps**:
1. Navigate to homepage
2. Click on "Sign In" button
3. Verify sign in modal/dialog appears
4. Verify mobile number/email input field is visible

**Expected Result**: ✅ Sign In dialog opens successfully

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/"
Given the page is loaded
When I click on "text=Sign In"
Then I should see sign in modal or dialog
Then I should see input field for email or mobile
```

---

### TC007: Car Search Functionality

**Objective**: Verify user can search for cars

**Test Steps**:
1. Navigate to Used Cars section
2. Locate search input field
3. Verify search functionality is available
4. Verify search filters (city, make, price) are accessible

**Expected Result**: ✅ Search functionality is working

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/used-cars"
Given the page is loaded
Then I should see search input or filters
Then I should see city filter
Then I should see make/brand filter
Then I should see price filter
```

---

### TC008: Car Listing Display

**Objective**: Verify car listings are displayed with essential information

**Test Steps**:
1. Navigate to Used Cars section
2. Wait for car listings to load
3. Verify car cards/listings are visible
4. Verify price, model, and other details are displayed

**Expected Result**: ✅ Car listings display correctly with all information

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/used-cars"
Given the page is loaded
When I wait for car listings to be visible
Then I should see car listing cards
Then car listings should contain price information
Then car listings should contain model information
```

---

### TC009: Car Details Page

**Objective**: Verify user can view detailed car information

**Test Steps**:
1. Navigate to Used Cars section
2. Click on any car listing
3. Verify car details page loads
4. Verify URL contains car listing ID
5. Verify car details (price, specifications, images) are visible

**Expected Result**: ✅ Car details page loads with complete information

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/used-cars"
Given the page is loaded
When I click on the first car listing
Then the URL should contain car listing identifier
Then I should see car price
Then I should see car specifications
Then I should see car images
```

---

### TC010: Filter Functionality

**Objective**: Verify user can filter cars by various criteria

**Test Steps**:
1. Navigate to Used Cars section
2. Verify filter options are available (City, Make/Brand, Price, Body Type)
3. Verify popular brands (Toyota, Honda, Suzuki) are visible
4. Verify city filters (Karachi, Lahore, Islamabad) are available
5. Verify body type filters (Sedan, SUV, Hatchback) are accessible

**Expected Result**: ✅ All filter options are functional

**Gherkin Steps**:
```gherkin
Given I navigate to "https://www.pakwheels.com/used-cars"
Given the page is loaded
Then I should see filter options
Then I should see "text=Toyota" or brand filter
Then I should see "text=Karachi" or city filter
Then I should see "text=Sedan" or body type filter
```

---

## 🚀 Running the Tests

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
# Run by test ID
npm run test:preview -- tests/pakwheels -g "TC001"

# Run by test name
npm run test:preview -- tests/pakwheels -g "Verify homepage loads"
```

### Run with Chrome Browser (Headed Mode)

```bash
npm run test:headed:preview -- tests/pakwheels
```

### Run with Allure Report

```bash
npm run test:allure:preview -- tests/pakwheels
```

---

## 🌐 Browser Configuration

All tests are configured to run in **Chrome browser** as specified.

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

### Browser Requirements

- ✅ Chrome browser installed
- ✅ Playwright browsers installed: `npx playwright install chrome`
- ✅ Chrome channel configured in Playwright config

---

## ✨ Test Features

### Framework Features

| Feature | Description |
|---------|-------------|
| ✅ **Gherkin/BDD** | All tests use Gherkin step definitions for readability |
| ✅ **Automatic Failure Handling** | Screenshots and videos captured on failure |
| ✅ **Allure Logging** | All steps logged to Allure reports |
| ✅ **Flexible Selectors** | Handles dynamic content gracefully |
| ✅ **Wait Strategies** | Proper waits for element visibility |
| ✅ **Chrome Browser** | Configured to run in Chrome |

### Test Execution Features

- **Automatic Screenshots**: Captured on failure
- **Video Recording**: Complete test execution videos
- **Trace Files**: Playwright traces for debugging
- **Page HTML**: HTML snapshots on failure
- **Error Details**: Complete error information

---

## 📊 Additional Test Cases

The framework includes **30 total test cases** (TC001-TC030) covering:

| Category | Test IDs | Coverage |
|----------|----------|----------|
| **Homepage** | TC001-TC010 | Homepage functionality and navigation |
| **Car Search** | TC011-TC020 | Car search and filtering features |
| **User Interactions** | TC021-TC030 | User interactions and advanced features |

See individual test files for complete test coverage:
- `pakwheels-homepage.spec.ts` - Homepage tests
- `pakwheels-car-search.spec.ts` - Car search tests
- `pakwheels-user-interactions.spec.ts` - User interaction tests

---

## 📚 Related Documentation

- [PakWheels Test Suite README](./README.md) - Test suite overview
- [Main Framework README](../../README.md) - Framework documentation
- [How to Run Tests](../../HOW_TO_RUN_TESTS.md) - Running tests guide

---

<div align="center">

**Comprehensive Test Coverage! 🚗**

[⬆ Back to Top](#-pakwheels---10-main-ui-test-cases)

</div>
