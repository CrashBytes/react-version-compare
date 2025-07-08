import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

type DisorderedArrayProps = {
  original?: string[];
  modified?: string[];
  title?: string;
  description?: string;
};

const DisorderedArray: React.FC<DisorderedArrayProps> = ({
  original = ['Vulcan', 'Earth', 'Romulus'],
  modified = ['Earth', 'Romulus', 'Vulcan'],
  title = "Example 4: Disordered Array",
  description = "Order matters in this comparison",
}) => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>{title}</h2>
    <p>{description}</p>
    <Compare original={original} modified={modified} />
  </div>
);

export default DisorderedArray;