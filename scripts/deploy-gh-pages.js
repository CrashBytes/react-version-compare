#!/usr/bin/env node

/**
 * Deploy script for GitHub Pages
 * Combines Storybook and test coverage into a single deployment
 * 
 * Directory structure on gh-pages branch:
 * /                    - Landing page with links
 * /storybook/          - Interactive component demos
 * /coverage/           - Test coverage reports
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const DEPLOY_DIR = path.join(ROOT_DIR, 'gh-pages-deploy');
const STORYBOOK_DIR = path.join(ROOT_DIR, 'storybook-static');
const COVERAGE_DIR = path.join(ROOT_DIR, 'coverage', 'lcov-report');

console.log('🚀 Starting GitHub Pages deployment...\n');

// Step 1: Clean up previous deployment directory
console.log('📁 Cleaning deployment directory...');
if (fs.existsSync(DEPLOY_DIR)) {
  fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEPLOY_DIR, { recursive: true });

// Step 2: Copy Storybook build
console.log('📚 Copying Storybook build...');
if (!fs.existsSync(STORYBOOK_DIR)) {
  console.error('❌ Error: Storybook build not found. Run "npm run build-storybook" first.');
  process.exit(1);
}
execSync(`cp -r "${STORYBOOK_DIR}" "${path.join(DEPLOY_DIR, 'storybook')}"`, { stdio: 'inherit' });

// Step 3: Copy coverage report
console.log('📊 Copying coverage report...');
if (!fs.existsSync(COVERAGE_DIR)) {
  console.error('❌ Error: Coverage report not found. Run "npm run test:coverage" first.');
  process.exit(1);
}
execSync(`cp -r "${COVERAGE_DIR}" "${path.join(DEPLOY_DIR, 'coverage')}"`, { stdio: 'inherit' });

// Step 4: Create landing page
console.log('🏠 Creating landing page...');
const landingPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Version Compare - Documentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 60px 40px;
      max-width: 800px;
      width: 100%;
    }
    
    h1 {
      color: #667eea;
      font-size: 3em;
      margin-bottom: 10px;
      text-align: center;
    }
    
    .subtitle {
      text-align: center;
      color: #666;
      font-size: 1.2em;
      margin-bottom: 40px;
    }
    
    .description {
      text-align: center;
      color: #555;
      margin-bottom: 50px;
      font-size: 1.1em;
      line-height: 1.8;
    }
    
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 30px;
      text-decoration: none;
      color: white;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }
    
    .card-icon {
      font-size: 3em;
      margin-bottom: 15px;
      display: block;
    }
    
    .card h2 {
      font-size: 1.5em;
      margin-bottom: 10px;
    }
    
    .card p {
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 40px;
      padding-top: 40px;
      border-top: 2px solid #f0f0f0;
      flex-wrap: wrap;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-value {
      font-size: 2.5em;
      font-weight: bold;
      color: #667eea;
      display: block;
    }
    
    .stat-label {
      color: #666;
      font-size: 0.9em;
      margin-top: 5px;
    }
    
    .github-link {
      text-align: center;
      margin-top: 30px;
    }
    
    .github-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1em;
      transition: color 0.3s ease;
    }
    
    .github-link a:hover {
      color: #764ba2;
    }
    
    @media (max-width: 600px) {
      .container {
        padding: 40px 20px;
      }
      
      h1 {
        font-size: 2em;
      }
      
      .cards {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔄 React Version Compare</h1>
    <p class="subtitle">A React component for precise word-level diff comparison</p>
    
    <p class="description">
      Compare strings, arrays, and Contentful rich text documents with word-level and item-level highlighting.
      TypeScript support, multiple view modes, and comprehensive testing included.
    </p>
    
    <div class="cards">
      <a href="./storybook/index.html" class="card">
        <span class="card-icon">📚</span>
        <h2>Interactive Storybook</h2>
        <p>Try out the component with live examples. Adjust props and see changes in real-time.</p>
      </a>
      
      <a href="./coverage/index.html" class="card">
        <span class="card-icon">📊</span>
        <h2>Test Coverage Report</h2>
        <p>View detailed code coverage metrics. 99%+ coverage across all files.</p>
      </a>
    </div>
    
    <div class="stats">
      <div class="stat">
        <span class="stat-value">99.31%</span>
        <span class="stat-label">Code Coverage</span>
      </div>
      <div class="stat">
        <span class="stat-value">124</span>
        <span class="stat-label">Tests Passing</span>
      </div>
      <div class="stat">
        <span class="stat-value">100%</span>
        <span class="stat-label">Functions Tested</span>
      </div>
    </div>
    
    <div class="github-link">
      <a href="https://github.com/CrashBytes/react-version-compare" target="_blank">
        View on GitHub →
      </a>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(DEPLOY_DIR, 'index.html'), landingPage);

// Step 5: Create .nojekyll file to bypass Jekyll processing
fs.writeFileSync(path.join(DEPLOY_DIR, '.nojekyll'), '');

// Step 6: Deploy to gh-pages branch
console.log('🚀 Deploying to GitHub Pages...');
try {
  execSync(`npx gh-pages -d "${DEPLOY_DIR}" -m "Deploy Storybook and coverage report"`, { 
    stdio: 'inherit',
    cwd: ROOT_DIR
  });
  
  console.log('\n✅ Deployment successful!');
  console.log('\n📍 Your site will be available at:');
  console.log('   https://crashbytes.github.io/react-version-compare/');
  console.log('\n📚 Storybook:');
  console.log('   https://crashbytes.github.io/react-version-compare/storybook/');
  console.log('\n📊 Coverage:');
  console.log('   https://crashbytes.github.io/react-version-compare/coverage/');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}

// Step 7: Clean up
console.log('\n🧹 Cleaning up...');
fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });

console.log('✨ Done!\n');
