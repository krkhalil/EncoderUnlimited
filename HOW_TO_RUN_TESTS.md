<div align="center">

# 🎯 How to Run Tests

**Quick Guide to Running Tests in VS Code and Terminal**

[VS Code](#-running-tests-in-vs-code) • [Terminal](#-terminal-commands) • [UI Mode](#-playwright-ui-mode-interactive) • [Debugging](#-debugging-tests)

</div>

---

## 🎬 Running Tests in VS Code

### Method 1: Using Play Button ⭐ (Recommended)

#### Step 1: Install Playwright Extension

1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows) to open Extensions
3. Search for **"Playwright Test for VSCode"**
4. Install the extension by **Microsoft**

#### Step 2: Open Test File

1. Navigate to any test file (e.g., `tests/pakwheels/pakwheels-homepage.spec.ts`)
2. You'll see **play buttons (▶️)** next to:
   - Each `test.describe` block
   - Each individual `test` function
   - At the top of the file to run all tests

#### Step 3: Click the Play Button

- Click the play button next to the test you want to run
- Tests will run in the integrated terminal
- Results will appear in the **Playwright Test Explorer** panel

### Method 2: Using Command Palette

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type **"Playwright: Run Tests"**
3. Select the test file or test you want to run

### Method 3: Right-Click Menu

1. Right-click on any test file or test function
2. Select **"Run Test"** or **"Debug Test"**

---

## 💻 Terminal Commands

> 💡 **Quick Tip**: Click on any code block to select the command, then copy (`Cmd+C` / `Ctrl+C`) and paste into your terminal!

### Basic Commands

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

### 📋 Copying Commands from This Document

**How to use commands from markdown files:**

1. **In VS Code**:
   - Click on the code block to select all text
   - Press `Cmd+C` (Mac) or `Ctrl+C` (Windows) to copy
   - Open terminal: `` Ctrl+` `` (backtick)
   - Paste: `Cmd+V` (Mac) or `Ctrl+V` (Windows)
   - Press `Enter` to execute

2. **On GitHub/GitLab**:
   - Click the copy icon (📋) that appears on hover over code blocks
   - Or select the command text manually
   - Paste into your terminal

3. **In Other Markdown Viewers**:
   - Select the command text manually
   - Copy and paste into terminal

> ⚠️ **Note**: Markdown files cannot execute commands directly. You need to copy and paste commands into a terminal.

### Running Specific Tests

```bash
# Run tests matching a pattern
npm run test:preview -- -g "TC001"

# Run tests in a specific file
npm run test:preview -- tests/pakwheels/pakwheels-homepage.spec.ts

# Run a specific test by name
npm run test:preview -- -g "Verify homepage loads"
```

### Environment-Specific Commands

| Environment | Command |
|------------|---------|
| **Preview** | `npm run test:preview` |
| **Staging** | `npm run test:staging` |
| **Production** | `npm run test:production` |

---

## 🎬 Playwright UI Mode (Interactive)

The **best way** to run and debug tests interactively:

```bash
npm run test:ui:preview
```

### Features

| Feature | Description |
|---------|-------------|
| 📋 **Test List** | See all tests in a sidebar |
| ▶️ **Run Tests** | Click to run individual tests |
| 👀 **Watch Mode** | Watch tests execute in real-time |
| 🐛 **Debug** | Debug tests step by step |
| 📸 **Screenshots** | See screenshots and videos |
| ⏱️ **Timeline** | View test execution timeline |

### What You Can Do

- ✅ Run individual tests with a single click
- ✅ Watch tests execute in real-time
- ✅ See browser actions as they happen
- ✅ Debug tests with breakpoints
- ✅ View screenshots and videos
- ✅ Filter tests by status
- ✅ Re-run failed tests

---

## 🐛 Debugging Tests

### Option 1: Using VS Code Debugger

1. **Set Breakpoints**: Click in the gutter next to line numbers
2. **Start Debugging**: 
   - Press `F5` OR
   - Go to **Run > Start Debugging** OR
   - Click the debug icon in the sidebar
3. **Select Configuration**: Choose **"Debug Current Playwright Test"**
4. **Debug**: Use debug controls to step through code

### Option 2: Using Playwright Debug Mode

```bash
npm run test:debug:preview
```

This runs tests in debug mode with **Playwright Inspector**:
- Step through test execution
- Inspect page state
- View console logs
- Take screenshots

### Option 3: Using UI Mode

```bash
npm run test:ui:preview
```

Then click the **debug icon** next to any test in the UI.

---

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

**Allure Report Features:**
- 📸 Screenshots and videos
- 📝 Detailed step-by-step logs
- 📈 Test history and trends
- 🏷️ Test categorization
- 🔍 Search and filter tests

### Playwright HTML Report

After running tests, open:

```
playwright-report/index.html
```

**Playwright Report Features:**
- 📊 Test summary
- 📸 Screenshots
- 🎥 Videos
- 📝 Test output
- 🔍 Test filtering

---

## 🚀 Quick Start Checklist

Follow these steps to get started:

- [ ] ✅ Install dependencies: `npm install`
- [ ] ✅ Install Playwright browsers: `npx playwright install`
- [ ] ✅ Install VS Code Playwright extension
- [ ] ✅ Open a test file (e.g., `tests/pakwheels/pakwheels-homepage.spec.ts`)
- [ ] ✅ Click the play button (▶️) next to any test
- [ ] ✅ Watch the test run!

---

## 💡 Tips & Troubleshooting

### Common Issues

<details>
<summary><b>Play Button Not Showing?</b></summary>

1. Make sure the Playwright extension is installed and enabled
2. Reload VS Code: `Cmd+Shift+P` → "Reload Window"
3. Check that `playwright.config.ts` is in the root directory
4. Verify Playwright is installed: `npx playwright --version`
</details>

<details>
<summary><b>Tests Not Running?</b></summary>

1. Check that `playwright.config.ts` is in the root directory
2. Verify test files are in the `tests/` directory
3. Check for syntax errors in test files
4. Ensure dependencies are installed: `npm install`
</details>

<details>
<summary><b>Browser Not Found?</b></summary>

1. Install browsers: `npx playwright install chrome`
2. Install all browsers: `npx playwright install`
3. Check browser path in VS Code settings
</details>

<details>
<summary><b>Want to See Browser While Testing?</b></summary>

Use headed mode:
```bash
npm run test:headed:preview
```

Or set in `playwright.config.ts`:
```typescript
use: {
  headless: false
}
```
</details>

<details>
<summary><b>Best Experience for Testing?</b></summary>

Use **UI Mode** for the best interactive experience:
```bash
npm run test:ui:preview
```

This gives you:
- Visual test execution
- Easy test selection
- Real-time debugging
- Screenshot/video viewing
</details>

---

## ⚙️ VS Code Settings

The `.vscode/settings.json` file is already configured with:

- ✅ Playwright test runner settings
- ✅ Environment variables
- ✅ File exclusions
- ✅ TypeScript settings

You should see play buttons automatically after installing the Playwright extension!

---

## 📚 Additional Resources

- [Playwright VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Playwright Documentation](https://playwright.dev)
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)

---

<div align="center">

**Happy Testing! 🎉**

[⬆ Back to Top](#-how-to-run-tests)

</div>
