import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Compare } from '../src/components/Compare';
import { originalRichText, modifiedRichText } from '../__mocks__/richtext.mock';

describe('Compare', () => {
  it('Contentful Document Comparison handles structure mode with word-level changes in same element type', async () => {
    render(
      <Compare
        original={originalRichText}
        modified={modifiedRichText}
        compareMode="structure"
        viewMode="side-by-side"
      />
    );
    // Wait for async diff to finish
    expect(await screen.findAllByText('Heading')).not.toHaveLength(0);
    expect(await screen.findAllByText('Text')).not.toHaveLength(0);
    expect(await screen.findAllByText('List Item')).not.toHaveLength(0);
    expect(await screen.findAllByText('Quote')).not.toHaveLength(0);
    expect(
      (await screen.findAllByText((content) => content.toLowerCase().includes('tabl'))).length
    ).toBeGreaterThan(0);
    expect(await screen.findAllByText('Hyperlink')).not.toHaveLength(0);

    expect(
      (await screen.findAllByText((content) => content.includes('The Fellowship of the Ring'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('One Ring to rule them all'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('Frodo Baggins'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('Even the smallest person can change the course of the future'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('Gimli'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('Boromir'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('The Council of Elrond'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('I am no man!'))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText((content) => content.includes('Updated'))).length
    ).toBeGreaterThan(0);
  });

  it('Contentful Document Comparison handles structure mode with different heading levels', async () => {
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
    expect((await screen.findAllByText('Heading')).length).toBeGreaterThan(0);
    expect((await screen.findAllByText((content) => content.includes('Main Title'))).length).toBeGreaterThan(0);
    expect((await screen.findAllByText((content) => content.includes('Subtitle'))).length).toBeGreaterThan(0);
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