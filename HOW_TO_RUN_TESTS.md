# How to Run Tests - Quick Guide

## 🎯 Running Tests in VS Code

### Method 1: Using Play Button (Recommended)

1. **Install Playwright Extension**:
   - Open VS Code
   - Go to Extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows)
   - Search for "Playwright Test for VSCode"
   - Install the extension by Microsoft

2. **Open Test File**:
   - Navigate to any test file (e.g., `tests/pakwheels/pakwheels-homepage.spec.ts`)
   - You'll see play buttons (▶️) next to:
     - Each `test.describe` block
     - Each individual `test` function
     - At the top of the file to run all tests

3. **Click the Play Button**:
   - Click the play button next to the test you want to run
   - Tests will run in the integrated terminal
   - Results will appear in the Playwright Test Explorer panel

### Method 2: Using Command Palette

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "Playwright: Run Tests"
3. Select the test file or test you want to run

### Method 3: Using Terminal Commands

```bash
# Run all tests
npm test

# Run PakWheels tests only
npm run test:preview -- tests/pakwheels

# Run specific test file
npm run test:preview -- tests/pakwheels/pakwheels-homepage.spec.ts

# Run in UI mode (interactive)
npm run test:ui:preview

# Run in headed mode (see browser)
npm run test:headed:preview

# Run with Allure report
npm run test:allure:preview
```

## 🎬 Playwright UI Mode (Interactive)

The best way to run and debug tests interactively:

```bash
npm run test:ui:preview
```

This opens Playwright's interactive UI where you can:
- See all tests in a sidebar
- Click to run individual tests
- Watch tests execute in real-time
- Debug tests step by step
- See screenshots and videos

## 🔍 Debugging Tests

### Option 1: Using VS Code Debugger
1. Set breakpoints in your test file
2. Press `F5` or go to Run > Start Debugging
3. Select "Debug Current Playwright Test"

### Option 2: Using Playwright Debug Mode
```bash
npm run test:debug:preview
```

This runs tests in debug mode with Playwright Inspector.

## 📊 Viewing Test Results

### Allure Reports
```bash
# Generate and open Allure report
npm run test:allure:preview

# Or separately
npm run test:preview
npm run allure:generate
npm run allure:open
```

### Playwright HTML Report
After running tests, open:
```
playwright-report/index.html
```

## 🎯 Running Specific Tests

### Run tests matching a pattern:
```bash
npm run test:preview -- -g "TC001"
```

### Run tests in a specific file:
```bash
npm run test:preview -- tests/pakwheels/pakwheels-homepage.spec.ts
```

### Run a specific test by name:
```bash
npm run test:preview -- -g "Verify homepage loads"
```

## 🚀 Quick Start Checklist

1. ✅ Install dependencies: `npm install`
2. ✅ Install Playwright browsers: `npx playwright install`
3. ✅ Install VS Code Playwright extension
4. ✅ Open a test file
5. ✅ Click the play button (▶️) next to any test
6. ✅ Watch the test run!

## 💡 Tips

- **Play Button Not Showing?**: Make sure the Playwright extension is installed and enabled
- **Tests Not Running?**: Check that `playwright.config.ts` is in the root directory
- **Browser Not Found?**: Run `npx playwright install chrome`
- **See Browser While Testing**: Use `npm run test:headed:preview`
- **Interactive Testing**: Use `npm run test:ui:preview` for the best experience

## 📝 VS Code Settings

The `.vscode/settings.json` file is already configured with:
- Playwright test runner settings
- Environment variables
- File exclusions

You should see play buttons automatically after installing the Playwright extension!
