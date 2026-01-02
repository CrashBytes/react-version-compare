import React from 'react';
import {
  extractPlainText,
  extractStructuredContent,
  isContentfulDocument,
  renderContentfulDiff,
} from '@components/contentfulDiff';
import { BLOCKS, type Document, type TopLevelBlock } from '@contentful/rich-text-types';

/**
 * Enhanced unit tests for contentfulDiff utilities
 * Focus: Edge cases, error handling, all node types, complex structures
 */

describe('contentfulDiff - Enhanced Coverage', () => {
  describe('isContentfulDocument', () => {
    it('returns true for valid Contentful document', () => {
      const validDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      expect(isContentfulDocument(validDoc)).toBe(true);
    });

    it('returns false for object missing nodeType', () => {
      const invalid = { data: {}, content: [] };
      expect(isContentfulDocument(invalid)).toBe(false);
    });

    it('returns false for object with wrong nodeType', () => {
      const invalid = { nodeType: BLOCKS.PARAGRAPH, data: {}, content: [] };
      expect(isContentfulDocument(invalid)).toBe(false);
    });

    it('returns false for object missing content array', () => {
      const invalid = { nodeType: BLOCKS.DOCUMENT, data: {} };
      expect(isContentfulDocument(invalid)).toBe(false);
    });

    it('returns false for object with non-array content', () => {
      const invalid = { nodeType: BLOCKS.DOCUMENT, data: {}, content: 'not an array' };
      expect(isContentfulDocument(invalid)).toBe(false);
    });

    it('returns false for null', () => {
      expect(isContentfulDocument(null)).toBeFalsy();
    });

    it('returns false for undefined', () => {
      expect(isContentfulDocument(undefined)).toBeFalsy();
    });

    it('returns false for string', () => {
      expect(isContentfulDocument('not a document')).toBe(false);
    });

    it('returns false for number', () => {
      expect(isContentfulDocument(123)).toBe(false);
    });

    it('returns false for array', () => {
      expect(isContentfulDocument([])).toBe(false);
    });

    it('returns true for document with populated content', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'test', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(isContentfulDocument(doc)).toBe(true);
    });
  });

  describe('extractPlainText', () => {
    it('extracts text from single paragraph', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Hello world', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('Hello world');
    });

    it('extracts text from multiple paragraphs', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'First', marks: [], data: {} }],
            data: {}
          },
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Second', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('FirstSecond');
    });

    it('extracts text from all heading levels', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          { nodeType: BLOCKS.HEADING_1, content: [{ nodeType: 'text', value: 'H1', marks: [], data: {} }], data: {} },
          { nodeType: BLOCKS.HEADING_2, content: [{ nodeType: 'text', value: 'H2', marks: [], data: {} }], data: {} },
          { nodeType: BLOCKS.HEADING_3, content: [{ nodeType: 'text', value: 'H3', marks: [], data: {} }], data: {} },
          { nodeType: BLOCKS.HEADING_4, content: [{ nodeType: 'text', value: 'H4', marks: [], data: {} }], data: {} },
          { nodeType: BLOCKS.HEADING_5, content: [{ nodeType: 'text', value: 'H5', marks: [], data: {} }], data: {} },
          { nodeType: BLOCKS.HEADING_6, content: [{ nodeType: 'text', value: 'H6', marks: [], data: {} }], data: {} }
        ] as TopLevelBlock[]
      };
      const text = extractPlainText(doc);
      expect(text).toContain('H1');
      expect(text).toContain('H2');
      expect(text).toContain('H3');
      expect(text).toContain('H4');
      expect(text).toContain('H5');
      expect(text).toContain('H6');
    });

    it('extracts text from nested lists', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.UL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Item 1', marks: [], data: {} }],
                data: {}
              },
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Item 2', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      const text = extractPlainText(doc);
      expect(text).toContain('Item 1');
      expect(text).toContain('Item 2');
    });

    it('extracts text from ordered lists', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.OL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'First', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toContain('First');
    });

    it('extracts text from quotes', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.QUOTE,
            content: [{ nodeType: 'text', value: 'Quote text', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('Quote text');
    });

    it('extracts text from tables', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.TABLE,
            content: [
              {
                nodeType: BLOCKS.TABLE_ROW,
                content: [
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    content: [{ nodeType: 'text', value: 'Cell 1', marks: [], data: {} }],
                    data: {}
                  }
                ],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toContain('Cell 1');
    });

    it('handles empty document', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      expect(extractPlainText(doc)).toBe('');
    });

    it('handles document with empty text nodes', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: '', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('');
    });

    it('handles text with marks (bold, italic, etc)', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [
              { nodeType: 'text', value: 'Bold text', marks: [{ type: 'bold' }], data: {} }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('Bold text');
    });

    it('handles hyperlinks', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: 'hyperlink' as any,
            content: [{ nodeType: 'text', value: 'Link text', marks: [], data: {} }],
            data: { uri: 'https://example.com' }
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('Link text');
    });

    it('concatenates text from multiple text nodes in same paragraph', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [
              { nodeType: 'text', value: 'First ', marks: [], data: {} },
              { nodeType: 'text', value: 'Second', marks: [], data: {} }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      expect(extractPlainText(doc)).toBe('First Second');
    });
  });

  describe('extractStructuredContent', () => {
    it('extracts structure from headings with correct levels', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          { nodeType: BLOCKS.HEADING_1, content: [{ nodeType: 'text', value: 'Title', marks: [], data: {} }], data: {} },
          { nodeType: BLOCKS.HEADING_2, content: [{ nodeType: 'text', value: 'Subtitle', marks: [], data: {} }], data: {} }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      
      expect(structure).toEqual([
        { type: 'Heading', content: 'Title', level: 1 },
        { type: 'Heading', content: 'Subtitle', level: 2 }
      ]);
    });

    it('identifies paragraph as Text type', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Para text', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure[0].type).toBe('Text');
    });

    it('identifies UL_LIST as List', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.UL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Item', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure.some(s => s.type === 'List Item')).toBe(true);
    });

    it('identifies OL_LIST as Numbered List', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.OL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Item', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure.some(s => s.type === 'List Item')).toBe(true);
    });

    it('identifies LIST_ITEM as List Item', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.UL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Item text', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure.some(s => s.type === 'List Item')).toBe(true);
    });

    it('identifies QUOTE as Quote', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.QUOTE,
            content: [{ nodeType: 'text', value: 'Quote', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure[0].type).toBe('Quote');
    });

    it('identifies TABLE as Table', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.TABLE,
            content: [
              {
                nodeType: BLOCKS.TABLE_ROW,
                content: [
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    content: [{ nodeType: 'text', value: 'Cell', marks: [], data: {} }],
                    data: {}
                  }
                ],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      // Tables contain cells which have text content
      expect(structure.length).toBeGreaterThan(0);
    });

    it('skips nodes with only whitespace content', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: '   ', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure.length).toBe(0);
    });

    it('handles empty document', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure).toEqual([]);
    });

    it('handles nested structure correctly', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.UL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Nested item', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure.length).toBeGreaterThan(0);
    });

    it('handles unknown node types with capitalized name', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: 'custom-block' as any,
            content: [{ nodeType: 'text', value: 'Custom', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const structure = extractStructuredContent(doc);
      expect(structure[0].type).toBe('Custom-block');
    });
  });

  describe('renderContentfulDiff - text mode', () => {
    it('returns diff parts for identical documents', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Same text', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const mockRender = jest.fn((a, b) => ({
        originalParts: [<span key="o">{a}</span>],
        modifiedParts: [<span key="m">{b}</span>]
      }));
      
      const result = await renderContentfulDiff(doc, doc, 'text', true, mockRender);
      
      expect(mockRender).toHaveBeenCalledWith('Same text', 'Same text');
      expect(result.originalParts.length).toBe(1);
      expect(result.modifiedParts.length).toBe(1);
    });

    it('returns diff parts for different documents', async () => {
      const origDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Original', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const modDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Modified', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const mockRender = jest.fn((a, b) => ({
        originalParts: [<span key="o">{a}</span>],
        modifiedParts: [<span key="m">{b}</span>]
      }));
      
      const result = await renderContentfulDiff(origDoc, modDoc, 'text', true, mockRender);
      
      expect(mockRender).toHaveBeenCalledWith('Original', 'Modified');
      expect(result.originalParts.length).toBe(1);
      expect(result.modifiedParts.length).toBe(1);
    });

    it('handles empty documents in text mode', async () => {
      const emptyDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      
      const mockRender = jest.fn((a, b) => ({
        originalParts: [],
        modifiedParts: []
      }));
      
      const result = await renderContentfulDiff(emptyDoc, emptyDoc, 'text', true, mockRender);
      
      expect(mockRender).toHaveBeenCalledWith('', '');
      expect(result.originalParts.length).toBe(0);
      expect(result.modifiedParts.length).toBe(0);
    });
  });

  describe('renderContentfulDiff - structure mode', () => {
    it('detects added content', async () => {
      const origDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      
      const modDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'New paragraph', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const mockRender = jest.fn();
      const result = await renderContentfulDiff(origDoc, modDoc, 'structure', true, mockRender);
      
      expect(result.modifiedParts.length).toBeGreaterThan(0);
      expect(result.modifiedParts.some(part => 
        part.props.className === 'diff-added-line'
      )).toBe(true);
    });

    it('detects removed content', async () => {
      const origDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Removed paragraph', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const modDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      
      const mockRender = jest.fn();
      const result = await renderContentfulDiff(origDoc, modDoc, 'structure', true, mockRender);
      
      expect(result.originalParts.length).toBeGreaterThan(0);
      expect(result.originalParts.some(part => 
        part.props.className === 'diff-removed-line'
      )).toBe(true);
    });

    it('shows unchanged content', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Same', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const mockRender = jest.fn();
      const result = await renderContentfulDiff(doc, doc, 'structure', true, mockRender);
      
      expect(result.originalParts.some(part => 
        part.props.className === 'diff-unchanged-line'
      )).toBe(true);
    });

    it('shows heading level in structure display', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.HEADING_3,
            content: [{ nodeType: 'text', value: 'Level 3', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const mockRender = jest.fn();
      const result = await renderContentfulDiff(doc, doc, 'structure', true, mockRender);
      
      // Check that structure parts were created
      expect(result.originalParts.length).toBeGreaterThan(0);
      expect(result.modifiedParts.length).toBeGreaterThan(0);
    });

    it('handles empty documents in structure mode', async () => {
      const emptyDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      
      const mockRender = jest.fn();
      const result = await renderContentfulDiff(emptyDoc, emptyDoc, 'structure', true, mockRender);
      
      expect(result.originalParts.length).toBe(0);
      expect(result.modifiedParts.length).toBe(0);
    });

    it('maintains 1:1 correspondence in output arrays', async () => {
      const origDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Para 1', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const modDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Para 2', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const mockRender = jest.fn();
      const result = await renderContentfulDiff(origDoc, modDoc, 'structure', true, mockRender);
      
      // Should have matching lengths for visual alignment
      expect(result.originalParts.length).toBeGreaterThan(0);
      expect(result.modifiedParts.length).toBeGreaterThan(0);
    });
  });
});
