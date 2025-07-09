import React from 'react';
import { render } from '@testing-library/react';
import {
  extractPlainText,
  extractStructuredContent,
  isContentfulDocument,
  renderContentfulDiff,
} from '../src/components/contentfulDiff';
import { originalRichText, modifiedRichText } from '../__mocks__/richtext.mock';
import type { Document } from '@contentful/rich-text-types';


describe('contentfulDiff utilities', () => {
  it('extractPlainText returns all text', () => {
    const text = extractPlainText(originalRichText);
    expect(text).toContain('Test this paragraph 1');
    expect(text).toContain('hepp');
  });

  it('extractStructuredContent returns structure array', () => {
    const structure = extractStructuredContent(originalRichText);
    expect(Array.isArray(structure)).toBe(true);
    expect(structure.some(s => s.content.includes('Test this paragraph 1'))).toBe(true);
  });

  it('isContentfulDocument detects valid docs', () => {
    expect(isContentfulDocument(originalRichText)).toBe(true);
    expect(isContentfulDocument({})).toBe(false);
    expect(isContentfulDocument('notadoc')).toBe(false);
  });

  it('renderContentfulDiff (text mode) returns diff parts', () => {
    const { originalParts, modifiedParts } = renderContentfulDiff(
      originalRichText,
      modifiedRichText,
      'text',
      true,
      (a, b) => ({ originalParts: [<span key="o">{a}</span>], modifiedParts: [<span key="m">{b}</span>] })
    );
    expect(Array.isArray(originalParts)).toBe(true);
    expect(Array.isArray(modifiedParts)).toBe(true);
  });

  it('renderContentfulDiff (structure mode) returns diff parts', () => {
    const { originalParts, modifiedParts } = renderContentfulDiff(
      originalRichText,
      modifiedRichText,
      'structure',
      true,
      (a, b) => ({ originalParts: [<span key="o">{a}</span>], modifiedParts: [<span key="m">{b}</span>] })
    );
    expect(Array.isArray(originalParts)).toBe(true);
    expect(Array.isArray(modifiedParts)).toBe(true);
  });
});