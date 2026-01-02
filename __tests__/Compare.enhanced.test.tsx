import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Compare } from '../src/components/Compare';
import { BLOCKS, type Document, type TopLevelBlock } from '@contentful/rich-text-types';

/**
 * Enhanced unit tests for Compare component
 * Focus: Edge cases, error handling, viewMode variations, caseSensitive options
 */

describe('Compare - Enhanced Coverage', () => {
  describe('String Comparison Tests', () => {
    it('handles identical strings', () => {
      const text = 'identical text';
      render(<Compare original={text} modified={text} />);
      
      expect(screen.getAllByText('identical text').length).toBeGreaterThan(0);
      // Both panels should show unchanged text
      const unchangedElements = document.querySelectorAll('.diff-unchanged');
      expect(unchangedElements.length).toBeGreaterThan(0);
    });

    it('handles empty strings', () => {
      render(<Compare original="" modified="" />);
      
      // Should render without crashing
      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('handles string with only whitespace', () => {
      render(<Compare original="   " modified="   " />);
      
      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('highlights word-level changes correctly', () => {
      render(<Compare original="foo bar baz" modified="foo qux baz" />);
      
      // "foo" and "baz" should be unchanged
      expect(screen.getAllByText((content) => content.includes('foo')).length).toBeGreaterThan(0);
      expect(screen.getAllByText((content) => content.includes('baz')).length).toBeGreaterThan(0);
      
      // "bar" should be removed, "qux" should be added
      expect(screen.getByText('bar')).toBeInTheDocument();
      expect(screen.getByText('qux')).toBeInTheDocument();
    });

    it('handles multi-line string differences', () => {
      const original = 'line one\nline two\nline three';
      const modified = 'line one\nline changed\nline three';
      
      render(<Compare original={original} modified={modified} />);
      
      expect(screen.getAllByText((content) => content.includes('line one')).length).toBeGreaterThan(0);
      expect(screen.getByText((content) => content.includes('two'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('changed'))).toBeInTheDocument();
    });

    it('handles special characters in strings', () => {
      render(<Compare original="test@example.com" modified="test@modified.com" />);
      
      expect(screen.getAllByText((content) => content.includes('test@')).length).toBeGreaterThan(0);
      expect(screen.getByText((content) => content.includes('example'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('modified'))).toBeInTheDocument();
    });

    it('handles unicode characters', () => {
      render(<Compare original="Hello 世界" modified="Hello 世界!" />);
      
      expect(screen.getAllByText((content) => content.includes('世界')).length).toBeGreaterThan(0);
    });
  });

  describe('Array Comparison Tests', () => {
    it('handles identical arrays', () => {
      const arr = ['a', 'b', 'c'];
      render(<Compare original={arr} modified={arr} />);
      
      expect(screen.getAllByText('a').length).toBe(2); // Original and Modified panels
      expect(screen.getAllByText('b').length).toBe(2);
      expect(screen.getAllByText('c').length).toBe(2);
    });

    it('handles empty arrays', () => {
      render(<Compare original={[]} modified={[]} />);
      
      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('handles arrays of different lengths - original longer', () => {
      render(<Compare original={['a', 'b', 'c']} modified={['a']} />);
      
      expect(screen.getAllByText('a').length).toBe(2);
      expect(screen.getByText('b')).toBeInTheDocument();
      expect(screen.getByText('c')).toBeInTheDocument();
      
      // Should have blank lines in modified panel
      const blankLines = document.querySelectorAll('.diff-blank-line');
      expect(blankLines.length).toBeGreaterThan(0);
    });

    it('handles arrays of different lengths - modified longer', () => {
      render(<Compare original={['a']} modified={['a', 'b', 'c']} />);
      
      expect(screen.getAllByText('a').length).toBe(2);
      expect(screen.getByText('b')).toBeInTheDocument();
      expect(screen.getByText('c')).toBeInTheDocument();
      
      const blankLines = document.querySelectorAll('.diff-blank-line');
      expect(blankLines.length).toBeGreaterThan(0);
    });

    it('handles arrays with empty string elements', () => {
      render(<Compare original={['a', '', 'c']} modified={['a', 'b', '']} />);
      
      expect(screen.getAllByText('a').length).toBe(2);
      expect(screen.getByText('b')).toBeInTheDocument();
      expect(screen.getByText('c')).toBeInTheDocument();
    });

    it('handles arrays with identical elements at different positions', () => {
      render(<Compare original={['foo', 'bar']} modified={['bar', 'foo']} />);
      
      expect(screen.getAllByText('foo').length).toBeGreaterThan(0);
      expect(screen.getAllByText('bar').length).toBeGreaterThan(0);
    });
  });

  describe('ViewMode Tests', () => {
    it('renders side-by-side view by default', () => {
      render(<Compare original="test" modified="test2" />);
      
      const sideBySide = document.querySelector('.compare-side-by-side');
      expect(sideBySide).toBeInTheDocument();
      
      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('renders inline view when specified', () => {
      render(<Compare original="test" modified="test2" viewMode="inline" />);
      
      const inline = document.querySelector('.compare-inline');
      expect(inline).toBeInTheDocument();
      
      // Inline mode should not show headers
      expect(screen.queryByText('Original')).not.toBeInTheDocument();
      expect(screen.queryByText('Modified')).not.toBeInTheDocument();
    });

    it('inline view combines original and modified content', () => {
      render(<Compare original="foo bar" modified="foo baz" viewMode="inline" />);
      
      const inlineContent = document.querySelector('.compare-content');
      expect(inlineContent).toBeInTheDocument();
      
      // Both removed and added should be in same container
      expect(screen.getByText('bar')).toBeInTheDocument();
      expect(screen.getByText('baz')).toBeInTheDocument();
    });
  });

  describe('ClassName Prop Tests', () => {
    it('applies custom className to side-by-side view', () => {
      const { container } = render(
        <Compare original="test" modified="test2" className="custom-class" />
      );
      
      const element = container.querySelector('.compare-side-by-side.custom-class');
      expect(element).toBeInTheDocument();
    });

    it('applies custom className to inline view', () => {
      const { container } = render(
        <Compare original="test" modified="test2" className="custom-class" viewMode="inline" />
      );
      
      const element = container.querySelector('.compare-inline.custom-class');
      expect(element).toBeInTheDocument();
    });

    it('applies custom className to error view', () => {
      const { container } = render(
        <Compare original={123 as any} modified={456 as any} className="custom-class" />
      );
      
      const element = container.querySelector('.compare-error.custom-class');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('shows error for null values', () => {
      render(<Compare original={null as any} modified={null as any} />);
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    it('shows error for undefined values', () => {
      render(<Compare original={undefined as any} modified={undefined as any} />);
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    it('shows error for mixed invalid types', () => {
      render(<Compare original="string" modified={123 as any} />);
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    it('shows error for object that is not Contentful document', () => {
      render(<Compare original={{ foo: 'bar' } as any} modified={{ baz: 'qux' } as any} />);
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    it('shows error for boolean values', () => {
      render(<Compare original={true as any} modified={false as any} />);
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    it('shows error for function values', () => {
      const fn = () => {};
      render(<Compare original={fn as any} modified={fn as any} />);
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });

  describe('Contentful Document Edge Cases', () => {
    it('handles Contentful document with empty content array', async () => {
      const emptyDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      };
      
      render(<Compare original={emptyDoc} modified={emptyDoc} compareMode="structure" />);
      
      // Should show loading state initially
      await waitFor(() => {
        expect(screen.getByText('Original')).toBeInTheDocument();
      });
    });

    it('handles Contentful document with single paragraph', async () => {
      const singlePara: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Single paragraph', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      render(<Compare original={singlePara} modified={singlePara} compareMode="structure" />);
      
      await waitFor(() => {
        expect(screen.getAllByText((content) => content.includes('Single paragraph')).length).toBeGreaterThan(0);
      });
    });

    it('shows loading state before Contentful diff completes', () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Test', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      render(<Compare original={doc} modified={doc} compareMode="text" />);
      
      // Loading state should appear - use getAllByText since it appears in both panels
      expect(screen.getAllByText('Loading...').length).toBe(2);
    });

    it('handles compareMode="text" for Contentful documents', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Test content', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      render(<Compare original={doc} modified={doc} compareMode="text" />);
      
      await waitFor(() => {
        expect(screen.getAllByText((content) => content.includes('Test content')).length).toBeGreaterThan(0);
      });
    });

    it('handles caseSensitive option with Contentful documents', async () => {
      const origDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'TEST', marks: [], data: {} }],
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
            content: [{ nodeType: 'text', value: 'test', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      render(<Compare original={origDoc} modified={modDoc} caseSensitive={false} compareMode="text" />);
      
      await waitFor(() => {
        expect(screen.getByText('Original')).toBeInTheDocument();
      });
    });
  });

  describe('React Lifecycle Tests', () => {
    it('cleans up on unmount for Contentful documents', async () => {
      const doc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: 'text', value: 'Test', marks: [], data: {} }],
            data: {}
          }
        ] as TopLevelBlock[]
      };
      
      const { unmount } = render(<Compare original={doc} modified={doc} compareMode="structure" />);
      
      // Should not throw on unmount
      expect(() => unmount()).not.toThrow();
    });

    it('updates diff when props change', async () => {
      const { rerender } = render(<Compare original="foo" modified="bar" />);
      
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
      
      rerender(<Compare original="baz" modified="qux" />);
      
      expect(screen.getByText('baz')).toBeInTheDocument();
      expect(screen.getByText('qux')).toBeInTheDocument();
    });

    it('updates viewMode when prop changes', () => {
      const { rerender } = render(<Compare original="test" modified="test2" viewMode="side-by-side" />);
      
      expect(document.querySelector('.compare-side-by-side')).toBeInTheDocument();
      
      rerender(<Compare original="test" modified="test2" viewMode="inline" />);
      
      expect(document.querySelector('.compare-inline')).toBeInTheDocument();
      expect(document.querySelector('.compare-side-by-side')).not.toBeInTheDocument();
    });
  });

  describe('CSS Class Application Tests', () => {
    it('applies correct classes for removed content', () => {
      render(<Compare original="removed text" modified="different text" />);
      
      const removedElements = document.querySelectorAll('.diff-removed');
      expect(removedElements.length).toBeGreaterThan(0);
    });

    it('applies correct classes for added content', () => {
      render(<Compare original="original text" modified="new text" />);
      
      const addedElements = document.querySelectorAll('.diff-added');
      expect(addedElements.length).toBeGreaterThan(0);
    });

    it('applies correct classes for unchanged content', () => {
      render(<Compare original="same text" modified="same text" />);
      
      const unchangedElements = document.querySelectorAll('.diff-unchanged');
      expect(unchangedElements.length).toBeGreaterThan(0);
    });

    it('applies correct classes for array comparison lines', () => {
      render(<Compare original={['removed']} modified={['added']} />);
      
      const removedLines = document.querySelectorAll('.diff-removed-line');
      const addedLines = document.querySelectorAll('.diff-added-line');
      
      expect(removedLines.length).toBeGreaterThan(0);
      expect(addedLines.length).toBeGreaterThan(0);
    });

    it('applies correct classes for unchanged array lines', () => {
      render(<Compare original={['same', 'different']} modified={['same', 'changed']} />);
      
      const unchangedLines = document.querySelectorAll('.diff-unchanged-line');
      expect(unchangedLines.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Tests', () => {
    it('renders semantic panel structure', () => {
      render(<Compare original="test" modified="test2" />);
      
      const panels = document.querySelectorAll('.compare-panel');
      expect(panels.length).toBe(2);
    });

    it('includes descriptive headers for panels', () => {
      render(<Compare original="test" modified="test2" />);
      
      const headers = document.querySelectorAll('.compare-header');
      expect(headers.length).toBe(2);
      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('maintains content structure in inline mode', () => {
      render(<Compare original="test" modified="test2" viewMode="inline" />);
      
      const content = document.querySelector('.compare-content');
      expect(content).toBeInTheDocument();
    });
  });
});
