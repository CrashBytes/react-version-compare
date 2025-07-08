import type { Meta, StoryObj } from '@storybook/react';
import { Compare } from '../components/Compare';
import { Document, BLOCKS, MARKS } from '@contentful/rich-text-types';

// Sample Contentful documents for stories
const sampleContentfulDoc1: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Getting Started with React',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'React is a ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'powerful',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' JavaScript library for building user interfaces.',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.UL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Component-based architecture',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Virtual DOM for performance',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const sampleContentfulDoc2: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Getting Started with React Development',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'React is a ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'powerful',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' and ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'flexible',
          marks: [{ type: MARKS.ITALIC }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' JavaScript library for building modern user interfaces.',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.UL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Component-based architecture',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Virtual DOM for optimized performance',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Hooks for state management',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

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
    original: sampleContentfulDoc1,
    modified: sampleContentfulDoc2,
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
    original: sampleContentfulDoc1,
    modified: sampleContentfulDoc2,
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
    original: sampleContentfulDoc1,
    modified: sampleContentfulDoc2,
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
