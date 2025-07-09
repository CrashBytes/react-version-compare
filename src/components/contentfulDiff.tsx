import React from 'react';
import { BLOCKS, Document, Block, Inline, Text } from '@contentful/rich-text-types';

// Exported type guard for Contentful documents
export function isContentfulDocument(value: any): value is Document {
  return (
    value &&
    typeof value === 'object' &&
    value.nodeType === BLOCKS.DOCUMENT &&
    Array.isArray(value.content)
  );
}

// Extract plain text from Contentful document
export function extractPlainText(document: Document): string {
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
}

// Extract structured content for structure diff
export function extractStructuredContent(document: Document): Array<{ type: string; content: string; level?: number }> {
  const result: Array<{ type: string; content: string; level?: number }> = [];
  const extractFromNode = (node: Block | Inline | Text): void => {
    if (node.nodeType === 'text') return;
    if ('content' in node && node.content) {
      const textContent = node.content.map(child =>
        child.nodeType === 'text' ? (child as Text).value : ''
      ).join('');
      let displayType: string = node.nodeType;
      let headingLevel: number | undefined;
      switch (node.nodeType) {
        case BLOCKS.HEADING_1: displayType = 'Heading'; headingLevel = 1; break;
        case BLOCKS.HEADING_2: displayType = 'Heading'; headingLevel = 2; break;
        case BLOCKS.HEADING_3: displayType = 'Heading'; headingLevel = 3; break;
        case BLOCKS.HEADING_4: displayType = 'Heading'; headingLevel = 4; break;
        case BLOCKS.HEADING_5: displayType = 'Heading'; headingLevel = 5; break;
        case BLOCKS.HEADING_6: displayType = 'Heading'; headingLevel = 6; break;
        case BLOCKS.PARAGRAPH: displayType = 'Text'; break;
        case BLOCKS.UL_LIST: displayType = 'List'; break;
        case BLOCKS.OL_LIST: displayType = 'Numbered List'; break;
        case BLOCKS.LIST_ITEM: displayType = 'List Item'; break;
        case BLOCKS.QUOTE: displayType = 'Quote'; break;
        case BLOCKS.TABLE: displayType = 'Table'; break;
        default: displayType = node.nodeType.charAt(0).toUpperCase() + node.nodeType.slice(1);
      }
      if (textContent.trim()) {
        result.push({ type: displayType, content: textContent.trim(), level: headingLevel });
      }
      node.content.forEach(child => {
        if (child.nodeType !== 'text') extractFromNode(child);
      });
    }
  };
  if (document.content) document.content.forEach(node => extractFromNode(node));
  return result;
}

// Main Contentful diff renderer
export async function renderContentfulDiff(
  origDoc: Document,
  modDoc: Document,
  compareMode: 'text' | 'structure',
  caseSensitive: boolean,
  renderStringDiff: (a: string, b: string) => { originalParts: any[]; modifiedParts: any[] }
) {
  // Dynamically import diff for Vite/ESM compatibility
  const DiffModule = await import('diff');
  const Diff = DiffModule.default ?? DiffModule;
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