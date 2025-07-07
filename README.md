# React Version Compare

A React component for comparing different versions of content with a side-by-side or unified diff view. Features include smart diffing for various content types (JSON, text, code), line numbers, version selection, and highlighted changes.

[![npm version](https://badge.fury.io/js/react-version-compare.svg)](https://badge.fury.io/js/react-version-compare)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## Features

- 📊 **Multiple View Modes**: Side-by-side and unified diff views
- 🎯 **Content Type Support**: Text, JSON, code, and word-level diffing
- 🔢 **Line Numbers**: Optional line numbering for better navigation
- 🎨 **Highlighted Changes**: Clear visual indicators for additions and deletions
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **TypeScript Support**: Full TypeScript definitions included
- 🎛️ **Flexible API**: Customizable props for various use cases

## Installation

```bash
npm install react-version-compare
```

```bash
yarn add react-version-compare
```

## Basic Usage

```tsx
import React from 'react';
import VersionCompare from 'react-version-compare';
import 'react-version-compare/dist/styles.css';

const App = () => {
  const currentVersion = {
    id: 'current',
    name: 'Current Version',
    content: 'This is the current version of the content.',
    date: new Date()
  };

  const previousVersions = [
    {
      id: 'v1',
      name: 'Version 1',
      content: 'This is an earlier version of the content.',
      date: new Date(Date.now() - 86400000) // 1 day ago
    }
  ];

  return (
    <VersionCompare 
      currentVersion={currentVersion}
      previousVersions={previousVersions}
    />
  );
};

export default App;
```

## Advanced Usage

### JSON Comparison

```tsx
const jsonCurrent = {
  id: 'current',
  content: {
    name: 'John Doe',
    age: 30,
    city: 'New York'
  }
};

const jsonPrevious = [{
  id: 'v1',
  content: {
    name: 'John Doe',
    age: 25,
    city: 'Boston'
  }
}];

<VersionCompare 
  currentVersion={jsonCurrent}
  previousVersions={jsonPrevious}
  contentType="json"
  viewMode="unified"
/>
```

### Code Comparison

```tsx
const codeCurrent = {
  id: 'current',
  content: `function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}`
};

const codePrevious = [{
  id: 'v1',
  content: `function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price;
  }
  return total;
}`
}];

<VersionCompare 
  currentVersion={codeCurrent}
  previousVersions={codePrevious}
  contentType="code"
  showLineNumbers={true}
  enableViewModeToggle={true}
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentVersion` | `VersionData` | **required** | The current version object |
| `previousVersions` | `VersionData[]` | **required** | Array of previous version objects |
| `onVersionSelect` | `(versionId: string) => void` | `undefined` | Callback when a version is selected |
| `filterVersions` | `boolean` | `false` | Whether to filter versions by changed sections |
| `sectionId` | `string` | `undefined` | ID of the section being compared (for filtering) |
| `contentType` | `'text' \| 'json' \| 'code' \| 'word'` | `'text'` | Type of content for optimal diffing |
| `viewMode` | `'side-by-side' \| 'unified'` | `'side-by-side'` | How to display the diff |
| `className` | `string` | `''` | Custom CSS class name |
| `showLineNumbers` | `boolean` | `true` | Whether to show line numbers |
| `enableViewModeToggle` | `boolean` | `true` | Whether to enable the view mode toggle |

### VersionData Interface

```typescript
interface VersionData {
  id: string;
  name?: string;
  content: string | Record<string, any>;
  date?: Date | string;
  changedSections?: string[];
}
```

## Styling

The component comes with default styles, but you can customize the appearance by overriding the CSS classes:

```css
.version-compare {
  /* Main container */
}

.version-selector {
  /* Version selection controls */
}

.comparison-content {
  /* Diff content area */
}

.diff-added {
  /* Added content styling */
}

.diff-removed {
  /* Removed content styling */
}
```

## Content Types

### Text (`contentType="text"`)
Line-by-line comparison, ideal for plain text documents.

### JSON (`contentType="json"`)
Smart JSON object comparison that handles nested structures.

### Code (`contentType="code"`)
Optimized for source code with syntax-aware diffing.

### Word (`contentType="word"`)
Word-level comparison for documents where line breaks aren't significant.

## License

Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/CrashBytes/react-version-compare/issues) on GitHub.