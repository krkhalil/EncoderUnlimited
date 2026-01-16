# Environment Configuration

This directory contains environment-specific configuration files for the automation framework.

## Available Environments

- **preview.json** - Preview/Development environment
- **staging.json** - Staging environment
- **production.json** - Production environment

## Configuration Structure

Each environment file contains:

```json
{
  "name": "environment-name",
  "baseURL": "https://example.com",
  "apiURL": "https://api.example.com",
  "timeout": 30000,
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

## Usage

### Setting Environment

1. **Via npm scripts** (recommended):
   ```bash
   npm run test:preview
   npm run test:staging
   npm run test:production
   ```

2. **Via environment variable**:
   ```bash
   ENV=staging npm test
   ```

3. **Via .env file**:
   Create a `.env` file in the config directory:
   ```
   ENV=staging
   ```

### Overriding Values

You can override specific values using environment variables:

```bash
ENV=staging BASE_URL=https://custom.example.com npm test
```

## Security Note

⚠️ **Important**: Never commit sensitive credentials to version control. Consider using environment variables or a secrets management system for production credentials.
