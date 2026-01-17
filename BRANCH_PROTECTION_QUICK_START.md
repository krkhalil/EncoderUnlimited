# 🚀 Branch Protection Quick Start

**Require 2 approvals before merging to main - 5 minute setup**

---

## ⚡ Quick Setup (GitHub)

### Step 1: Go to Settings
1. Open your GitHub repository
2. Click **Settings** → **Branches**

### Step 2: Add Protection Rule
1. Click **Add rule**
2. Branch name: `main` (or `master`)

### Step 3: Enable These Settings

✅ **Check these boxes:**

- [x] **Require a pull request before merging**
  - Set: **2** approvals required
  - [x] Dismiss stale approvals
  - [x] Require review from Code Owners

- [x] **Require status checks to pass before merging**
  - Select: `Secret Scan`
  - Select: `PR Approval Check`

- [x] **Require conversation resolution before merging**

- [x] **Do not allow bypassing the above settings**

❌ **Uncheck these:**

- [ ] Allow force pushes
- [ ] Allow deletions

### Step 4: Save
Click **Create** or **Save changes**

---

## ✅ Done!

Now:
- ✅ All PRs to main require **2 approvals**
- ✅ Direct pushes to main are **blocked**
- ✅ CI/CD checks must **pass**
- ✅ Secret scanning must **pass**

---

## 🧪 Test It

1. Create a test branch
2. Make a change
3. Create PR to main
4. Try to merge → Should be **blocked**
5. Get 2 approvals → Can now **merge**

---

## 📚 Full Documentation

See `BRANCH_PROTECTION_SETUP.md` for:
- Detailed instructions
- GitLab/Bitbucket setup
- Troubleshooting
- Advanced configuration

---

<div align="center">

**Protection Active in 5 Minutes!** ⚡

</div>
