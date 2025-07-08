import { diffWords, diffArrays } from 'diff';
import React from 'react';
import { Document, Block, Inline, Text, BLOCKS } from '@contentful/rich-text-types';

// Utility functions for Contentful Rich Text
const extractPlainText = (document: Document): string => {
  const extractFromNode = (node: Block | Inline | Text): string => {
    if (node.nodeType === 'text') {
      return (node as Text).value;
    }
    
    if ('content' in node && node.content) {
      return node.content.map(child => extractFromNode(child)).join('');
    }
    
    return '';
  };
  
  return extractFromNode(document);
};

const extractStructuredContent = (document: Document): Array<{ type: string; content: string; level?: number }> => {
  const result: Array<{ type: string; content: string; level?: number }> = [];
  
  const extractFromNode = (node: Block | Inline | Text): void => {
    if (node.nodeType === 'text') {
      // Skip standalone text nodes as they're usually part of a parent structure
      return;
    }
    
    if ('content' in node && node.content) {
      const textContent = node.content.map(child => 
        child.nodeType === 'text' ? (child as Text).value : ''
      ).join('');
      
      // Map node types to user-friendly names and extract heading levels
      let displayType: string = node.nodeType;
      let headingLevel: number | undefined;
      
      switch (node.nodeType) {
        case BLOCKS.HEADING_1:
          displayType = 'Heading';
          headingLevel = 1;
          break;
        case BLOCKS.HEADING_2:
          displayType = 'Heading';
          headingLevel = 2;
          break;
        case BLOCKS.HEADING_3:
          displayType = 'Heading';
          headingLevel = 3;
          break;
        case BLOCKS.HEADING_4:
          displayType = 'Heading';
          headingLevel = 4;
          break;
        case BLOCKS.HEADING_5:
          displayType = 'Heading';
          headingLevel = 5;
          break;
        case BLOCKS.HEADING_6:
          displayType = 'Heading';
          headingLevel = 6;
          break;
        case BLOCKS.PARAGRAPH:
          displayType = 'Text';
          break;
        case BLOCKS.UL_LIST:
          displayType = 'List';
          break;
        case BLOCKS.OL_LIST:
          displayType = 'Numbered List';
          break;
        case BLOCKS.LIST_ITEM:
          displayType = 'List Item';
          break;
        case BLOCKS.QUOTE:
          displayType = 'Quote';
          break;
        case BLOCKS.TABLE:
          displayType = 'Table';
          break;
        default:
          displayType = node.nodeType.charAt(0).toUpperCase() + node.nodeType.slice(1);
      }
      
      if (textContent.trim()) {
        result.push({
          type: displayType,
          content: textContent.trim(),
          level: headingLevel
        });
      }
      
      // Recursively process child nodes for nested structures like list items
      node.content.forEach(child => {
        if (child.nodeType !== 'text') {
          extractFromNode(child);
        }
      });
    }
  };
  
  if (document.content) {
    document.content.forEach(node => extractFromNode(node));
  }
  
  return result;
};

const isContentfulDocument = (value: any): value is Document => {
  return value && typeof value === 'object' && value.nodeType === BLOCKS.DOCUMENT && Array.isArray(value.content);
};

// Types
export interface CompareProps {
  original: string | string[] | Document;
  modified: string | string[] | Document;
  className?: string;
  viewMode?: 'side-by-side' | 'inline';
  caseSensitive?: boolean;
  compareMode?: 'text' | 'structure'; // New prop for Contentful documents
}

