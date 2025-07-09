import React from 'react';
import { Document } from '@contentful/rich-text-types';
import {
  isContentfulDocument,
  renderContentfulDiff
} from './contentfulDiff';

function renderStringDiff(orig: string, mod: string) {
  const { diffWords } = require('diff');
  const diff = diffWords(orig, mod);
  const originalParts: any[] = [];
  const modifiedParts: any[] = [];
  for (const part of diff) {
    if (part.removed) {
      originalParts.push(
        <span key={originalParts.length} className="diff-removed">
          {part.value}
        </span>
      );
    } else if (part.added) {
      modifiedParts.push(
        <span key={modifiedParts.length} className="diff-added">
          {part.value}
        </span>
      );
    } else {
      originalParts.push(
        <span key={originalParts.length} className="diff-unchanged">
          {part.value}
        </span>
      );
      modifiedParts.push(
        <span key={modifiedParts.length} className="diff-unchanged">
          {part.value}
        </span>
      );
    }
  }
  return { originalParts, modifiedParts };
}

function renderArrayDiff(original: string[], modified: string[]) {
  const maxLength = Math.max(original.length, modified.length);
  const originalParts: any[] = [];
  const modifiedParts: any[] = [];
  for (let i = 0; i < maxLength; i++) {
    const orig = original[i] ?? '';
    const mod = modified[i] ?? '';
    if (orig === mod) {
      originalParts.push(
        <div key={`orig-${i}`} className="diff-unchanged-line">{orig}</div>
      );
      modifiedParts.push(
        <div key={`mod-${i}`} className="diff-unchanged-line">{mod}</div>
      );
    } else {
      originalParts.push(
        <div key={`orig-${i}`} className={orig ? "diff-removed-line" : "diff-blank-line"}>{orig}</div>
      );
      modifiedParts.push(
        <div key={`mod-${i}`} className={mod ? "diff-added-line" : "diff-blank-line"}>{mod}</div>
      );
    }
  }
  return { originalParts, modifiedParts };
}

export interface CompareProps {
  original: string | string[] | Document;
  modified: string | string[] | Document;
  className?: string;
  viewMode?: 'side-by-side' | 'inline';
  caseSensitive?: boolean;
  compareMode?: 'text' | 'structure';
}

export const Compare: React.FC<CompareProps> = ({
  original,
  modified,
  className = '',
  viewMode = 'side-by-side',
  caseSensitive = true,
  compareMode = 'text',
}) => {
  const isStringComparison = typeof original === 'string' && typeof modified === 'string';
  const isArrayComparison = Array.isArray(original) && Array.isArray(modified);
  const isContentfulComparison = isContentfulDocument(original) && isContentfulDocument(modified);

  if (!isStringComparison && !isArrayComparison && !isContentfulComparison) {
    return (
      <div className={`compare-error ${className}`}>
        Error: Both inputs must be either strings, arrays of strings, or Contentful documents
      </div>
    );
  }

  let originalParts: any[], modifiedParts: any[];
  if (isStringComparison) {
    ({ originalParts, modifiedParts } = renderStringDiff(original as string, modified as string));
  } else if (isArrayComparison) {
    ({ originalParts, modifiedParts } = renderArrayDiff(original as string[], modified as string[]));
  } else if (isContentfulComparison) {
    ({ originalParts, modifiedParts } = renderContentfulDiff(
      original as Document,
      modified as Document,
      compareMode,
      caseSensitive,
      renderStringDiff
    ));
  } else {
    originalParts = [];
    modifiedParts = [];
  }

  if (viewMode === 'inline') {
    return (
      <div className={`compare-inline ${className}`}>
        <div className="compare-content">
          {originalParts}
          {modifiedParts}
        </div>
      </div>
    );
  }

  return (
    <div className={`compare-side-by-side ${className}`}>
      <div className="compare-panel">
        <div className="compare-header original-header">Original</div>
        <div className="compare-content original-content">
          {originalParts}
        </div>
      </div>
      <div className="compare-panel">
        <div className="compare-header modified-header">Modified</div>
        <div className="compare-content modified-content">
          {modifiedParts}
        </div>
      </div>
    </div>
  );
};

export default Compare;