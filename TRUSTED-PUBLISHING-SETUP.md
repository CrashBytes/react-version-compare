# npm Trusted Publishing Setup Guide

This package uses **npm Trusted Publishing** (OIDC) for secure, token-free releases with cryptographic provenance.

## ✅ What We Have

**Package**: `@crashbytes/react-version-compare`  
**Version**: 1.0.4  
**Published**: 2026-01-14 06:02 UTC  
**Provenance**: https://search.sigstore.dev/?logIndex=820833331  
**GitHub Release**: https://github.com/CrashBytes/react-version-compare/releases/tag/v1.0.4

## 🔐 Security Features

- **No tokens required** - Uses OIDC authentication via GitHub Actions
- **Cryptographic provenance** - Every release includes verifiable supply chain attestation
- **Sigstore transparency** - All releases logged in public transparency log
- **Automated security** - Weekly audits, dependency updates, CodeQL scanning
- **React compatibility** - Automated testing against React 18 & 19

## 📋 npm Trusted Publisher Configuration

**Organization**: `CrashBytes` (case-sensitive!)  
**Repository**: `react-version-compare`  
**Workflow**: `release.yml`  
**Environment**: (blank/empty)

**⚠️ CRITICAL**: The Environment field MUST be blank unless using GitHub Environments!

## 🚀 Release Process

### Automated Tag-Based Releases

1. **Update version** in `package.json`:
   ```bash
   # Edit package.json, change version to 1.0.5
   ```

2. **Update CHANGELOG.md** with release notes

3. **Commit and tag**:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release v1.0.5"
   git tag v1.0.5
   ```

4. **Push** (triggers automatic release):
   ```bash
   git push origin main && git push origin v1.0.5
   ```

5. **Monitor workflow**:
   ```bash
   gh run list --workflow=release.yml --limit 1
   gh run watch <run-id>
   ```

### What Happens Automatically

When you push a tag (e.g., `v1.0.5`):

1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Upgrade npm to latest (≥ 11.5.1 for OIDC)4. ✅ Install dependencies
5. ✅ Build package
6. ✅ Run tests
7. ✅ Type check
8. ✅ **Publish to npm with provenance** (OIDC - no tokens!)
9. ✅ Create GitHub Release
10. ✅ Cryptographic attestation logged to Sigstore

**Total time**: ~45-60 seconds

## 🔍 Verifying Releases

### Check Package Version
```bash
npm view @crashbytes/react-version-compare version
```

### Verify Provenance
```bash
npm view @crashbytes/react-version-compare dist.integrity
```

### View on npm
https://www.npmjs.com/package/@crashbytes/react-version-compare

### View Sigstore Transparency Log
Each release includes a link like:
https://search.sigstore.dev/?logIndex=820833331

## 🛡️ Security Workflows

### 1. Security Audit (`.github/workflows/security-audit.yml`)
- **Trigger**: Push, PR, weekly schedule, manual
- **What it does**:
  - npm audit (all dependencies)
  - npm audit (production only)
  - CodeQL analysis (JavaScript + TypeScript)
  - Dependency review (PRs only)

### 2. React Compatibility (`.github/workflows/react-compat.yml`)
- **Trigger**: Push, PR, weekly schedule, manual
- **What it does**:
  - Test against React 18
  - Test against React 19
  - Validates peer dependency compatibility

### 3. Dependabot (`.github/dependabot.yml`)
- **Schedule**: Weekly (Mondays 9 AM UTC)
- **Groups dependencies** by type:
  - Production dependencies
  - Development dependencies
  - Testing dependencies (@testing-library, jest)
  - Build tools (rollup, typescript, vite)
- **Auto-assigns** PRs to MichaelEakins
## 🐛 Troubleshooting

### Error: `ENEEDAUTH`

**Symptoms**:
```
npm error code ENEEDAUTH
npm error need auth This command requires you to be logged in
```

**Causes & Solutions**:

1. **Wrong repository name** in npm config
   - ❌ Bad: `compare`
   - ✅ Good: `react-version-compare`

2. **Wrong workflow filename** in npm config
   - ❌ Bad: `publish.yml`
   - ✅ Good: `release.yml`

3. **Environment name not blank**
   - ❌ Bad: "main", "production", etc.
   - ✅ Good: (completely empty field)

4. **Wrong organization case**
   - ❌ Bad: `crashbytes`, `crashBytes`
   - ✅ Good: `CrashBytes` (exact case!)

5. **npm CLI too old**
   - Solution: Workflow automatically upgrades to latest npm (≥ 11.5.1)

6. **registry-url in workflow**
   - Solution: Remove `registry-url` from `setup-node` step
   - OIDC doesn't use .npmrc authentication

### Error: Workflow doesn't trigger

**Cause**: Tag not pushed or pushed before workflow existed

**Solution**:
```bash
# Delete and re-push tag
git push origin :refs/tags/v1.0.4
git push origin v1.0.4
```

### Error: Tests or build fail

**Cause**: Code issues preventing publish

**Solution**:
1. Run locally first:
   ```bash
   npm ci
   npm run build
   npm test
   npm run type-check
   ```
2. Fix issues
3. Commit and re-tag
## 📝 Release Workflow Configuration

### Key Workflow Features (`.github/workflows/release.yml`)

```yaml
on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write  # Create GitHub releases
  id-token: write  # OIDC authentication (REQUIRED!)