export const Compare: React.FC<CompareProps> = ({
  original,
  modified,
  className = '',
  viewMode = 'side-by-side',
  caseSensitive = true,
  compareMode = 'text', // Default to text comparison
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

  // Handle Contentful document comparison
  const renderContentfulDiff = (origDoc: Document, modDoc: Document) => {
    if (compareMode === 'structure') {
      // Compare structural elements
      const origStructure = extractStructuredContent(origDoc);
      const modStructure = extractStructuredContent(modDoc);
      
      // Create a more sophisticated comparison that can handle changes within the same structure type
      const maxLength = Math.max(origStructure.length, modStructure.length);
      const originalParts: any[] = [];
      const modifiedParts: any[] = [];
      
      for (let i = 0; i < maxLength; i++) {
        const origItem = origStructure[i];
        const modItem = modStructure[i];
        
        if (!origItem && modItem) {
          // Added item
          modifiedParts.push(
            <div key={`added-${i}`} className="diff-added-line">
              <span className="diff-structure-type">{modItem.type}</span>
              {modItem.level && <span className="diff-structure-level"> H{modItem.level}</span>}
              <span className="diff-structure-content">: {modItem.content}</span>
            </div>
          );
        } else if (origItem && !modItem) {
          // Removed item
          originalParts.push(
            <div key={`removed-${i}`} className="diff-removed-line">
              <span className="diff-structure-type">{origItem.type}</span>
              {origItem.level && <span className="diff-structure-level"> H{origItem.level}</span>}
              <span className="diff-structure-content">: {origItem.content}</span>
            </div>
          );
        } else if (origItem && modItem) {
          // Compare items at the same position
          const sameType = origItem.type === modItem.type && origItem.level === modItem.level;
          
          if (sameType && origItem.content !== modItem.content) {
            // Same structure type but different content - show word-level diff
            const wordDiff = diffWords(origItem.content, modItem.content, { ignoreCase: !caseSensitive });
            
            const origContentParts: any[] = [];
            const modContentParts: any[] = [];
            
            for (const part of wordDiff) {
              if (part.removed) {
                origContentParts.push(
                  <span key={origContentParts.length} className="diff-removed">
                    {part.value}
                  </span>
                );
              } else if (part.added) {
                modContentParts.push(
                  <span key={modContentParts.length} className="diff-added">
                    {part.value}
                  </span>
                );
              } else {
                origContentParts.push(
                  <span key={origContentParts.length} className="diff-unchanged">
                    {part.value}
                  </span>
                );
                modContentParts.push(
                  <span key={modContentParts.length} className="diff-unchanged">
                    {part.value}
                  </span>
                );
              }
            }
            
            originalParts.push(
              <div key={`orig-${i}`} className="diff-unchanged-line">
                <span className="diff-structure-type">{origItem.type}</span>
                {origItem.level && <span className="diff-structure-level"> H{origItem.level}</span>}
                <span className="diff-structure-content">: {origContentParts}</span>
              </div>
            );
            modifiedParts.push(
              <div key={`mod-${i}`} className="diff-unchanged-line">
                <span className="diff-structure-type">{modItem.type}</span>
                {modItem.level && <span className="diff-structure-level"> H{modItem.level}</span>}
                <span className="diff-structure-content">: {modContentParts}</span>
              </div>
            );
          } else if (sameType && origItem.content === modItem.content) {
            // Completely unchanged
            originalParts.push(
              <div key={`unchanged-orig-${i}`} className="diff-unchanged-line">
                <span className="diff-structure-type">{origItem.type}</span>
                {origItem.level && <span className="diff-structure-level"> H{origItem.level}</span>}
                <span className="diff-structure-content">: {origItem.content}</span>
              </div>
            );
            modifiedParts.push(
              <div key={`unchanged-mod-${i}`} className="diff-unchanged-line">
                <span className="diff-structure-type">{modItem.type}</span>
                {modItem.level && <span className="diff-structure-level"> H{modItem.level}</span>}
                <span className="diff-structure-content">: {modItem.content}</span>
              </div>
            );
          } else {
            // Different structure types - show as removed and added
            originalParts.push(
              <div key={`changed-orig-${i}`} className="diff-removed-line">
                <span className="diff-structure-type">{origItem.type}</span>
                {origItem.level && <span className="diff-structure-level"> H{origItem.level}</span>}
                <span className="diff-structure-content">: {origItem.content}</span>
              </div>
            );
            modifiedParts.push(
              <div key={`changed-mod-${i}`} className="diff-added-line">
                <span className="diff-structure-type">{modItem.type}</span>
                {modItem.level && <span className="diff-structure-level"> H{modItem.level}</span>}
                <span className="diff-structure-content">: {modItem.content}</span>
              </div>
            );
          }
        }
      }
      
      return { originalParts, modifiedParts };
    } else {
      // Text-based comparison of Contentful documents
      const origText = extractPlainText(origDoc);
      const modText = extractPlainText(modDoc);
      return renderStringDiff(origText, modText);
    }
  };

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
    ({ originalParts, modifiedParts } = renderContentfulDiff(original as Document, modified as Document));
  } else {
    // This should never happen due to the check above, but provide a fallback
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