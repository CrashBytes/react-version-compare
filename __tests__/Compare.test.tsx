import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Compare } from '../src/components/Compare';
import { originalRichText, modifiedRichText } from '../__mocks__/richtext.mock';

describe('Compare', () => {
  it('Contentful Document Comparison handles structure mode with word-level changes in same element type', () => {
    render(
      <Compare
        original={originalRichText}
        modified={modifiedRichText}
        compareMode="structure"
        viewMode="side-by-side"
      />
    );
    expect(screen.getAllByText('Text').length).toBeGreaterThan(0);
    expect(screen.getByText((content) => content.includes('paragraph 1'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('updated'))).toBeInTheDocument();
  });

  it('Contentful Document Comparison handles structure mode with different heading levels', () => {
    const origDoc = {
      ...originalRichText,
      content: [
        {
          nodeType: 'heading-1',
          content: [
            { nodeType: 'text', value: 'Main Title', marks: [], data: {} }
          ],
          data: {}
        },
        {
          nodeType: 'heading-2',
          content: [
            { nodeType: 'text', value: 'Subtitle', marks: [], data: {} }
          ],
          data: {}
        }
      ]
    };
    const modDoc = {
      ...modifiedRichText,
      content: [
        {
          nodeType: 'heading-1',
          content: [
            { nodeType: 'text', value: 'Main Title', marks: [], data: {} }
          ],
          data: {}
        },
        {
          nodeType: 'heading-2',
          content: [
            { nodeType: 'text', value: 'Updated Subtitle', marks: [], data: {} }
          ],
          data: {}
        }
      ]
    };
    render(
      <Compare
        original={origDoc}
        modified={modDoc}
        compareMode="structure"
        viewMode="side-by-side"
      />
    );
    expect(screen.getAllByText('Heading').length).toBeGreaterThan(0);
    expect(screen.getAllByText((content) => content.includes('Main Title')).length).toBeGreaterThan(0);
    expect(screen.getAllByText((content) => content.includes('Subtitle')).length).toBeGreaterThan(0);
  });

  it('handles string comparison', () => {
    render(<Compare original="foo bar" modified="foo baz" />);
    expect(screen.getAllByText((content) => content.includes('foo')).length).toBeGreaterThan(0);
    expect(screen.getByText('bar')).toBeInTheDocument();
    expect(screen.getByText('baz')).toBeInTheDocument();
  });

  it('handles array comparison', () => {
    render(<Compare original={['a', 'b']} modified={['a', 'c']} />);
    expect(screen.getAllByText('a').length).toBeGreaterThan(1);
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
  });

  it('shows error for invalid input', () => {
    render(<Compare original={123 as any} modified={456 as any} />);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});