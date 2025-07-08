import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

const arrayOriginal = [
  'USS Enterprise',
  'USS Voyager',
  'USS Defiant'
];

const arrayModified = [
  'USS Discovery',
  'USS Voyager',
  'USS Cerritos'
];

const StarshipArrayDemo = () => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>Example 3: Starship Array Comparison</h2>
    <Compare
      original={arrayOriginal}
      modified={arrayModified}
    />
  </div>
);

export default StarshipArrayDemo;