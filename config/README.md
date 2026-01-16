<div align="center">

# ⚙️ Environment Configuration

**Manage multiple environments with ease**

[Overview](#-overview) • [Configuration](#-configuration-structure) • [Usage](#-usage) • [Security](#-security)

</div>

---

## 📋 Overview

This directory contains **environment-specific configuration files** for the automation framework. Each environment has its own JSON file with settings tailored for that environment.

### 🌍 Available Environments

| Environment | File | Description |
|------------|------|-------------|
| **Preview** | `preview.json` | Development/Preview environment |
| **Staging** | `staging.json` | Staging environment for testing |
| **Production** | `production.json` | Production environment |

---

## 📝 Configuration Structure

Each environment file follows this structure:

```json
{
  "name": "environment-name",
  "baseURL": "https://example.com",
  "apiURL": "https://api.example.com",
  "timeout": 60000,
  "retries": 2,
  "workers": 1,
  "headless": true,
  "screenshot": "only-on-failure",
  "video": "retain-on-failure",
  "trace": "on-first-retry",
  "credentials": {
    "username": "user",
    "password": "password"
  },
  "features": {
    "enableDebugMode": false,
    "enableScreenshots": true,
    "enableVideos": true
  }
}
```

### 📊 Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Environment name (preview, staging, production) |
| `baseURL` | `string` | Base URL for the application |
| `apiURL` | `string` | API endpoint URL |
| `timeout` | `number` | Test timeout in milliseconds (default: 60000) |
| `retries` | `number` | Number of retries on failure |
| `workers` | `number` | Number of parallel workers |
| `headless` | `boolean` | Run browser in headless mode |
| `screenshot` | `string` | Screenshot capture mode |
| `video` | `string` | Video recording mode |
| `trace` | `string` | Trace capture mode |
| `credentials` | `object` | Environment-specific credentials |
| `features` | `object` | Feature flags and toggles |

---

## 🚀 Usage

> 💡 **Tip**: Click code blocks to copy commands, then paste into your terminal!

### Method 1: Using npm Scripts (Recommended)

```bash
# Preview environment
npm run test:preview
npm run test:headed:preview
npm run test:allure:preview

# Staging environment
npm run test:staging
npm run test:headed:staging
npm run test:allure:staging

# Production environment
npm run test:production
npm run test:headed:production
npm run test:allure:production
```

### Method 2: Using Environment Variable

```bash
# Set environment via ENV variable
ENV=staging npm test
ENV=production npm run test:headed
```

### Method 3: Using .env File

Create a `.env` file in the `config/` directory:

```env
ENV=staging
BASE_URL=https://staging.example.com
API_URL=https://api-staging.example.com
```

---

## 🔧 Overriding Values

You can override specific configuration values using environment variables:

```bash
# Override base URL
ENV=staging BASE_URL=https://custom.example.com npm test

# Override timeout
ENV=production TIMEOUT=60000 npm test

# Override multiple values
ENV=staging BASE_URL=https://custom.example.com TIMEOUT=90000 npm test
```

### Available Override Variables

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Override base URL |
| `API_URL` | Override API URL |
| `TIMEOUT` | Override timeout (milliseconds) |
| `RETRIES` | Override retry count |
| `WORKERS` | Override worker count |
| `HEADLESS` | Override headless mode (`true`/`false`) |
| `USERNAME` | Override username |
| `PASSWORD` | Override password |
| `API_KEY` | Override API key |

---

## 💻 Using in Code

### Get Environment Configuration

```typescript
import { EnvironmentLoader } from '../src/config/environment';

// Get current environment configuration
const config = EnvironmentLoader.getConfig();

// Get specific values
const baseURL = EnvironmentLoader.getBaseURL();
const apiURL = EnvironmentLoader.getAPIURL();
const credentials = EnvironmentLoader.getCredentials();

// Check feature flags
const isDebugEnabled = EnvironmentLoader.getFeatureFlag('enableDebugMode');
```

### Example Usage

```typescript
import { EnvironmentLoader } from '../src/config/environment';

test('example test', async ({ page }) => {
  const baseURL = EnvironmentLoader.getBaseURL();
  const credentials = EnvironmentLoader.getCredentials();
  
  await page.goto(baseURL);
  await page.fill('#username', credentials.username);
  await page.fill('#password', credentials.password);
});
```

---

## 🔒 Security

### ⚠️ Important Security Notes

1. **Never commit sensitive credentials** to version control
2. **Use environment variables** for production credentials
3. **Use secrets management** systems (e.g., AWS Secrets Manager, HashiCorp Vault)
4. **Rotate credentials** regularly
5. **Use different credentials** for each environment

### Best Practices

#### ✅ Recommended Approach

```bash
# Use environment variables for sensitive data
ENV=production \
  USERNAME=prod_user \
  PASSWORD=$(cat ~/.secrets/prod_password) \
  npm test
```

#### ❌ Avoid

```json
// Don't hardcode credentials in JSON files
{
  "credentials": {
    "username": "admin",
    "password": "secret123"  // ❌ Never do this!
  }
}
```

### Using .gitignore

Ensure sensitive files are in `.gitignore`:

```gitignore
# Environment files with secrets
config/.env
config/*.env
config/*.secret.json
```

---

## 📝 Updating Configuration

### Steps to Update

1. **Edit the JSON file** in `config/` directory for the desired environment
2. **Update values** like `baseURL`, `apiURL`, `credentials`, etc.
3. **Run tests** with the corresponding environment script

### Example: Updating Preview Environment

1. Open `config/preview.json`
2. Update `baseURL` to your preview URL
3. Save the file
4. Run: `npm run test:preview`

---

## 🔄 Environment Switching

### Quick Switch

```bash
# Switch to staging
ENV=staging npm test

# Switch to production
ENV=production npm test

# Switch back to preview (default)
npm test
```

### Verify Current Environment

The framework logs the current environment on startup:

```
✓ Loaded environment configuration: STAGING
  Base URL: https://staging.example.com
```

---

## 📚 Additional Resources

- [Main README](../README.md) - Framework documentation
- [Environment Loader](../src/config/environment.ts) - Source code

---

<div align="center">

**Configure with Confidence! ⚙️**

[⬆ Back to Top](#️-environment-configuration)

</div>
