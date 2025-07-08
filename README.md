# React Compare

A React component for comparing strings and arrays with precise word-level and item-level highlighting of differences.

[![npm version](https://badge.fury.io/js/react-version-compare.svg)](https://badge.fury.io/js/react-version-compare)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## Live Storybook Demo

You can explore and interact with all features of this component in the live Storybook:

👉 **[Live Storybook Demo](https://crashbytes.github.io/react-version-compare/)**

The Storybook provides interactive examples for all comparison scenarios. You can adjust the inputs and props using the controls panel to see how the component behaves with different data. This is the best way to preview, test, and understand the capabilities of `react-version-compare` without writing any code.

## Features

- 🎯 **Precise Highlighting**: Only highlights the actual differences, not entire lines
- 📝 **String Comparison**: Word-level diff for text content
- 📋 **Array Comparison**: Item-level diff for arrays of strings
- 🎨 **Clean Visual Design**: Clear red/green highlighting for changes
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **TypeScript Support**: Full TypeScript definitions included
- 🎛️ **Multiple Views**: Side-by-side or inline comparison modes

## Installation

```bash
npm install react-version-compare
```

```bash
yarn add react-version-compare
```

## Basic Usage

### String Comparison

```tsx
import React from 'react';
import Compare from 'react-version-compare';
import 'react-version-compare/dist/styles.css';

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

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `original` | `string \| string[]` | **required** | The original content |
| `modified` | `string \| string[]` | **required** | The modified content |
| `viewMode` | `'side-by-side' \| 'inline'` | `'side-by-side'` | How to display the comparison |
| `className` | `string` | `''` | Custom CSS class name |

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

## How It Works

- **String comparison**: Uses word-level diffing to identify precise changes
- **Array comparison**: Compares items by position and content
- **Smart highlighting**: Only highlights actual differences, not entire lines
- **Type safety**: Ensures both inputs are the same type (both strings or both arrays)

## License

Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

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