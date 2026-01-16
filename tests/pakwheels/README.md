# PakWheels Test Cases

This directory contains UI test cases for PakWheels website (https://www.pakwheels.com/).

## Test Cases Overview

### Homepage Tests (TC001-TC010)
- **TC001**: Verify homepage loads with all main elements
- **TC002**: Verify navigation menu items are visible and clickable
- **TC003**: Verify search functionality for used cars
- **TC004**: Verify user can navigate to Used Cars section
- **TC005**: Verify user can navigate to New Cars section
- **TC006**: Verify user can navigate to Bikes section
- **TC007**: Verify Sign In button is visible and clickable
- **TC008**: Verify Sign Up button is visible and clickable
- **TC009**: Verify Post an Ad button is visible
- **TC010**: Verify featured cars section is displayed on homepage

### Car Search Tests (TC011-TC020)
- **TC011**: Verify user can search for cars by city
- **TC012**: Verify user can filter cars by make/brand
- **TC013**: Verify user can filter cars by price range
- **TC014**: Verify car listing cards display essential information
- **TC015**: Verify user can click on a car listing to view details
- **TC016**: Verify user can sort car listings
- **TC017**: Verify popular car models are displayed
- **TC018**: Verify user can navigate to car reviews section
- **TC019**: Verify user can access car comparisons
- **TC020**: Verify user can filter by car body type

### User Interaction Tests (TC021-TC030)
- **TC021**: Verify user can open Sign In modal/dialog
- **TC022**: Verify user can access Forums section
- **TC023**: Verify user can access Videos section
- **TC024**: Verify user can access Auto Store section
- **TC025**: Verify user can access Blog section
- **TC026**: Verify mobile app download section is visible
- **TC027**: Verify user can view popular cities for car listings
- **TC028**: Verify footer links are accessible
- **TC029**: Verify user can view featured used cars
- **TC030**: Verify user can access car price calculator

## Running Tests

### Run all PakWheels tests:
```bash
npm run test:preview -- tests/pakwheels
```

### Run specific test file:
```bash
npm run test:preview -- tests/pakwheels/pakwheels-homepage.spec.ts
```

### Run with Allure report:
```bash
npm run test:allure:preview -- tests/pakwheels
```

## Browser Configuration

All tests are configured to run in Chrome browser by default. The configuration is set in `playwright.config.ts`:

```typescript
{
  name: 'chromium',
  use: { 
    ...devices['Desktop Chrome'],
    channel: 'chrome',
  },
}
```

## Test Structure

Each test follows the Gherkin/BDD pattern:
- **Given**: Setup and initial state
- **When**: Actions performed
- **Then**: Assertions and validations

All tests include automatic failure handling with screenshots and videos attached to Allure reports.

## Notes

- Tests use flexible selectors to handle dynamic content
- All tests wait for elements to be visible before interaction
- Failure artifacts (screenshots, videos) are automatically captured
- All steps are logged to Allure reports for traceability
