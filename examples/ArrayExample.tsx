import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

type ArrayExampleProps = {
  original?: string[];
  modified?: string[];
  title?: string;
};

const ArrayExample: React.FC<ArrayExampleProps> = ({
  original = ['USS Enterprise', 'USS Voyager', 'USS Defiant'],
  modified = ['USS Discovery', 'USS Voyager', 'USS Cerritos'],
  title = "Example 3: Starship Array Comparison",
}) => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>{title}</h2>
    <Compare original={original} modified={modified} />
  </div>
);

export default ArrayExample;