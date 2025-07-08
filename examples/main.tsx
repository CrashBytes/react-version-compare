import React from 'react';
import { createRoot } from 'react-dom/client';
import SimpleParagraphExample from './SimpleParagraphExample';
import ComplexParagraphExample from './ComplexParagraphExample';
import ArrayExample from './ArrayExample';
import DisorderedArray from './DisorderedArray';
import CaseInsensitiveExample from './CaseInsensitiveExample';

const App = () => (
  <div>
    <SimpleParagraphExample />
    <ComplexParagraphExample />
    <ArrayExample />
    <DisorderedArray />
    <CaseInsensitiveExample/>
  </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);