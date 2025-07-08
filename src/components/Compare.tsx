import { diffWords, diffArrays } from 'diff';
import React from 'react';

// Types
export interface CompareProps {
  original: string | string[];
  modified: string | string[];
  className?: string;
  viewMode?: 'side-by-side' | 'inline';
  caseSensitive?: boolean; // <-- Added
}

export const Compare: React.FC<CompareProps> = ({
  original,
  modified,
  className = '',
  viewMode = 'side-by-side',
  caseSensitive = true, // <-- Default true
}) => {
  // Handle string comparison
  const renderStringDiff = (orig: string, mod: string) => {
    const diff = diffWords(orig, mod, { ignoreCase: !caseSensitive });
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
  };

  // Handle array comparison
  const renderArrayDiff = (orig: string[], mod: string[]) => {
    let origArr = orig;
    let modArr = mod;
    if (!caseSensitive) {
      origArr = orig.map((s) => (typeof s === 'string' ? s.toLowerCase() : s));
      modArr = mod.map((s) => (typeof s === 'string' ? s.toLowerCase() : s));
    }
    const diff = diffArrays(origArr, modArr);
    const originalParts: any[] = [];
    const modifiedParts: any[] = [];
    for (const part of diff) {
      if (part.removed) {
        part.value.forEach((item: string, index: number) => {
          originalParts.push(
            <div key={`${originalParts.length}-${index}`} className="diff-removed-line">
              {orig[origArr.indexOf(item, originalParts.length)] ?? item}
            </div>
          );
        });
      } else if (part.added) {
        part.value.forEach((item: string, index: number) => {
          modifiedParts.push(
            <div key={`${modifiedParts.length}-${index}`} className="diff-added-line">
              {mod[modArr.indexOf(item, modifiedParts.length)] ?? item}
            </div>
          );
        });
      } else {
        part.value.forEach((item: string, index: number) => {
          originalParts.push(
            <div key={`${originalParts.length}-${index}`} className="diff-unchanged-line">
              {orig[origArr.indexOf(item, originalParts.length)] ?? item}
            </div>
          );
          modifiedParts.push(
            <div key={`${modifiedParts.length}-${index}`} className="diff-unchanged-line">
              {mod[modArr.indexOf(item, modifiedParts.length)] ?? item}
            </div>
          );
        });
      }
    }
    return { originalParts, modifiedParts };
  };

  const isStringComparison = typeof original === 'string' && typeof modified === 'string';
  const isArrayComparison = Array.isArray(original) && Array.isArray(modified);

  if (!isStringComparison && !isArrayComparison) {
    return (
      <div className={`compare-error ${className}`}>
        Error: Both inputs must be either strings or arrays of strings
      </div>
    );
  }

  let originalParts: any[], modifiedParts: any[];
  if (isStringComparison) {
    ({ originalParts, modifiedParts } = renderStringDiff(original as string, modified as string));
  } else {
    ({ originalParts, modifiedParts } = renderArrayDiff(original as string[], modified as string[]));
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