import React from 'react';
import { Document, Block, Inline, Text, BLOCKS } from '@contentful/rich-text-types';

// ...extractPlainText, extractStructuredContent, isContentfulDocument (unchanged)...

export async function renderContentfulDiff(
  origDoc: Document,
  modDoc: Document,
  compareMode: 'text' | 'structure',
  caseSensitive: boolean,
  renderStringDiff: (a: string, b: string) => { originalParts: any[]; modifiedParts: any[] }
) {
  // Dynamically import diff (CJS) for Vite/ESM compatibility
  const Diff = await import('diff');
  const { diffWords, diffArrays } = Diff;

  if (compareMode === 'structure') {
    const origStructure = extractStructuredContent(origDoc);
    const modStructure = extractStructuredContent(modDoc);

    const diff = diffArrays(
      origStructure,
      modStructure,
      {
        comparator: (a: any, b: any) =>
          a.type === b.type &&
          a.content === b.content &&
          a.level === b.level
      }
    );

    const originalParts: any[] = [];
    const modifiedParts: any[] = [];

    let origIdx = 0;
    let modIdx = 0;

    diff.forEach((part: any) => {
      if (part.added) {
        part.value.forEach((modItem: any, i: number) => {
          originalParts.push(
            <div key={`blank-orig-${modIdx + i}`} className="diff-blank-line" />
          );
          modifiedParts.push(
            <div key={`added-mod-${modIdx + i}`} className="diff-added-line">
              <span className="diff-structure-type">{modItem.type}</span>
              {modItem.level && <span className="diff-structure-level"> H{modItem.level}</span>}
              <span className="diff-structure-content">: {modItem.content}</span>
            </div>
          );
        });
        modIdx += part.count || 0;
      } else if (part.removed) {
        part.value.forEach((origItem: any, i: number) => {
          originalParts.push(
            <div key={`removed-orig-${origIdx + i}`} className="diff-removed-line">
              <span className="diff-structure-type">{origItem.type}</span>
              {origItem.level && <span className="diff-structure-level"> H{origItem.level}</span>}
              <span className="diff-structure-content">: {origItem.content}</span>
            </div>
          );
          modifiedParts.push(
            <div key={`blank-mod-${origIdx + i}`} className="diff-blank-line" />
          );
        });
        origIdx += part.count || 0;
      } else {
        part.value.forEach((item: any, i: number) => {
          originalParts.push(
            <div key={`unchanged-orig-${origIdx + i}`} className="diff-unchanged-line">
              <span className="diff-structure-type">{item.type}</span>
              {item.level && <span className="diff-structure-level"> H{item.level}</span>}
              <span className="diff-structure-content">: {item.content}</span>
            </div>
          );
          modifiedParts.push(
            <div key={`unchanged-mod-${modIdx + i}`} className="diff-unchanged-line">
              <span className="diff-structure-type">{item.type}</span>
              {item.level && <span className="diff-structure-level"> H{item.level}</span>}
              <span className="diff-structure-content">: {item.content}</span>
            </div>
          );
        });
        origIdx += part.count || 0;
        modIdx += part.count || 0;
      }
    });

    return { originalParts, modifiedParts };
  } else {
    // Text-based comparison of Contentful documents
    const origText = extractPlainText(origDoc);
    const modText = extractPlainText(modDoc);
    return renderStringDiff(origText, modText);
  }
}