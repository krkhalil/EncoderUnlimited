# 🛡️ Branch Protection Setup Guide

**Require 2 approvals before merging to main branch**

This guide explains how to set up branch protection rules to require at least 2 approvals before any PR can be merged to the main branch.

---

## 🎯 Overview

With branch protection enabled:
- ✅ All PRs to main require **2 approvals**
- ✅ PRs cannot be merged without approvals
- ✅ Direct pushes to main are blocked
- ✅ CI/CD checks must pass
- ✅ Secret scanning must pass

---

## 🚀 Setup Instructions

### Option 1: GitHub (Recommended)

#### Step 1: Navigate to Repository Settings

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Branches** in the left sidebar

#### Step 2: Add Branch Protection Rule

1. Under **Branch protection rules**, click **Add rule**
2. In **Branch name pattern**, enter: `main` (or `master`)
3. Configure the following settings:

#### Step 3: Configure Protection Settings

**✅ Required Settings:**

1. **Require a pull request before merging**
   - ✅ Check this box
   - ✅ Require approvals: **2**
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (optional)

2. **Require status checks to pass before merging**
   - ✅ Check this box
   - Select required checks:
     - ✅ `Secret Scan`
     - ✅ `PR Approval Check`
     - ✅ Any other CI checks you have

3. **Require conversation resolution before merging**
   - ✅ Check this box (recommended)

4. **Require signed commits** (optional but recommended)
   - ✅ Check this box for additional security

5. **Do not allow bypassing the above settings**
   - ✅ Check this box
   - Select: **Restrict pushes that create files larger than 100 MB**

6. **Restrict who can push to matching branches**
   - ✅ Check this box
   - Add specific users/teams (optional)

7. **Allow force pushes** (⚠️ **UNCHECK THIS**)
   - ❌ Leave unchecked

8. **Allow deletions** (⚠️ **UNCHECK THIS**)
   - ❌ Leave unchecked

#### Step 4: Save Settings

Click **Create** or **Save changes**

---

### Option 2: GitLab

#### Step 1: Navigate to Repository Settings

1. Go to your GitLab project
2. Click **Settings** → **Repository**
3. Expand **Protected branches**

#### Step 2: Protect Main Branch

1. Find `main` (or `master`) branch
2. Click **Expand**
3. Set **Allowed to merge**: **Developers + Maintainers**
4. Set **Allowed to push**: **No one** (or **Maintainers only**)
5. Set **Required approvals**: **2**

#### Step 3: Configure Merge Request Settings

1. Go to **Settings** → **Merge requests**
2. Under **Merge checks**:
   - ✅ Require approvals: **2**
   - ✅ Prevent approval by author
   - ✅ Prevent approval by committer

---

### Option 3: Bitbucket

#### Step 1: Navigate to Repository Settings

1. Go to your Bitbucket repository
2. Click **Repository settings**
3. Click **Branch permissions**

#### Step 2: Add Branch Permission

1. Click **Add a restriction**
2. Select branch: `main` or `master`
3. Under **Restrictions**:
   - ✅ **Require pull request**
   - ✅ **Require approvals**: **2**
   - ✅ **Require passing builds**

---

## ✅ Verification

### Test the Protection

1. **Create a test branch**:
   ```bash
   git checkout -b test-branch-protection
   ```

2. **Make a change**:
   ```bash
   echo "test" >> test.txt
   git add test.txt
   git commit -m "Test branch protection"
   git push origin test-branch-protection
   ```

3. **Create a PR** to main branch

4. **Try to merge without approvals**:
   - You should see: "Merging is blocked"
   - Message: "2 reviews required"

5. **Get 2 approvals**:
   - Have 2 team members approve the PR
   - Now merging should be allowed

---

## 🔧 GitHub Actions Workflow

A GitHub Actions workflow has been created at:
`.github/workflows/pr-approval-check.yml`

This workflow:
- ✅ Runs on every PR to main
- ✅ Checks for at least 2 approvals
- ✅ Fails if requirements not met
- ✅ Comments on PR with status

**Note**: This is a backup check. GitHub's native branch protection is the primary enforcement.

---

## 📋 Configuration Summary

### What's Protected

| Setting | Value |
|---------|-------|
| **Branch** | `main` (or `master`) |
| **Required Approvals** | **2** |
| **Allow Force Push** | ❌ No |
| **Allow Deletions** | ❌ No |
| **Require Status Checks** | ✅ Yes |
| **Require Secret Scan** | ✅ Yes |
| **Require PR Approval Check** | ✅ Yes |

---

## 🎯 Best Practices

### ✅ DO

- Require approvals from different team members
- Use CODEOWNERS file for automatic reviewers
- Require CI/CD checks to pass
- Enable "Dismiss stale approvals"
- Require conversation resolution

### ❌ DON'T

- Allow force pushes to main
- Allow branch deletion
- Bypass protection rules
- Allow self-approval (if possible)

---

## 🔄 Updating Requirements

### Change Number of Approvals

1. Go to **Settings** → **Branches**
2. Edit the branch protection rule
3. Change **Required approvals** to desired number
4. Save changes

### Add CODEOWNERS

Create `.github/CODEOWNERS` file:

```
# Require 2 approvals from these teams
* @team-leads @senior-developers

# Specific files require specific reviewers
/src/config/*.json @security-team
```

---

## 🐛 Troubleshooting

### PR Can't Be Merged

**Issue**: "Merging is blocked"

**Solutions**:
1. ✅ Ensure 2 approvals are present
2. ✅ Check all CI/CD checks pass
3. ✅ Resolve any conversations
4. ✅ Check branch is up to date

### Approval Not Counting

**Issue**: Approval doesn't count toward requirement

**Solutions**:
1. ✅ Ensure reviewer is not the PR author
2. ✅ Check reviewer has appropriate permissions
3. ✅ Verify approval is not dismissed
4. ✅ Ensure approval is on latest commit

### Workflow Not Running

**Issue**: GitHub Actions workflow not triggering

**Solutions**:
1. ✅ Check workflow file is in `.github/workflows/`
2. ✅ Verify branch name matches (main/master)
3. ✅ Check workflow file syntax
4. ✅ Ensure GitHub Actions is enabled

---

## 📚 Additional Resources

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitLab Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html)
- [Bitbucket Branch Permissions](https://support.atlassian.com/bitbucket-cloud/docs/branch-permissions/)

---

## ✅ Quick Checklist

- [ ] Branch protection rule created
- [ ] Required approvals set to 2
- [ ] Status checks required
- [ ] Force push disabled
- [ ] Branch deletion disabled
- [ ] Test PR created and verified
- [ ] Team notified of new requirements

---

<div align="center">

**Branch Protection Active** 🛡️

*Last Updated: Auto-generated*

</div>
