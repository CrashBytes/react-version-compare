import React from 'react';
import { render } from '@testing-library/react';
import {
  extractPlainText,
  extractStructuredContent,
  isContentfulDocument,
  renderContentfulDiff,
} from '@components/contentfulDiff';
import { originalRichText, modifiedRichText } from '@mocks/richtext.mock';
import type { Document } from '@contentful/rich-text-types';

describe('contentfulDiff utilities', () => {
  it('extractPlainText returns all text', () => {
    const text = extractPlainText(originalRichText);
    expect(text).toContain('The Fellowship of the Ring');
    expect(text).toContain('One Ring to rule them all');
    expect(text).toContain('Frodo Baggins');
    expect(text).toContain('Gimli');
    expect(text).toContain('Even the smallest person can change the course of the future.');
    expect(text).toContain('Not all those who wander are lost.');
    expect(text).toContain('I am no man!');
  });

  it('extractPlainText returns empty string for invalid doc', () => {
    const text = extractPlainText({} as Document);
    expect(text).toBe('');
  });

  it('extractStructuredContent returns structure array with all types', () => {
    const structure = extractStructuredContent(originalRichText);
    expect(Array.isArray(structure)).toBe(true);
    expect(structure.some(s => s.type === 'Heading' && s.content.includes('The Fellowship of the Ring'))).toBe(true);
    expect(structure.some(s => s.type === 'List Item' && s.content.includes('Frodo Baggins'))).toBe(true);
    expect(structure.some(s => s.type === 'List Item' && s.content.includes('Gandalf the Grey'))).toBe(true);
    expect(structure.some(s => s.type === 'List Item' && s.content.includes('Legolas Greenleaf'))).toBe(true);
    expect(structure.some(s => s.type === 'Quote' && s.content.includes('Even the smallest person'))).toBe(true);
    expect(structure.some(s => s.type && s.type.toLowerCase().includes('tabl'))).toBe(true);
    expect(structure.some(s => s.type === 'Text' && s.content.includes('Not all those who wander are lost.'))).toBe(true);
    expect(structure.some(s => s.type === 'Text' && s.content.includes('I am no man!'))).toBe(true);
    expect(structure.some(s => s.type === 'Text' && s.content.includes('One Ring to rule them all'))).toBe(true);
    expect(structure.some(s => s.type === 'Text' && s.content.includes('All we have to decide is what to do with the time that is given us.'))).toBe(true);
    expect(structure.some(s => s.type === 'Text' && s.content.includes('You shall not pass!'))).toBe(true);
    expect(structure.some(s => s.type === 'Text' && s.content.includes('There is some good in this world'))).toBe(true);
    expect(structure.some(s => s.type === 'Hyperlink' && s.content.includes('The Council of Elrond'))).toBe(true);
  });

  it('extractStructuredContent returns empty array for invalid doc', () => {
    const structure = extractStructuredContent({} as Document);
    expect(Array.isArray(structure)).toBe(true);
    expect(structure.length).toBe(0);
  });

  it('isContentfulDocument detects valid docs', () => {
    expect(isContentfulDocument(originalRichText)).toBe(true);
    expect(isContentfulDocument({})).toBe(false);
    expect(isContentfulDocument('notadoc')).toBe(false);
  });

  it('renderContentfulDiff (text mode) returns diff parts for all types', async () => {
    const { originalParts, modifiedParts } = await renderContentfulDiff(
      originalRichText,
      modifiedRichText,
      'text',
      true,
      (a, b) => ({ originalParts: [<span key="o">{a}</span>], modifiedParts: [<span key="m">{b}</span>] })
    );
    expect(Array.isArray(originalParts)).toBe(true);
    expect(Array.isArray(modifiedParts)).toBe(true);
    expect(originalParts.some(part => typeof part === 'object')).toBe(true);
    expect(modifiedParts.some(part => typeof part === 'object')).toBe(true);
  });

  it('renderContentfulDiff (structure mode) returns diff parts for all types', async () => {
    const { originalParts, modifiedParts } = await renderContentfulDiff(
      originalRichText,
      modifiedRichText,
      'structure',
      true,
      (a, b) => ({ originalParts: [<span key="o">{a}</span>], modifiedParts: [<span key="m">{b}</span>] })
    );
    expect(Array.isArray(originalParts)).toBe(true);
    expect(Array.isArray(modifiedParts)).toBe(true);
    expect(originalParts.some(part => typeof part === 'object')).toBe(true);
    expect(modifiedParts.some(part => typeof part === 'object')).toBe(true);
  });

  it('renderContentfulDiff returns empty arrays for invalid docs', async () => {
    const { originalParts, modifiedParts } = await renderContentfulDiff(
      {} as Document,
      {} as Document,
      'structure',
      true,
      (a, b) => ({ originalParts: [a], modifiedParts: [b] })
    );
    expect(Array.isArray(originalParts)).toBe(true);
    expect(Array.isArray(modifiedParts)).toBe(true);
    expect(originalParts.length).toBe(0);
    expect(modifiedParts.length).toBe(0);
  });

  it('renderContentfulDiff falls back to text mode for unknown compareMode', async () => {
    const { originalParts, modifiedParts } = await renderContentfulDiff(
      originalRichText,
      modifiedRichText,
      'unknown' as any,
      true,
      (a, b) => ({ originalParts: [<span key="o">{a}</span>], modifiedParts: [<span key="m">{b}</span>] })
    );
    expect(Array.isArray(originalParts)).toBe(true);
    expect(Array.isArray(modifiedParts)).toBe(true);
  });
});