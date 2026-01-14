# React Compare

A React component for comparing strings and arrays with precise word-level and item-level highlighting of differences.

[![npm version](https://badge.fury.io/js/%40crashbytes%2Freact-version-compare.svg)](https://www.npmjs.com/package/@crashbytes/react-version-compare)
[![npm](https://img.shields.io/npm/v/@crashbytes/react-version-compare.svg)](https://www.npmjs.com/package/@crashbytes/react-version-compare)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![npm Audit](https://github.com/CrashBytes/react-version-compare/actions/workflows/security-audit.yml/badge.svg)](https://github.com/CrashBytes/react-version-compare/actions/workflows/security-audit.yml)
[![CodeQL](https://github.com/CrashBytes/react-version-compare/actions/workflows/security-audit.yml/badge.svg?branch=main)](https://github.com/CrashBytes/react-version-compare/security/code-scanning)
[![React 18](https://github.com/CrashBytes/react-version-compare/actions/workflows/react-compat.yml/badge.svg)](https://github.com/CrashBytes/react-version-compare/actions/workflows/react-compat.yml)
[![React 19](https://github.com/CrashBytes/react-version-compare/actions/workflows/react-compat.yml/badge.svg)](https://github.com/CrashBytes/react-version-compare/actions/workflows/react-compat.yml)
[![npm Provenance](https://img.shields.io/badge/provenance-sigstore-blue)](https://www.npmjs.com/package/@crashbytes/react-version-compare)
[![Coverage](https://img.shields.io/badge/coverage-99.31%25-brightgreen.svg)](https://crashbytes.github.io/react-version-compare/coverage/)
[![Tests](https://img.shields.io/badge/tests-124%20passing-brightgreen.svg)](https://crashbytes.github.io/react-version-compare/coverage/)

## Live Demos

### Interactive Storybook

👉 **[Live Storybook Demo](https://crashbytes.github.io/react-version-compare/storybook/)**

Explore and interact with all features of this component. Adjust inputs and props using the controls panel to see how the component behaves with different data.

### Test Coverage Report

📊 **[View Coverage Report](https://crashbytes.github.io/react-version-compare/coverage/)**

Detailed test coverage metrics showing 99.31% statement coverage, 94.39% branch coverage, and 100% function coverage.

## Features

- 🎯 **Precise Highlighting**: Only highlights the actual differences, not entire lines
- 📝 **String Comparison**: Word-level diff for text content
- 📋 **Array Comparison**: Item-level diff for arrays of strings
- 📄 **Contentful Rich Text**: Compare Contentful documents with text or structure modes
- 🎨 **Clean Visual Design**: Clear red/green highlighting for changes
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **TypeScript Support**: Full TypeScript definitions included
- 🎛️ **Multiple Views**: Side-by-side or inline comparison modes
- ✅ **Comprehensive Testing**: 80%+ test coverage with 114+ test scenarios

## Installation

```bash
npm install @crashbytes/react-version-compare
```

```bash
yarn add @crashbytes/react-version-compare
```

## Basic Usage

### String Comparison

```tsx
import React from 'react';
import Compare from '@crashbytes/react-version-compare';
import '@crashbytes/react-version-compare/dist/styles.css';

const App = () => {
  const original = 'I am Captain Kirk, Captain of the USS Enterprise.';
  const modified = 'I am Captain Picard, Captain of the USS Enterprise.';

  return (
    <Compare 
      original={original}
      modified={modified}
    />
  );
};
```

**Result**: Only "Kirk" (in red) and "Picard" (in green) will be highlighted.

### Array Comparison

```tsx
const originalArray = [
  'First item',
  'Second item', 
  'Third item'
];

const modifiedArray = [
  'First item',
  'Modified second item',
  'Third item'
];

<Compare 
  original={originalArray}
  modified={modifiedArray}
/>
```

### Contentful Rich Text Comparison

The component now supports comparing Contentful Rich Text documents with two different modes:

```tsx
import { Compare } from '@crashbytes/react-version-compare';
import { Document } from '@contentful/rich-text-types';

// Text mode - extracts plain text for comparison
<Compare 
  original={contentfulDoc1}
  modified={contentfulDoc2}
  compareMode="text"
  viewMode="side-by-side"
/>

// Structure mode - compares document structure
<Compare 
  original={contentfulDoc1}
  modified={contentfulDoc2}
  compareMode="structure"
  viewMode="side-by-side"
/>
```

**Structure Mode** preserves the semantic meaning of the document by comparing:
- Headings (with levels)
- Paragraphs
- Lists and list items
- Block quotes
- And other rich text elements

**Text Mode** extracts plain text content and performs word-level comparison, similar to string comparison.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `original` | `string \| string[] \| Document` | **required** | The original content |
| `modified` | `string \| string[] \| Document` | **required** | The modified content |
| `viewMode` | `'side-by-side' \| 'inline'` | `'side-by-side'` | How to display the comparison |
| `className` | `string` | `''` | Custom CSS class name |
| `caseSensitive` | `boolean` | `true` | Whether comparison is case sensitive |
| `compareMode` | `'text' \| 'structure'` | `'text'` | Comparison mode for Contentful documents |

## Examples

### Precise Word-Level Highlighting

```tsx
// Example 1: Minimal changes
const original = 'I am Captain Kirk, Captain of the USS Enterprise.';
const modified = 'I am Captain Picard, Captain of the USS Enterprise.';
// Only "Kirk" → "Picard" highlighted

// Example 2: Multiple changes  
const original = 'I am Captain Kirk, Captain of the USS Enterprise.';
const modified = 'I am Commander Benjamin Sisko, Commander of Deep Space 9.';
// Highlights: "Captain Kirk, Captain of the USS Enterprise" → "Commander Benjamin Sisko, Commander of Deep Space 9"
```

### Array Comparison

```tsx
const original = ['Item A', 'Item B', 'Item C'];
const modified = ['Item A', 'Modified Item B', 'Item C', 'Item D'];

<Compare original={original} modified={modified} />
```

### Inline View

```tsx
<Compare 
  original="Original text"
  modified="Modified text"
  viewMode="inline"
/>
```

## Testing

This package includes comprehensive unit and integration tests with 80%+ coverage.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (for development)
npm run test:watch

# Run specific test file
npm test -- Compare.enhanced.test.tsx
```

### Test Coverage

The test suite includes:
- **114+ test scenarios** covering edge cases and real-world usage
- **Unit tests**: Component logic, utility functions, type guards
- **Integration tests**: Real-world scenarios (code snippets, JSON, SQL, URLs)
- **Edge case tests**: Empty inputs, null/undefined, large datasets, unicode
- **Accessibility tests**: Semantic structure, screen reader support
- **Performance tests**: Large arrays (100+ items), large strings (1000+ words)

Coverage thresholds enforced by Jest:
- Branches: 75%
- Functions: 80%
- Lines: 80%
- Statements: 80%

See [TEST-COVERAGE-SUMMARY.md](./TEST-COVERAGE-SUMMARY.md) for detailed test documentation.

### Test Files

```
__tests__/
├── Compare.test.tsx                    # Original basic tests
├── Compare.enhanced.test.tsx           # Edge cases & comprehensive coverage
├── Compare.integration.test.tsx        # Real-world scenarios
├── ContentfulDiff.test.tsx             # Original utility tests
└── ContentfulDiff.enhanced.test.tsx    # Complete utility coverage
```

## Styling

The component uses CSS classes that you can customize:

```css
.diff-removed {
  /* Styling for removed content (red) */
}

.diff-added {
  /* Styling for added content (green) */
}

.diff-unchanged {
  /* Styling for unchanged content */
}
```

## Use Cases

- **Document revisions**: Compare different versions of text
- **Code reviews**: Highlight changes in code snippets  
- **Content management**: Show edits in articles or posts
- **Data comparison**: Compare lists or arrays of items
- **Translation work**: Compare original and translated text
- **Contentful CMS**: Compare rich text content versions and track editorial changes
- **Documentation**: Track changes in structured content with semantic meaning

## How It Works

- **String comparison**: Uses word-level diffing to identify precise changes
- **Array comparison**: Compares items by position and content
- **Contentful comparison**: Extracts plain text or compares structural elements
- **Smart highlighting**: Only highlights actual differences, not entire lines
- **Type safety**: Ensures both inputs are the same type (strings, arrays, or Contentful documents)

## License

Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build

# Run Storybook for local development
npm run storybook
```

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/CrashBytes/react-version-compare/issues) on GitHub.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## Versioning

To bump the version, use [npm version](https://docs.npmjs.com/cli/v10/commands/npm-version):

```sh
npm version patch   # or 'minor' or 'major'
```

This will update `package.json`, create a git tag, and (optionally) commit the change.
