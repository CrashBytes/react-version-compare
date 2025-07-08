import React from 'react';
import { createRoot } from 'react-dom/client';
import SimpleParagraphExample from './SimpleParagraphExample';
import ComplexParagraphExample from './ComplexParagraphExample';
import ArrayExample from './ArrayExample';
import DisorderedArray from './DisorderedArray';
import CaseInsensitiveExample from './CaseInsensitiveExample';
import { 
  ContentfulTextComparisonExample, 
  ContentfulStructureComparisonExample, 
  ContentfulInlineComparisonExample 
} from './ContentfulExamples';

const App = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>React Version Compare Examples</h1>
    
    <section>
      <h2>String Comparisons</h2>
      <SimpleParagraphExample />
      <ComplexParagraphExample />
      <CaseInsensitiveExample />
    </section>
    
    <section>
      <h2>Array Comparisons</h2>
      <ArrayExample />
      <DisorderedArray />
    </section>
    
    <section>
      <h2>Contentful Rich Text Comparisons</h2>
      <ContentfulTextComparisonExample />
      <ContentfulStructureComparisonExample />
      <ContentfulInlineComparisonExample />
    </section>
  </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);