import type { Meta, StoryObj } from '@storybook/react';
import Compare from '../components/Compare';
import { originalRichText, modifiedRichText } from '../../__mocks__/richtext.mock';

const meta: Meta<typeof Compare> = {
  title: 'Compare/Contentful Rich Text',
  component: Compare,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Enhanced Compare component with support for Contentful Rich Text documents.

## Features
- **Text Mode**: Compares plain text extracted from Contentful documents
- **Structure Mode**: Compares document structure while preserving semantic meaning
- **Same Visual Design**: Maintains consistent styling with string/array comparisons
- **Type Safety**: Full TypeScript support with Contentful document types

## Usage
\`\`\`tsx
import { Compare } from '@crashbytes/react-version-compare';
import { Document } from '@contentful/rich-text-types';

<Compare 
  original={contentfulDoc1}
  modified={contentfulDoc2}
  compareMode="structure" // or "text"
  viewMode="side-by-side"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Compare>;

export const ContentfulTextMode: Story = {
  args: {
    original: originalRichText,
    modified: modifiedRichText,
    compareMode: 'text',
    viewMode: 'side-by-side',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compares Contentful documents by extracting plain text and performing word-level diff.',
      },
    },
  },
};

export const ContentfulStructureMode: Story = {
  args: {
    original: originalRichText,
    modified: modifiedRichText,
    compareMode: 'structure',
    viewMode: 'side-by-side',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compares Contentful documents by preserving document structure (headings, paragraphs, lists, etc.).',
      },
    },
  },
};

export const ContentfulInlineView: Story = {
  args: {
    original: originalRichText,
    modified: modifiedRichText,
    compareMode: 'structure',
    viewMode: 'inline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays Contentful document comparison in inline view mode.',
      },
    },
  },
};