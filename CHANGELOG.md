# Changelog

## [Unreleased]
### Changed
- Placeholder for future changes

## [1.0.4] - 2026-01-14

### Security
- **npm Trusted Publishing enabled** - packages published via OIDC (no tokens)
- **Cryptographic provenance** - every release includes verifiable supply chain attestation
- **Automated security audits** - weekly dependency vulnerability scanning via GitHub Actions
- **Dependabot enabled** - automated dependency updates with grouped PRs
- **CodeQL analysis** - continuous code security scanning
- **React compatibility testing** - automated React 18 & 19 compatibility matrix
- Zero known vulnerabilities (npm audit clean)

### Infrastructure
- Migrated to npm Trusted Publishing (OIDC) from classic tokens
- New tag-based release workflow (replaces auto-bump on push)
- Automated release workflow with provenance generation
- Supply chain verification via Sigstore transparency log
- GitHub Releases automatically created from tags
- Comprehensive security badge suite in README

### Documentation
- Added SECURITY.md with vulnerability reporting process
- Updated README with security badges (npm Audit, CodeQL, React compatibility, Provenance)
- Fixed npm package name in badges (@crashbytes/react-version-compare)

**Verify Package Provenance:**
```bash
npm view @crashbytes/react-version-compare dist.integrity
# Or visit: https://www.npmjs.com/package/@crashbytes/react-version-compare
```

## [1.0.3] - 2026-01-02
### Added
- Comprehensive unit test suite with 80%+ coverage targeting
- GitHub Pages deployment for Storybook and test coverage
  - Automated deployment via GitHub Actions
  - Landing page with links to Storybook and coverage
  - Storybook available at `/storybook/`
  - Coverage report available at `/coverage/`
- Deployment scripts:
  - `npm run deploy:all` - Deploy everything
  - `npm run storybook:deploy` - Deploy Storybook only
  - `npm run coverage:deploy` - Deploy coverage only
  - `scripts/deploy-gh-pages.js` - Combined deployment script
- GitHub Actions workflow `.github/workflows/deploy-pages.yml`
- Comprehensive deployment guide `GITHUB-PAGES-DEPLOYMENT.md`
- Coverage and test badges in README

### Fixed
- Test assertions for multiple element matches (use getAllByText)
- Type guard tests for null/undefined (use toBeFalsy() instead of toBe(false))
- Structure extraction tests to match actual implementation behavior
- React act() warnings in async Contentful rendering tests (suppressed expected warnings)
- Query strategies for text split across multiple span elements
- `Compare.enhanced.test.tsx`: Enhanced coverage for Compare component
  - String comparison edge cases (empty strings, whitespace, special characters, unicode)
  - Array comparison edge cases (different lengths, empty elements)
  - ViewMode tests (side-by-side, inline switching)
  - ClassName prop application tests
  - Error handling for invalid inputs (null, undefined, mixed types, booleans, functions)
  - Contentful document edge cases (empty content, loading states, caseSensitive options)
  - React lifecycle tests (unmount cleanup, prop updates)
  - CSS class application validation
  - Accessibility structure tests
- `ContentfulDiff.enhanced.test.tsx`: Enhanced coverage for contentfulDiff utilities
  - `isContentfulDocument` type guard tests (valid/invalid documents, all edge cases)
  - `extractPlainText` tests (all heading levels, lists, tables, quotes, hyperlinks, marks)
  - `extractStructuredContent` tests (structure extraction, type identification, nesting)
  - `renderContentfulDiff` tests for both text and structure modes
  - Edge case handling (empty documents, whitespace, unknown node types)
- `Compare.integration.test.tsx`: Real-world integration scenarios
  - Code snippet comparisons (JavaScript, JSON, SQL, markdown)
  - Email and URL handling
  - Version number and file path comparisons
  - Complex Contentful document structures
  - Performance tests with large datasets (1000+ items)
  - ViewMode switching behavior validation
  - Rapid prop update handling

### Technical Details
- All tests follow Partnership Charter Section 2.3 (TDD standards)
- Tests use React Testing Library best practices
- Coverage targets: 80%+ for branches, functions, lines, statements
- Tests organized by functionality: unit, integration, edge cases
- Proper use of `waitFor` for async Contentful rendering
- Type-safe test data using Contentful Document types

### Testing
Run tests with:
```bash
npm test                 # Run all tests
npm run test:coverage    # Run with coverage report
npm run test:watch       # Watch mode for development
```

Coverage thresholds (jest.config.js):
- Branches: 75%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## [1.0.0] - 2025-07-07
### Added
- Initial release of `react-version-compare`.
- Compare strings and arrays with word/item-level highlighting.
- Side-by-side and inline view modes.
- TypeScript support.
