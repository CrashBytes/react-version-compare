import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Compare from '../components/Compare';
import { Document, BLOCKS } from '@contentful/rich-text-types';

describe('Compare', () => {
  it('renders string comparison correctly', () => {
    const original = 'I am Captain Kirk, Captain of the USS Enterprise.';
    const modified = 'I am Captain Picard, Captain of the USS Enterprise.';

    render(
      <Compare
        original={original}
        modified={modified}
      />
    );

    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Modified')).toBeInTheDocument();
  });

  it('renders array comparison correctly', () => {
    const original = ['line 1', 'line 2', 'line 3'];
    const modified = ['line 1', 'modified line 2', 'line 3'];

    render(
      <Compare
        original={original}
        modified={modified}
      />
    );

    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Modified')).toBeInTheDocument();
  });

  it('shows error for mismatched types', () => {
    render(
      <Compare
        original="string"
        modified={['array']}
      />
    );

    expect(screen.getByText(/Error: Both inputs must be either strings, arrays of strings, or Contentful documents/)).toBeInTheDocument();
  });

  it('handles array comparison with caseSensitive=false', () => {
    const original = ['Alpha', 'Bravo', 'Charlie'];
    const modified = ['alpha', 'bravo', 'charlie'];
    render(
      <Compare
        original={original}
        modified={modified}
        caseSensitive={false}
      />
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(document.querySelector('.diff-added')).toBeNull();
    expect(document.querySelector('.diff-removed')).toBeNull();
  });

  it('renders inline view mode', () => {
    const original = 'foo bar baz';
    const modified = 'foo bar qux';
    render(
      <Compare
        original={original}
        modified={modified}
        viewMode="inline"
      />
    );
    expect(document.querySelector('.compare-inline')).toBeInTheDocument();
    const diffUnchangedSpans = screen.getAllByText(/foo bar/i);
    expect(diffUnchangedSpans.length).toBeGreaterThan(0);
    expect(screen.getByText('baz')).toHaveClass('diff-removed');
    expect(screen.getByText('qux')).toHaveClass('diff-added');
  });

  it('handles array comparison with non-string values and caseSensitive=false', () => {
    const original = ['Alpha', 42, null];
    const modified = ['alpha', 42, null];
    render(
      <Compare
        original={original as any}
        modified={modified as any}
        caseSensitive={false}
      />
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    const numberInstances = screen.getAllByText('42');
    expect(numberInstances.length).toBe(2);
    const unchangedLines = document.querySelectorAll('.diff-unchanged-line');
    expect(unchangedLines.length).toBeGreaterThanOrEqual(2);
  });

  it('renders fallback item when indexOf returns -1 in array diff', () => {
    const original = ['a', 'b', 'c'];
    const modified = ['x', 'y', 'z'];
    render(
      <Compare
        original={original}
        modified={modified}
      />
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
    expect(screen.getByText('x')).toBeInTheDocument();
    expect(screen.getByText('y')).toBeInTheDocument();
    expect(screen.getByText('z')).toBeInTheDocument();
  });

  it('renders unchanged lines when arrays are identical', () => {
    const original = ['same', 'lines', 'here'];
    const modified = ['same', 'lines', 'here'];
    render(
      <Compare
        original={original}
        modified={modified}
      />
    );
    expect(screen.getAllByText('same').length).toBe(2);
    expect(screen.getAllByText('lines').length).toBe(2);
    expect(screen.getAllByText('here').length).toBe(2);
    expect(document.querySelector('.diff-added-line')).toBeNull();
    expect(document.querySelector('.diff-removed-line')).toBeNull();
  });

  // Helper function to create Contentful documents
  const createContentfulDoc = (content: any[]): Document => ({
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content
  });

  const createParagraph = (text: string) => ({
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: [
      {
        nodeType: 'text',
        value: text,
        marks: [],
        data: {}
      }
    ]
  });

  const createHeading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => ({
    nodeType: `heading-${level}` as any,
    data: {},
    content: [
      {
        nodeType: 'text',
        value: text,
        marks: [],
        data: {}
      }
    ]
  });

  const createListItem = (text: string) => ({
    nodeType: BLOCKS.LIST_ITEM,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: text,
            marks: [],
            data: {}
          }
        ]
      }
    ]
  });

  describe('Contentful Document Comparison', () => {
    it('renders Contentful documents in text mode', () => {
      const original = createContentfulDoc([
        createParagraph('Hello world'),
        createParagraph('This is a test')
      ]);
      const modified = createContentfulDoc([
        createParagraph('Hello universe'),
        createParagraph('This is a test')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="text"
        />
      );

      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('renders Contentful documents in structure mode', () => {
      const original = createContentfulDoc([
        createHeading('Welcome to Blog', 1),
        createParagraph('This is content')
      ]);
      const modified = createContentfulDoc([
        createHeading('Welcome to Updated Blog', 1),
        createParagraph('This is content')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
        />
      );

      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
      expect(screen.getAllByText('Heading').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Text').length).toBeGreaterThan(0);
    });

    it('handles structure mode with word-level changes in same element type', () => {
      const original = createContentfulDoc([
        createParagraph('This is regular content')
      ]);
      const modified = createContentfulDoc([
        createParagraph('This is updated content')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
        />
      );

      // Should show word-level highlighting within the same structure
      expect(screen.getAllByText('Text').length).toBeGreaterThan(0);
      expect(screen.getByText('regular')).toBeInTheDocument();
      expect(screen.getByText('updated')).toBeInTheDocument();
    });

    it('handles structure mode with different heading levels', () => {
      const original = createContentfulDoc([
        createHeading('Main Title', 1),
        createHeading('Subtitle', 2)
      ]);
      const modified = createContentfulDoc([
        createHeading('Main Title', 1),
        createHeading('Updated Subtitle', 2)
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
        />
      );

      expect(screen.getAllByText('Heading').length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Main Title/).length).toBeGreaterThan(0);
      expect(screen.getAllByText('Subtitle').length).toBeGreaterThan(0);
    });

    it('handles structure mode with added elements', () => {
      const original = createContentfulDoc([
        createParagraph('First paragraph')
      ]);
      const modified = createContentfulDoc([
        createParagraph('First paragraph'),
        createParagraph('Second paragraph')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
        />
      );

      expect(screen.getAllByText('Text').length).toBeGreaterThan(0);
      expect(screen.getAllByText(/First paragraph/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Second paragraph/)).toBeInTheDocument();
    });

    it('handles structure mode with removed elements', () => {
      const original = createContentfulDoc([
        createParagraph('First paragraph'),
        createParagraph('Second paragraph')
      ]);
      const modified = createContentfulDoc([
        createParagraph('First paragraph')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
        />
      );

      expect(screen.getAllByText('Text').length).toBeGreaterThan(0);
      expect(screen.getAllByText(/First paragraph/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Second paragraph/)).toBeInTheDocument();
    });

    it('handles structure mode with changed element types', () => {
      const original = createContentfulDoc([
        createParagraph('Content as paragraph')
      ]);
      const modified = createContentfulDoc([
        createHeading('Content as heading', 1)
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
        />
      );

      expect(screen.getByText('Text')).toBeInTheDocument();
      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('H1')).toBeInTheDocument();
    });

    it('handles text mode comparison for Contentful documents', () => {
      const original = createContentfulDoc([
        createHeading('Title', 1),
        createParagraph('First paragraph'),
        createParagraph('Second paragraph')
      ]);
      const modified = createContentfulDoc([
        createHeading('Title', 1),
        createParagraph('First paragraph'),
        createParagraph('Modified second paragraph')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="text"
        />
      );

      // In text mode, it should extract plain text and do word-level comparison
      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('handles inline view mode for Contentful documents', () => {
      const original = createContentfulDoc([
        createParagraph('Original content')
      ]);
      const modified = createContentfulDoc([
        createParagraph('Modified content')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="structure"
          viewMode="inline"
        />
      );

      // Should render in inline mode
      expect(document.querySelector('.compare-inline')).toBeInTheDocument();
    });

    it('shows error for mixed Contentful and non-Contentful inputs', () => {
      const contentfulDoc = createContentfulDoc([
        createParagraph('Test content')
      ]);

      render(
        <Compare
          original={contentfulDoc}
          modified="string content"
        />
      );

      expect(screen.getByText(/Error: Both inputs must be either strings, arrays of strings, or Contentful documents/)).toBeInTheDocument();
    });

    it('handles case sensitivity for Contentful text mode', () => {
      const original = createContentfulDoc([
        createParagraph('UPPERCASE TEXT')
      ]);
      const modified = createContentfulDoc([
        createParagraph('lowercase text')
      ]);

      render(
        <Compare
          original={original}
          modified={modified}
          compareMode="text"
          caseSensitive={false}
        />
      );

      expect(screen.getByText('Original')).toBeInTheDocument();
      expect(screen.getByText('Modified')).toBeInTheDocument();
    });
  });
});