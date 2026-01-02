# GitHub Pages Deployment Guide

This guide explains how to deploy the Storybook and test coverage reports to GitHub Pages.

## Overview

The project deploys two main resources to GitHub Pages:

1. **Storybook** - Interactive component demos at `/storybook/`
2. **Test Coverage** - Coverage reports at `/coverage/`
3. **Landing Page** - Main page with links to both at `/`

## Automated Deployment (Recommended)

The GitHub Actions workflow automatically deploys on every push to `main`:

### Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Source: "GitHub Actions"
   - This will use the workflow in `.github/workflows/deploy-pages.yml`

2. **Push to main branch**:
   ```bash
   git push origin main
   ```

3. **Wait for deployment** (2-3 minutes):
   - Check Actions tab for deployment status
   - Once complete, site will be live

### URLs

After deployment, your sites will be available at:

- **Landing Page**: `https://crashbytes.github.io/react-version-compare/`
- **Storybook**: `https://crashbytes.github.io/react-version-compare/storybook/`
- **Coverage**: `https://crashbytes.github.io/react-version-compare/coverage/`

## Manual Deployment

If you prefer to deploy manually:

### Quick Deploy (All in One)

```bash
# Run tests, build storybook, and deploy
npm run deploy:all
```

This single command:
1. Runs tests with coverage
2. Builds Storybook
3. Combines both into deployment directory
4. Deploys to GitHub Pages

### Individual Deployments

Deploy only Storybook:
```bash
npm run storybook:deploy
```

Deploy only coverage:
```bash
npm run coverage:deploy
```

### Step-by-Step Manual Process

```bash
# 1. Run tests with coverage
npm run test:coverage

# 2. Build Storybook
npm run build-storybook

# 3. Deploy combined
npm run deploy:combined
```

## Local Preview

Before deploying, preview locally:

### Storybook
```bash
npm run storybook
# Opens at http://localhost:6006
```

### Coverage Report
```bash
npm run coverage:report
# Generates report and opens in browser
```

## Deployment Structure

```
gh-pages branch
├── index.html           # Landing page
├── .nojekyll            # Bypass Jekyll processing
├── storybook/
│   └── index.html       # Storybook entry point
│   └── ...             # Storybook assets
└── coverage/
    └── index.html       # Coverage report entry
    └── ...             # Coverage assets
```

## Troubleshooting

### Deployment Fails

**Check GitHub Actions permissions:**
1. Settings > Actions > General
2. Workflow permissions: "Read and write permissions"
3. Allow GitHub Actions to create and approve pull requests: ✓

**Check Pages settings:**
1. Settings > Pages
2. Source: "GitHub Actions" (not "Deploy from branch")

### 404 Errors

**Clear GitHub Pages cache:**
1. Make a small change to any file
2. Push to main
3. Wait for new deployment

**Check .nojekyll file:**
- Ensure `.nojekyll` exists in gh-pages root
- This prevents Jekyll from processing paths with underscores

### Storybook Not Loading

**Check build output:**
```bash
npm run build-storybook
# Verify storybook-static directory is created
```

**Check for errors:**
- Look at GitHub Actions logs
- Check browser console for errors

### Coverage Not Updating

**Verify coverage generation:**
```bash
npm run test:coverage
# Check coverage/lcov-report/index.html exists
```

**Clear old coverage:**
```bash
rm -rf coverage
npm run test:coverage
```

## GitHub Actions Workflow

The workflow (`.github/workflows/deploy-pages.yml`) runs on:
- Every push to `main` branch
- Manual trigger (workflow_dispatch)

**Steps:**
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (`npm ci`)
4. Run tests with coverage
5. Build Storybook
6. Create deployment directory structure
7. Generate landing page
8. Deploy to GitHub Pages

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run storybook` | Start Storybook dev server (port 6006) |
| `npm run build-storybook` | Build Storybook for production |
| `npm run storybook:deploy` | Build and deploy Storybook only |
| `npm run test:coverage` | Run tests with coverage |
| `npm run coverage:report` | Generate and open coverage report |
| `npm run coverage:deploy` | Deploy coverage report only |
| `npm run deploy:all` | Run tests, build storybook, deploy combined |
| `npm run deploy:combined` | Deploy pre-built assets (uses script) |

## Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file to deployment:**
   ```bash
   echo "your-domain.com" > gh-pages-deploy/CNAME
   ```

2. **Configure DNS:**
   - Add CNAME record: `your-subdomain` → `crashbytes.github.io`
   - Or A records for apex domain (see GitHub docs)

3. **Update repository settings:**
   - Settings > Pages > Custom domain
   - Enter your domain
   - Enable "Enforce HTTPS"

## Continuous Deployment

The workflow ensures:
- ✅ Automated deployment on every push
- ✅ Tests must pass before deployment
- ✅ Consistent coverage metrics
- ✅ Always up-to-date Storybook
- ✅ No manual intervention needed

## Monitoring

**Check deployment status:**
- GitHub Actions tab shows workflow runs
- Green checkmark = successful deployment
- Red X = deployment failed (check logs)

**Verify live sites:**
- Landing page loads and shows correct stats
- Storybook loads and components work
- Coverage report displays correct metrics

## Best Practices

1. **Always run tests locally first:**
   ```bash
   npm test
   npm run test:coverage
   ```

2. **Preview Storybook before deploying:**
   ```bash
   npm run storybook
   ```

3. **Use automated deployment** for consistency

4. **Check Actions tab** after pushing to main

5. **Update stats in landing page** if metrics change significantly

## Updating the Landing Page

The landing page is auto-generated with hardcoded stats. To update:

**Option 1: Update GitHub Actions workflow**
Edit `.github/workflows/deploy-pages.yml` and modify the stats in the HTML.

**Option 2: Update deployment script**
Edit `scripts/deploy-gh-pages.js` and modify the `landingPage` template.

## Security Notes

- No sensitive data in coverage reports
- All tests run in CI before deployment
- Public access to Storybook and coverage
- No authentication required

## Support

If deployment issues persist:
1. Check GitHub Status page
2. Review Actions logs for errors
3. Verify repository permissions
4. Check gh-pages branch exists

## Quick Reference

```bash
# Full deployment workflow
npm run test:coverage    # Generate coverage
npm run build-storybook  # Build Storybook
npm run deploy:combined  # Deploy both

# Or use single command
npm run deploy:all       # Does all above steps
```

URLs after deployment:
- Main: https://crashbytes.github.io/react-version-compare/
- Storybook: https://crashbytes.github.io/react-version-compare/storybook/
- Coverage: https://crashbytes.github.io/react-version-compare/coverage/
