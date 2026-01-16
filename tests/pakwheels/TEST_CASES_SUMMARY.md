# PakWheels - 10 Main UI Test Cases

## Overview
This document outlines the 10 main UI test cases for PakWheels website (https://www.pakwheels.com/).
All tests run in Chrome browser and use Gherkin/BDD style step definitions.

## Test Cases

### TC001: Homepage Load and Main Elements Verification
**Objective**: Verify homepage loads successfully with all main navigation elements

**Steps**:
- Navigate to https://www.pakwheels.com/
- Verify header, navigation menu, and main content are visible
- Verify page title contains "PakWheels"
- Verify main sections (Used Cars, New Cars, Bikes) are accessible

**Expected Result**: Homepage loads with all elements visible

---

### TC002: Navigation Menu Functionality
**Objective**: Verify all navigation menu items are visible and clickable

**Steps**:
- Navigate to homepage
- Verify navigation items: Used Cars, New Cars, Bikes, Auto Store, Videos, Forums
- Verify each menu item is clickable

**Expected Result**: All navigation items are visible and functional

---

### TC003: Used Cars Section Navigation
**Objective**: Verify user can navigate to Used Cars section

**Steps**:
- Navigate to homepage
- Click on "Used Cars" link
- Verify URL contains "used-cars"
- Verify page displays used cars content

**Expected Result**: Successfully navigated to Used Cars section

---

### TC004: New Cars Section Navigation
**Objective**: Verify user can navigate to New Cars section

**Steps**:
- Navigate to homepage
- Click on "New Cars" link
- Verify URL contains "new-cars"
- Verify page displays new cars content

**Expected Result**: Successfully navigated to New Cars section

---

### TC005: Bikes Section Navigation
**Objective**: Verify user can navigate to Bikes section

**Steps**:
- Navigate to homepage
- Click on "Bikes" link
- Verify URL contains "bikes"
- Verify page displays bikes content

**Expected Result**: Successfully navigated to Bikes section

---

### TC006: Sign In Functionality
**Objective**: Verify Sign In button opens authentication dialog

**Steps**:
- Navigate to homepage
- Click on "Sign In" button
- Verify sign in modal/dialog appears
- Verify mobile number/email input field is visible

**Expected Result**: Sign In dialog opens successfully

---

### TC007: Car Search Functionality
**Objective**: Verify user can search for cars

**Steps**:
- Navigate to Used Cars section
- Locate search input field
- Verify search functionality is available
- Verify search filters (city, make, price) are accessible

**Expected Result**: Search functionality is working

---

### TC008: Car Listing Display
**Objective**: Verify car listings are displayed with essential information

**Steps**:
- Navigate to Used Cars section
- Wait for car listings to load
- Verify car cards/listings are visible
- Verify price, model, and other details are displayed

**Expected Result**: Car listings display correctly with all information

---

### TC009: Car Details Page
**Objective**: Verify user can view detailed car information

**Steps**:
- Navigate to Used Cars section
- Click on any car listing
- Verify car details page loads
- Verify URL contains car listing ID
- Verify car details (price, specifications, images) are visible

**Expected Result**: Car details page loads with complete information

---

### TC010: Filter Functionality
**Objective**: Verify user can filter cars by various criteria

**Steps**:
- Navigate to Used Cars section
- Verify filter options are available (City, Make/Brand, Price, Body Type)
- Verify popular brands (Toyota, Honda, Suzuki) are visible
- Verify city filters (Karachi, Lahore, Islamabad) are available
- Verify body type filters (Sedan, SUV, Hatchback) are accessible

**Expected Result**: All filter options are functional

---

## Running the Tests

### Run all PakWheels tests:
```bash
npm run test:preview -- tests/pakwheels
```

### Run specific test file:
```bash
npm run test:preview -- tests/pakwheels/pakwheels-homepage.spec.ts
```

### Run with Chrome browser (headed mode):
```bash
npm run test:headed:preview -- tests/pakwheels
```

### Run with Allure report:
```bash
npm run test:allure:preview -- tests/pakwheels
```

## Browser Configuration

All tests are configured to run in **Chrome browser** as specified. The configuration ensures Chrome is used:

```typescript
{
  name: 'chromium',
  use: { 
    ...devices['Desktop Chrome'],
    channel: 'chrome',
  },
}
```

## Test Features

- ✅ All tests use Gherkin/BDD step definitions for readability
- ✅ Automatic failure handling with screenshots and videos
- ✅ All steps logged to Allure reports
- ✅ Flexible selectors to handle dynamic content
- ✅ Proper wait strategies for element visibility
- ✅ Chrome browser configuration

## Additional Test Cases

The framework includes 30 total test cases (TC001-TC030) covering:
- Homepage functionality (TC001-TC010)
- Car search and filtering (TC011-TC020)
- User interactions and advanced features (TC021-TC030)

See individual test files for complete test coverage.
