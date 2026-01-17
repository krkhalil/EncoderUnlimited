#!/usr/bin/env node

/**
 * Secret Scanner Script
 * Scans codebase for sensitive information before commits/merges
 * 
 * Usage:
 *   node scripts/scan-secrets.js
 *   npm run scan:secrets
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Patterns to detect sensitive information
const SECRET_PATTERNS = [
  // API Keys
  {
    name: 'OpenAI API Key',
    pattern: /sk-[a-zA-Z0-9]{32,}/,
    severity: 'HIGH',
  },
  {
    name: 'AWS Access Key',
    pattern: /AKIA[0-9A-Z]{16}/,
    severity: 'HIGH',
  },
  {
    name: 'AWS Secret Key',
    pattern: /aws_secret_access_key\s*=\s*['"]([^'"]+)['"]/i,
    severity: 'HIGH',
  },
  {
    name: 'GitHub Personal Access Token',
    pattern: /ghp_[a-zA-Z0-9]{36}/,
    severity: 'HIGH',
  },
  {
    name: 'Google API Key',
    pattern: /AIza[0-9A-Za-z-_]{35}/,
    severity: 'HIGH',
  },
  {
    name: 'Slack Token',
    pattern: /xox[baprs]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]{32}/,
    severity: 'HIGH',
  },
  {
    name: 'Stripe API Key',
    pattern: /sk_live_[0-9a-zA-Z]{24,}/,
    severity: 'HIGH',
  },
  {
    name: 'Stripe Publishable Key',
    pattern: /pk_live_[0-9a-zA-Z]{24,}/,
    severity: 'MEDIUM',
  },
  {
    name: 'Generic API Key',
    pattern: /api[_-]?key\s*[:=]\s*['"]?([a-zA-Z0-9_\-]{20,})['"]?/i,
    severity: 'MEDIUM',
  },
  {
    name: 'Access Token',
    pattern: /access[_-]?token\s*[:=]\s*['"]?([a-zA-Z0-9_\-]{20,})['"]?/i,
    severity: 'HIGH',
  },
  // Passwords
  {
    name: 'Hardcoded Password',
    pattern: /password\s*[:=]\s*['"](?!.*(?:example|test|demo|placeholder|dummy|fake|sample|preview|staging|prod_user|staging_user|preview_user))([^'"]{8,})['"]/i,
    severity: 'HIGH',
    excludePatterns: [
      /password123/,
      /testpassword/,
      /examplepassword/,
      /preview_password/,
      /staging_password/,
      /prod_password/,
      /dummy_password/,
      /sample_password/,
    ],
  },
  {
    name: 'Database Password',
    pattern: /(?:db|database)[_-]?password\s*[:=]\s*['"]([^'"]+)['"]/i,
    severity: 'HIGH',
  },
  // Credentials
  {
    name: 'Private Key',
    pattern: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----/,
    severity: 'CRITICAL',
  },
  {
    name: 'SSH Private Key',
    pattern: /-----BEGIN\s+(?:DSA|EC|OPENSSH)\s+PRIVATE\s+KEY-----/,
    severity: 'CRITICAL',
  },
  {
    name: 'Bearer Token',
    pattern: /bearer\s+([a-zA-Z0-9_\-\.]{20,})/i,
    severity: 'HIGH',
  },
  // Personal Information
  {
    name: 'Email Address (Potential)',
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    severity: 'LOW',
    excludePatterns: [
      /@example\.com/,
      /@test\.com/,
      /@localhost/,
      /@domain\.com/,
      /user@example\.com/,
      /admin@example\.com/,
      /test@example\.com/,
    ],
  },
  // URLs with credentials
  {
    name: 'URL with Credentials',
    pattern: /https?:\/\/([^:]+):([^@]+)@/,
    severity: 'HIGH',
  },
];

// Files and directories to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /\.next/,
  /\.cache/,
  /allure-results/,
  /allure-report/,
  /test-results/,
  /playwright-report/,
  /package-lock\.json/,
  /yarn\.lock/,
  /\.log$/,
  /\.env\.example/,
];

// Documentation files that may contain example secrets (exclude from scanning)
const DOCUMENTATION_FILES = [
  /SECURITY_AUDIT_REPORT\.md/,
  /SECURITY_SETUP\.md/,
  /README\.md/,
  /HOW_TO_RUN_TESTS\.md/,
  /config\/README\.md/,
];

// Files to always scan (even if in exclude patterns)
const ALWAYS_SCAN = [
  /\.env$/,
  /\.env\.local$/,
  /config\/.*\.json$/,
  /\.config\.js$/,
  /\.config\.ts$/,
];

/**
 * Check if file should be excluded
 */
