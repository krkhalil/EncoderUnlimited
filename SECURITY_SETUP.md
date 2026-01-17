# 🔒 Security Setup Guide

**Protect your codebase from accidentally committing sensitive information**

This guide explains how to set up automatic scanning to prevent sensitive data from being committed to your repository.

---

## 🎯 Overview

The security system includes **three layers of protection**:

1. **Pre-commit Hook** - Blocks commits locally if secrets are detected
2. **GitHub Actions** - Blocks merges to main branch if secrets are detected
3. **Manual Scanning** - Run scans anytime with `npm run scan:secrets`

---

## 🚀 Quick Setup

### Step 1: Install Dependencies (Optional - for Husky)

If you want to use Husky for pre-commit hooks:

```bash
npm install --save-dev husky
npx husky install
```

**Note**: The basic Git hook will work without Husky too!

### Step 2: Make Scripts Executable

```bash
# Make the secret scanner executable
chmod +x scripts/scan-secrets.js

# Make the Git hook executable
chmod +x .git/hooks/pre-commit
```

### Step 3: Test the Scanner

```bash
# Run the scanner manually
npm run scan:secrets
```

You should see:
```
✅ No sensitive information detected!
```

---

## 🛡️ How It Works

### Layer 1: Pre-Commit Hook

**Location**: `.git/hooks/pre-commit`

**What it does**:
- Automatically runs before every `git commit`
- Scans all files being committed
- **Blocks the commit** if sensitive information is found
- Shows detailed error messages

**Example output when blocked**:
```
🔍 Running secret scanner before commit...
❌ COMMIT BLOCKED: Sensitive information detected!
   Please remove sensitive data before committing.
```

### Layer 2: GitHub Actions (CI/CD)

**Location**: `.github/workflows/secret-scan.yml`

**What it does**:
- Automatically runs on:
  - Pushes to `main`, `master`, or `develop` branches
  - Pull requests to `main`, `master`, or `develop` branches
- **Blocks the merge** if secrets are detected
- Prevents sensitive data from reaching the main branch

**When it runs**:
- ✅ Every push to main branch
- ✅ Every pull request
- ✅ Every merge attempt

### Layer 3: Manual Scanning

**Command**: `npm run scan:secrets`

**What it does**:
- Scans entire codebase
- Shows detailed report of any issues
- Returns exit code 0 (success) or 1 (failure)

---

## 🔍 What Gets Detected

The scanner looks for:

### 🔴 Critical Severity
- Private keys (RSA, SSH, etc.)
- Database passwords
- API keys with high value

### ⚠️ High Severity
- API keys (OpenAI, AWS, GitHub, Google, etc.)
- Access tokens
- Bearer tokens
- Hardcoded passwords (non-placeholder)
- URLs with embedded credentials

### 🟡 Medium Severity
- Generic API keys
- Publishable keys (Stripe, etc.)

### 🔵 Low Severity
- Potential email addresses (non-example)

---

## 📋 Excluded Patterns

The scanner **automatically ignores**:

- `node_modules/`
- `.git/`
- `dist/`, `build/`, `coverage/`
- Test result directories
- Log files
- Lock files (`package-lock.json`, `yarn.lock`)

**But always scans**:
- `.env` files
- `config/*.json` files
- Configuration files

---

## 🎯 Usage Examples

### Run Manual Scan

```bash
# Scan entire codebase
npm run scan:secrets
```

### Test Before Committing

```bash
# Stage your changes
git add .

# Try to commit (scanner runs automatically)
git commit -m "Your commit message"

# If blocked, fix issues and try again
```

### Bypass Hook (Not Recommended)

If you **absolutely must** bypass the hook (emergency only):

```bash
git commit --no-verify -m "Your message"
```

⚠️ **Warning**: Only use this if you're 100% sure there are no secrets!

---

## 🔧 Configuration

### Customize Patterns

Edit `scripts/scan-secrets.js` to:
- Add new secret patterns
- Modify severity levels
- Change exclude patterns

### Adjust Severity Levels

In `scripts/scan-secrets.js`, modify the `SECRET_PATTERNS` array:

```javascript
{
  name: 'Your Pattern Name',
  pattern: /your-regex-pattern/,
  severity: 'HIGH', // CRITICAL, HIGH, MEDIUM, or LOW
}
```

### Change What Blocks Commits

In `scripts/scan-secrets.js`, modify the exit logic:

```javascript
// Currently blocks on CRITICAL + HIGH
const blockingIssues = critical.length + high.length;
```

---

## 🐛 Troubleshooting

### Hook Not Running?

1. **Check if hook is executable**:
   ```bash
   ls -la .git/hooks/pre-commit
   ```
   Should show `-rwxr-xr-x` (executable)

2. **Make it executable**:
   ```bash
   chmod +x .git/hooks/pre-commit
   ```

3. **Test manually**:
   ```bash
   .git/hooks/pre-commit
   ```

### False Positives?

If the scanner flags something that's not actually sensitive:

1. **Add to exclude patterns** in `scripts/scan-secrets.js`
2. **Use placeholder values** that match the exclude patterns
3. **Move to `.env` file** (already excluded from scanning)

### GitHub Actions Not Running?

1. **Check workflow file exists**: `.github/workflows/secret-scan.yml`
2. **Check branch name**: Workflow triggers on `main`, `master`, `develop`
3. **Check GitHub Actions tab**: View workflow runs in GitHub

---

## 📝 Best Practices

### ✅ DO

- Run `npm run scan:secrets` before pushing
- Use environment variables for secrets
- Add `.env` files to `.gitignore`
- Use placeholder values in config files
- Review scanner output regularly

### ❌ DON'T

- Bypass hooks with `--no-verify` unless absolutely necessary
- Commit real credentials "just for testing"
- Hardcode API keys in source code
- Commit `.env` files with real values

---

## 🔄 Updating the Scanner

To update the secret scanner:

1. Edit `scripts/scan-secrets.js`
2. Test with `npm run scan:secrets`
3. Commit the changes

The updated scanner will automatically be used in all hooks and CI/CD.

---

## 📚 Additional Resources

- [OWASP Secrets Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_cryptographic_key)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

---

## ✅ Verification

After setup, verify everything works:

```bash
# 1. Test manual scan
npm run scan:secrets
# Should show: ✅ No sensitive information detected!

# 2. Test pre-commit hook
git add .
git commit -m "Test commit"
# Should show: ✅ Secret scan passed. Proceeding with commit...

# 3. Test with a fake secret (for testing)
echo 'api_key = "sk-test123456789012345678901234567890"' > test-secret.txt
git add test-secret.txt
git commit -m "Test with secret"
# Should BLOCK the commit

# 4. Clean up
rm test-secret.txt
git reset HEAD test-secret.txt
```

---

<div align="center">

**Your codebase is now protected! 🔒**

*Last Updated: Auto-generated*

</div>
