import React from 'react';
import { Compare } from '../src/components/Compare';
import { Document, BLOCKS, MARKS } from '@contentful/rich-text-types';

// Sample Contentful documents for demonstration
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
          value: 'Welcome to Our Blog',
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
          value: 'This is a sample blog post with ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'bold text',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' and some regular content.',
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
                  value: 'First item',
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
                  value: 'Second item',
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
          value: 'Welcome to Our Updated Blog',
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
          value: 'This is a sample blog post with ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'bold text',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' and some ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'updated',
          marks: [{ type: MARKS.ITALIC }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' content.',
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
                  value: 'First item',
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
                  value: 'Modified second item',
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
                  value: 'Third item (new)',
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

const ContentfulTextComparisonExample: React.FC = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2>Contentful Document Comparison - Text Mode</h2>
      <p>Comparing two Contentful rich text documents in text mode (plain text comparison):</p>
      
      <Compare 
        original={sampleContentfulDoc1}
        modified={sampleContentfulDoc2}
        compareMode="text"
        viewMode="side-by-side"
      />
    </div>
  );
};

const ContentfulStructureComparisonExample: React.FC = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2>Contentful Document Comparison - Structure Mode</h2>
      <p>Comparing two Contentful rich text documents in structure mode (preserving document structure):</p>
      
      <Compare 
        original={sampleContentfulDoc1}
        modified={sampleContentfulDoc2}
        compareMode="structure"
        viewMode="side-by-side"
      />
    </div>
  );
};

const ContentfulInlineComparisonExample: React.FC = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2>Contentful Document Comparison - Inline View</h2>
      <p>Comparing two Contentful rich text documents in inline view:</p>
      
      <Compare 
        original={sampleContentfulDoc1}
        modified={sampleContentfulDoc2}
        compareMode="structure"
        viewMode="inline"
      />
    </div>
  );
};

export { ContentfulTextComparisonExample, ContentfulStructureComparisonExample, ContentfulInlineComparisonExample };