function shouldExcludeFile(filePath) {
  // Always scan certain files (even if in documentation)
  if (ALWAYS_SCAN.some(pattern => pattern.test(filePath))) {
    return false;
  }
  
  // Exclude documentation files (they may contain examples)
  if (DOCUMENTATION_FILES.some(pattern => pattern.test(filePath))) {
    return true;
  }
  
  // Check exclude patterns
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

/**
 * Scan a single file for secrets
 */
function scanFile(filePath) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    SECRET_PATTERNS.forEach(({ name, pattern, severity, excludePatterns }) => {
      lines.forEach((line, lineNumber) => {
        const matches = line.match(pattern);
        
        if (matches) {
          // Check if this should be excluded
          if (excludePatterns) {
            const shouldExclude = excludePatterns.some(excludePattern => 
              excludePattern.test(line)
            );
            if (shouldExclude) {
              return;
            }
          }
          
          // Additional checks for false positives
          if (name === 'Email Address (Potential)') {
            if (line.includes('example') || line.includes('test') || line.includes('sample')) {
              return;
            }
          }
          
          // Skip if line contains common documentation keywords
          if (line.match(/(?:example|test|demo|placeholder|dummy|fake|sample|tutorial|guide|documentation)/i)) {
            // But still flag if it looks like a real secret
            if (!line.match(/sk-[a-zA-Z0-9]{32,}/) && !line.match(/AKIA[0-9A-Z]{16}/)) {
              return;
            }
          }
          
          issues.push({
            file: filePath,
            line: lineNumber + 1,
            pattern: name,
            severity,
            snippet: line.trim().substring(0, 100),
          });
        }
      });
    });
  } catch (error) {
    // Skip binary files or files that can't be read
    if (error.code !== 'EISDIR') {
      console.warn(`Warning: Could not read ${filePath}: ${error.message}`);
    }
  }
  
  return issues;
}

/**
 * Get all files to scan
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!shouldExcludeFile(filePath)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      if (!shouldExcludeFile(filePath)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

/**
 * Main scanning function
 */
function scanCodebase() {
  console.log(`${colors.blue}🔍 Scanning codebase for sensitive information...${colors.reset}\n`);
  
  const rootDir = path.resolve(__dirname, '..');
  const files = getAllFiles(rootDir);
  
  console.log(`Scanning ${files.length} files...\n`);
  
  const allIssues = [];
  
  files.forEach(file => {
    const issues = scanFile(file);
    allIssues.push(...issues);
  });
  
  // Group issues by severity
  const critical = allIssues.filter(i => i.severity === 'CRITICAL');
  const high = allIssues.filter(i => i.severity === 'HIGH');
  const medium = allIssues.filter(i => i.severity === 'MEDIUM');
  const low = allIssues.filter(i => i.severity === 'LOW');
  
  // Print results
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}           SECRET SCAN RESULTS${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  if (allIssues.length === 0) {
    console.log(`${colors.green}✅ No sensitive information detected!${colors.reset}\n`);
    return 0;
  }
  
  // Print issues by severity
  if (critical.length > 0) {
    console.log(`${colors.red}🚨 CRITICAL ISSUES (${critical.length}):${colors.reset}`);
    critical.forEach(issue => {
      console.log(`\n  ${colors.red}File:${colors.reset} ${issue.file}:${issue.line}`);
      console.log(`  ${colors.red}Type:${colors.reset} ${issue.pattern}`);
      console.log(`  ${colors.red}Snippet:${colors.reset} ${issue.snippet}`);
    });
    console.log('');
  }
  
  if (high.length > 0) {
    console.log(`${colors.red}⚠️  HIGH SEVERITY ISSUES (${high.length}):${colors.reset}`);
    high.forEach(issue => {
      console.log(`\n  ${colors.red}File:${colors.reset} ${issue.file}:${issue.line}`);
      console.log(`  ${colors.red}Type:${colors.reset} ${issue.pattern}`);
      console.log(`  ${colors.red}Snippet:${colors.reset} ${issue.snippet}`);
    });
    console.log('');
  }
  
  if (medium.length > 0) {
    console.log(`${colors.yellow}⚠️  MEDIUM SEVERITY ISSUES (${medium.length}):${colors.reset}`);
    medium.forEach(issue => {
      console.log(`\n  ${colors.yellow}File:${colors.reset} ${issue.file}:${issue.line}`);
      console.log(`  ${colors.yellow}Type:${colors.reset} ${issue.pattern}`);
      console.log(`  ${colors.yellow}Snippet:${colors.reset} ${issue.snippet}`);
    });
    console.log('');
  }
  
  if (low.length > 0) {
    console.log(`${colors.blue}ℹ️  LOW SEVERITY ISSUES (${low.length}):${colors.reset}`);
    low.forEach(issue => {
      console.log(`\n  ${colors.blue}File:${colors.reset} ${issue.file}:${issue.line}`);
      console.log(`  ${colors.blue}Type:${colors.reset} ${issue.pattern}`);
      console.log(`  ${colors.blue}Snippet:${colors.reset} ${issue.snippet}`);
    });
    console.log('');
  }
  
  // Summary
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}                    SUMMARY${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`Total Issues Found: ${allIssues.length}`);
  console.log(`  ${colors.red}Critical: ${critical.length}${colors.reset}`);
  console.log(`  ${colors.red}High: ${high.length}${colors.reset}`);
  console.log(`  ${colors.yellow}Medium: ${medium.length}${colors.reset}`);
  console.log(`  ${colors.blue}Low: ${low.length}${colors.reset}\n`);
  
  // Determine exit code
  const blockingIssues = critical.length + high.length;
  
  if (blockingIssues > 0) {
    console.log(`${colors.red}❌ BLOCKING: ${blockingIssues} critical/high severity issues found!${colors.reset}`);
    console.log(`${colors.red}   Commit/merge blocked. Please remove sensitive information.${colors.reset}\n`);
    return 1;
  } else {
    console.log(`${colors.yellow}⚠️  Non-blocking issues found. Review recommended.${colors.reset}\n`);
    return 0;
  }
}

// Run the scan
if (require.main === module) {
  const exitCode = scanCodebase();
  process.exit(exitCode);
}

module.exports = { scanCodebase };
