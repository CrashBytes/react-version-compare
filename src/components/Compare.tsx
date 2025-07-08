import { diffWords, diffArrays } from 'diff';
import React from 'react';

// Types
export interface CompareProps {
  /**
   * The original content (string or array of strings)
   */
  original: string | string[];
  
  /**
   * The modified content (string or array of strings)
   */
  modified: string | string[];
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Whether to show as side-by-side or inline
   */
  viewMode?: 'side-by-side' | 'inline';
}

/**
 * Compare - A component for comparing two pieces of content with precise highlighting
 */
export const Compare: React.FC<CompareProps> = ({
  original,
  modified,
  className = '',
  viewMode = 'side-by-side'
}) => {
  
  // Handle string comparison
  const renderStringDiff = (orig: string, mod: string) => {
    const diff = diffWords(orig, mod);

    // Explicitly type as any[]
    const originalParts: any[] = [];
    const modifiedParts: any[] = [];
    
    for (const part of diff) {
      if (part.removed) {
        // This part was removed (exists in original but not modified)
        originalParts.push(
          <span key={originalParts.length} className="diff-removed">
            {part.value}
          </span>
        );
      } else if (part.added) {
        // This part was added (exists in modified but not original)
        modifiedParts.push(
          <span key={modifiedParts.length} className="diff-added">
            {part.value}
          </span>
        );
      } else {
        // This part is unchanged
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
    const diff = diffArrays(orig, mod);

    // Explicitly type as any[]
    const originalParts: any[] = [];
    const modifiedParts: any[] = [];
    
    for (const part of diff) {
      if (part.removed) {
        // Items removed from original
        part.value.forEach((item: string, index: number) => {
          originalParts.push(
            <div key={`${originalParts.length}-${index}`} className="diff-removed-line">
              {item}
            </div>
          );
        });
      } else if (part.added) {
        // Items added to modified
        part.value.forEach((item: string, index: number) => {
          modifiedParts.push(
            <div key={`${modifiedParts.length}-${index}`} className="diff-added-line">
              {item}
            </div>
          );
        });
      } else {
        // Unchanged items
        part.value.forEach((item: string, index: number) => {
          originalParts.push(
            <div key={`${originalParts.length}-${index}`} className="diff-unchanged-line">
              {item}
            </div>
          );
          modifiedParts.push(
            <div key={`${modifiedParts.length}-${index}`} className="diff-unchanged-line">
              {item}
            </div>
          );
        });
      }
    }
    
    return { originalParts, modifiedParts };
  };
  
  // Determine if we're comparing strings or arrays
  const isStringComparison = typeof original === 'string' && typeof modified === 'string';
  const isArrayComparison = Array.isArray(original) && Array.isArray(modified);
  
  if (!isStringComparison && !isArrayComparison) {
    return (
      <div className={`compare-error ${className}`}>
        Error: Both inputs must be either strings or arrays of strings
      </div>
    );
  }
  
  // Explicitly type as any[]
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