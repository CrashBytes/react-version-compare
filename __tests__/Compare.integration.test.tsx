import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { Compare } from '../src/components/Compare';
import { BLOCKS, type Document, type TopLevelBlock } from '@contentful/rich-text-types';

/**
 * Integration tests for Compare component
 * Focus: Real-world usage scenarios, complex workflows, edge case combinations
 */

describe('Compare - Integration Tests', () => {
  describe('Real-World String Comparison Scenarios', () => {
    it('handles code snippets with special characters', () => {
      const original = 'const foo = (bar) => { return bar * 2; };';
      const modified = 'const foo = (bar) => { return bar * 3; };';
      
      render(<Compare original={original} modified={modified} />);
      
      expect(screen.getAllByText((content) => content.includes('const foo')).length).toBeGreaterThan(0);
      expect(screen.getByText((content) => content.includes('2'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('3'))).toBeInTheDocument();
    });

    it('handles JSON comparison', () => {
      const original = '{"name": "John", "age": 30}';
      const modified = '{"name": "Jane", "age": 30}';
      
      render(<Compare original={original} modified={modified} />);
      
      expect(screen.getAllByText((content) => content.includes('age'))).not.toHaveLength(0);
      expect(screen.getByText((content) => content.includes('John'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Jane'))).toBeInTheDocument();
    });

    it('handles markdown content', () => {
      const original = '# Title\n\nThis is **bold** text.';
      const modified = '# Updated Title\n\nThis is **bold** text.';
      
      render(<Compare original={original} modified={modified} />);
      
      expect(screen.getAllByText((content) => content.includes('Title')).length).toBeGreaterThan(0);
      expect(screen.getByText((content) => content.includes('Updated'))).toBeInTheDocument();
    });

    it('handles SQL queries', () => {
      const original = 'SELECT * FROM users WHERE id = 1;';
      const modified = 'SELECT * FROM users WHERE id = 2;';
      
      render(<Compare original={original} modified={modified} />);
      
      expect(screen.getAllByText((content) => content.includes('SELECT')).length).toBeGreaterThan(0);
      expect(screen.getByText((content) => content.includes('1'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('2'))).toBeInTheDocument();
    });

    it('handles email addresses', () => {
      const original = 'Contact: john@example.com for details.';
      const modified = 'Contact: jane@example.com for details.';
      
      render(<Compare original={original} modified={modified} />);
      
      // Text is split across elements, check for individual parts
      expect(screen.getByText('john')).toBeInTheDocument();
      expect(screen.getByText('jane')).toBeInTheDocument();
      expect(screen.getAllByText((content) => content.includes('@example.com')).length).toBeGreaterThan(0);
    });

    it('handles URLs', () => {
      const original = 'Visit https://example.com/old-page';
      const modified = 'Visit https://example.com/new-page';
      
      render(<Compare original={original} modified={modified} />);
      
      // Text is split across elements, check for individual parts
      expect(screen.getByText('old')).toBeInTheDocument();
      expect(screen.getByText('new')).toBeInTheDocument();
      expect(screen.getAllByText((content) => content.includes('-page')).length).toBeGreaterThan(0);
    });
  });

  describe('Real-World Array Comparison Scenarios', () => {
    it('handles version numbers', () => {
      render(
        <Compare 
          original={['1.0.0', '1.1.0', '1.2.0']} 
          modified={['1.0.0', '1.1.1', '1.2.0']} 
        />
      );
      
      expect(screen.getAllByText('1.0.0').length).toBe(2);
      expect(screen.getByText('1.1.0')).toBeInTheDocument();
      expect(screen.getByText('1.1.1')).toBeInTheDocument();
    });

    it('handles file paths', () => {
      render(
        <Compare 
          original={['/src/index.ts', '/src/utils.ts']} 
          modified={['/src/index.ts', '/src/helpers.ts']} 
        />
      );
      
      expect(screen.getAllByText('/src/index.ts').length).toBe(2);
      expect(screen.getByText('/src/utils.ts')).toBeInTheDocument();
      expect(screen.getByText('/src/helpers.ts')).toBeInTheDocument();
    });

    it('handles dependency lists', () => {
      render(
        <Compare 
          original={['react@18.0.0', 'typescript@5.0.0']} 
          modified={['react@18.2.0', 'typescript@5.0.0']} 
        />
      );
      
      expect(screen.getByText('react@18.0.0')).toBeInTheDocument();
      expect(screen.getByText('react@18.2.0')).toBeInTheDocument();
      expect(screen.getAllByText('typescript@5.0.0').length).toBe(2);
    });

    it('handles configuration options', () => {
      render(
        <Compare 
          original={['debug=true', 'port=3000', 'host=localhost']} 
          modified={['debug=false', 'port=3000', 'host=localhost']} 
        />
      );
      
      expect(screen.getByText('debug=true')).toBeInTheDocument();
      expect(screen.getByText('debug=false')).toBeInTheDocument();
    });
  });

  describe('Complex Contentful Document Scenarios', () => {
    it('handles mixed content types in structure mode', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.HEADING_1,
            content: [{ nodeType: 'text', value: 'Title', marks: [], data: {} }],
            data: {}
          },
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Paragraph', marks: [], data: {} }],
            data: {}
          },
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
          },
          {
            nodeType: BLOCKS.QUOTE,
            content: [{ nodeType: 'text', value: 'Quote', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      render(<Compare original={doc} modified={doc} compareMode="structure" />);
      
      await waitFor(() => {
        expect(screen.getAllByText('Heading').length).toBeGreaterThan(0);
        expect(screen.getAllByText((content) => content.includes('Title')).length).toBeGreaterThan(0);
      });
    });

    it('handles document with only nested content', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.UL_LIST,
            content: [
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Nested 1', marks: [], data: {} }],
                data: {}
              },
              {
                nodeType: BLOCKS.LIST_ITEM,
                content: [{ nodeType: 'text', value: 'Nested 2', marks: [], data: {} }],
                data: {}
              }
            ],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      render(<Compare original={doc} modified={doc} compareMode="structure" />);
      
      await waitFor(() => {
        expect(screen.getAllByText((content) => content.includes('Nested 1')).length).toBeGreaterThan(0);
      });
    });

    it('handles deeply nested table structure', async () => {
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
                    content: [{ nodeType: 'text', value: 'A1', marks: [], data: {} }],
                    data: {}
                  },
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    content: [{ nodeType: 'text', value: 'A2', marks: [], data: {} }],
                    data: {}
                  }
                ],
                data: {}
              },
              {
                nodeType: BLOCKS.TABLE_ROW,
                content: [
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    content: [{ nodeType: 'text', value: 'B1', marks: [], data: {} }],
                    data: {}
                  },
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    content: [{ nodeType: 'text', value: 'B2', marks: [], data: {} }],
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
      
      render(<Compare original={doc} modified={doc} compareMode="structure" />);
      
      await waitFor(() => {
        expect(screen.getAllByText((content) => content.includes('A1')).length).toBeGreaterThan(0);
      });
    });
  });

  describe('ViewMode Switching Scenarios', () => {
    it('maintains content when switching from side-by-side to inline', () => {
      const { rerender } = render(
        <Compare original="test content" modified="modified content" viewMode="side-by-side" />
      );
      
      expect(screen.getByText('Original')).toBeInTheDocument();
      
      rerender(
        <Compare original="test content" modified="modified content" viewMode="inline" />
      );
      
      expect(screen.queryByText('Original')).not.toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('test'))).toBeInTheDocument();
    });

    it('preserves diff highlighting across viewMode changes', () => {
      const { rerender } = render(
        <Compare original="foo bar" modified="foo baz" viewMode="side-by-side" />
      );
      
      expect(document.querySelectorAll('.diff-removed').length).toBeGreaterThan(0);
      
      rerender(
        <Compare original="foo bar" modified="foo baz" viewMode="inline" />
      );
      
      expect(document.querySelectorAll('.diff-removed').length).toBeGreaterThan(0);
    });
  });

  describe('Performance and Large Content Scenarios', () => {
    it('handles large string comparison', () => {
      const largeText = 'word '.repeat(1000);
      const largeTextMod = largeText.replace('word ', 'changed ');
      
      render(<Compare original={largeText} modified={largeTextMod} />);
      
      expect(screen.getByText('changed')).toBeInTheDocument();
    });

    it('handles large array comparison', () => {
      const largeArray = Array.from({ length: 100 }, (_, i) => `item-${i}`);
      const largeArrayMod = [...largeArray];
      largeArrayMod[50] = 'modified-item';
      
      render(<Compare original={largeArray} modified={largeArrayMod} />);
      
      expect(screen.getByText('modified-item')).toBeInTheDocument();
    });

    it('handles document with many paragraphs', async () => {
      const manyParas: TopLevelBlock[] = Array.from({ length: 20 }, (_, i) => ({
        nodeType: BLOCKS.PARAGRAPH,
        content: [{ nodeType: 'text', value: `Paragraph ${i}`, marks: [], data: {} }],
        data: {}
      }));
      
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: manyParas
      };
      
      render(<Compare original={doc} modified={doc} compareMode="text" />);
      
      await waitFor(() => {
        expect(screen.getAllByText((content) => content.includes('Paragraph')).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Edge Case Combinations', () => {
    it('handles inline mode with array comparison', () => {
      render(
        <Compare 
          original={['a', 'b']} 
          modified={['a', 'c']} 
          viewMode="inline" 
        />
      );
      
      const inline = document.querySelector('.compare-inline');
      expect(inline).toBeInTheDocument();
      expect(screen.getAllByText('a').length).toBeGreaterThan(0);
    });

    it('handles custom className with error state', () => {
      const { container } = render(
        <Compare 
          original={null as any} 
          modified={null as any} 
          className="my-error-class" 
        />
      );
      
      const errorElement = container.querySelector('.compare-error.my-error-class');
      expect(errorElement).toBeInTheDocument();
    });

    it('handles rapid prop updates', () => {
      const { rerender } = render(<Compare original="v1" modified="v1-mod" />);
      
      rerender(<Compare original="v2" modified="v2-mod" />);
      rerender(<Compare original="v3" modified="v3-mod" />);
      rerender(<Compare original="v4" modified="v4-mod" />);
      
      // v4 appears in both panels
      expect(screen.getAllByText('v4').length).toBe(2);
      expect(screen.getByText('-mod')).toBeInTheDocument();
    });

    it('handles switching between comparison types', () => {
      const { rerender } = render(<Compare original="string" modified="changed" />);
      
      expect(screen.getByText('string')).toBeInTheDocument();
      
      rerender(<Compare original={['array']} modified={['changed']} />);
      
      expect(screen.getAllByText('array').length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Integration', () => {
    it('maintains proper heading hierarchy in side-by-side mode', () => {
      render(<Compare original="test" modified="test2" />);
      
      const headers = document.querySelectorAll('.compare-header');
      expect(headers.length).toBe(2);
      
      const panels = document.querySelectorAll('.compare-panel');
      expect(panels.length).toBe(2);
    });

    it('provides semantic structure for screen readers', () => {
      render(<Compare original="original text" modified="modified text" />);
      
      const originalPanel = screen.getByText('Original').closest('.compare-panel');
      const modifiedPanel = screen.getByText('Modified').closest('.compare-panel');
      
      expect(originalPanel).toBeInTheDocument();
      expect(modifiedPanel).toBeInTheDocument();
    });
  });

  describe('CSS Class Integration', () => {
    it('applies all necessary classes in side-by-side mode', () => {
      render(<Compare original="foo bar" modified="foo baz" />);
      
      expect(document.querySelector('.compare-side-by-side')).toBeInTheDocument();
      expect(document.querySelectorAll('.compare-panel').length).toBe(2);
      expect(document.querySelectorAll('.compare-header').length).toBe(2);
      expect(document.querySelectorAll('.compare-content').length).toBe(2);
      expect(document.querySelector('.original-header')).toBeInTheDocument();
      expect(document.querySelector('.modified-header')).toBeInTheDocument();
      expect(document.querySelector('.original-content')).toBeInTheDocument();
      expect(document.querySelector('.modified-content')).toBeInTheDocument();
    });

    it('applies correct diff classes for mixed changes', () => {
      render(<Compare original="same different" modified="same changed" />);
      
      expect(document.querySelectorAll('.diff-unchanged').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.diff-removed').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.diff-added').length).toBeGreaterThan(0);
    });
  });
});