```

**Critical Permissions**:
- `id-token: write` - Required for npm Trusted Publishing (OIDC)
- `contents: write` - Needed to create GitHub releases

**What Makes It Work**:
1. **NO registry-url** in setup-node (prevents .npmrc conflicts)
2. **NO NODE_AUTH_TOKEN** environment variable
3. **npm >= 11.5.1** (automatically upgraded in workflow)
4. **--provenance flag** in npm publish command
5. **Triggered by tags** (not push to main)

### Workflow Steps Explained

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    # NO registry-url here!

- name: Upgrade npm for Trusted Publishing
  run: npm install -g npm@latest

- name: Publish to npm with Provenance
  run: npm publish --provenance --access public
  # OIDC happens automatically - no tokens needed!
```

## 🎯 Benefits Over Token-Based Publishing

| Feature | Token-Based | Trusted Publishing |
|---------|-------------|-------------------|
| **Token management** | Required | None |
| **Token rotation** | Manual | Automatic |
| **Token expiration** | 90 days | N/A |
| **Security risk** | High (token leak) | Low (OIDC) |
| **Provenance** | Optional | Included |
| **Supply chain** | Not verified | Cryptographically verified |
| **Transparency** | None | Public log |
| **Audit trail** | Limited | Complete |

## 📚 Resources

- **npm Provenance**: https://docs.npmjs.com/generating-provenance-statements
- **npm Trusted Publishing**: https://docs.npmjs.com/trusted-publishers/
- **GitHub OIDC**: https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect
- **Sigstore**: https://www.sigstore.dev/
## 🔒 Security Best Practices

1. **Never commit tokens** to repository
2. **Enable 2FA** on npm account
3. **Review Dependabot PRs** before merging
4. **Monitor security advisories** via GitHub Alerts
5. **Check CodeQL results** weekly
6. **Verify provenance** for published packages
7. **Keep dependencies updated** (Dependabot handles this)
8. **Run local tests** before tagging releases

## 📊 Monitoring & Badges

### Package Status

[![npm version](https://badge.fury.io/js/%40crashbytes%2Freact-version-compare.svg)](https://www.npmjs.com/package/@crashbytes/react-version-compare)
[![npm Audit](https://github.com/CrashBytes/react-version-compare/actions/workflows/security-audit.yml/badge.svg)](https://github.com/CrashBytes/react-version-compare/actions/workflows/security-audit.yml)
[![CodeQL](https://github.com/CrashBytes/react-version-compare/actions/workflows/security-audit.yml/badge.svg?branch=main)](https://github.com/CrashBytes/react-version-compare/security/code-scanning)
[![React 18](https://github.com/CrashBytes/react-version-compare/actions/workflows/react-compat.yml/badge.svg)](https://github.com/CrashBytes/react-version-compare/actions/workflows/react-compat.yml)
[![npm Provenance](https://img.shields.io/badge/provenance-sigstore-blue)](https://www.npmjs.com/package/@crashbytes/react-version-compare)

### Monitoring Commands

```bash
# Watch workflow runs
gh run list --limit 5

# View specific workflow
gh run view <run-id>

# Check security issues
gh api repos/CrashBytes/react-version-compare/vulnerability-alerts

# View Dependabot alerts
gh api repos/CrashBytes/react-version-compare/dependabot/alerts
```

## 🎓 Key Learnings

From our setup experience:

1. **Environment field MUST be blank** - Most common failure cause
2. **Case sensitivity matters** - Organization name must be exact
3. **Full repository name required** - Not abbreviated
4. **Workflow filename must match** - Exactly as in `.github/workflows/`
5. **npm CLI version critical** - Must be ≥ 11.5.1 for OIDC
6. **NO registry-url in workflow** - Causes .npmrc conflicts

## ✅ Setup Checklist

- [x] npm Trusted Publisher configured on npmjs.com
- [x] Organization: `CrashBytes` (exact case)
- [x] Repository: `react-version-compare` (full name)
- [x] Workflow: `release.yml` (exact filename)
- [x] Environment: (blank/empty)
- [x] Release workflow created (`.github/workflows/release.yml`)
- [x] Security audit workflow (`.github/workflows/security-audit.yml`)
- [x] React compatibility testing (`.github/workflows/react-compat.yml`)
- [x] Dependabot configuration (`.github/dependabot.yml`)
- [x] SECURITY.md policy document
- [x] README badges updated
- [x] First release tested (v1.0.4)
## 🚨 Migration Notes

### Old Workflow (Removed)

The previous `.github/workflows/publish.yml` workflow:
- ❌ Auto-bumped version on every push to main
- ❌ Required NPM_TOKEN secret
- ❌ No provenance generation
- ❌ No security infrastructure

### New Workflow (Current)

The new `.github/workflows/release.yml` workflow:
- ✅ Manual version control (update package.json)
- ✅ Tag-based releases (you control when)
- ✅ OIDC authentication (no tokens)
- ✅ Automatic provenance generation
- ✅ Complete security infrastructure

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/CrashBytes/react-version-compare/issues
- Security: security@crashbytes.com

---

**Last Updated**: 2026-01-14  
**Package**: @crashbytes/react-version-compare  
**Current Version**: 1.0.4  
**Status**: ✅ Production Ready