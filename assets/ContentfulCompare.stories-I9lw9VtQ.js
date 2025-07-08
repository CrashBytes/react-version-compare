import{C as s,d as e}from"./Compare-Oav67Jr4.js";import"./jsx-runtime-xIpiJ28I.js";import"./iframe-DMvHpwmk.js";const a={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"Getting Started with React",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"React is a ",marks:[],data:{}},{nodeType:"text",value:"powerful",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" JavaScript library for building user interfaces.",marks:[],data:{}}]},{nodeType:e.BLOCKS.UL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Component-based architecture",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Virtual DOM for performance",marks:[],data:{}}]}]}]}]},r={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"Getting Started with React Development",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"React is a ",marks:[],data:{}},{nodeType:"text",value:"powerful",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" and ",marks:[],data:{}},{nodeType:"text",value:"flexible",marks:[{type:e.MARKS.ITALIC}],data:{}},{nodeType:"text",value:" JavaScript library for building modern user interfaces.",marks:[],data:{}}]},{nodeType:e.BLOCKS.UL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Component-based architecture",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Virtual DOM for optimized performance",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Hooks for state management",marks:[],data:{}}]}]}]}]},p={title:"Compare/Contentful Rich Text",component:s,parameters:{layout:"centered",docs:{description:{component:`
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
        `}}},tags:["autodocs"]},t={args:{original:a,modified:r,compareMode:"text",viewMode:"side-by-side"},parameters:{docs:{description:{story:"Compares Contentful documents by extracting plain text and performing word-level diff."}}}},n={args:{original:a,modified:r,compareMode:"structure",viewMode:"side-by-side"},parameters:{docs:{description:{story:"Compares Contentful documents by preserving document structure (headings, paragraphs, lists, etc.)."}}}},o={args:{original:a,modified:r,compareMode:"structure",viewMode:"inline"},parameters:{docs:{description:{story:"Displays Contentful document comparison in inline view mode."}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    original: sampleContentfulDoc1,
    modified: sampleContentfulDoc2,
    compareMode: 'text',
    viewMode: 'side-by-side'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compares Contentful documents by extracting plain text and performing word-level diff.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    original: sampleContentfulDoc1,
    modified: sampleContentfulDoc2,
    compareMode: 'structure',
    viewMode: 'side-by-side'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compares Contentful documents by preserving document structure (headings, paragraphs, lists, etc.).'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    original: sampleContentfulDoc1,
    modified: sampleContentfulDoc2,
    compareMode: 'structure',
    viewMode: 'inline'
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays Contentful document comparison in inline view mode.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};const m=["ContentfulTextMode","ContentfulStructureMode","ContentfulInlineView"];export{o as ContentfulInlineView,n as ContentfulStructureMode,t as ContentfulTextMode,m as __namedExportsOrder,p as default};
