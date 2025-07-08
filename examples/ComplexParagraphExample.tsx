import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

type ComplexParagraphExampleProps = {
  original?: string;
  modified?: string;
  title?: string;
  description?: string;
};

const ComplexParagraphExample: React.FC<ComplexParagraphExampleProps> = ({
  original = "I am Captain Kirk, Captain of the USS Enterprise.",
  modified = "I am Commander Benjamin Sisko, Commander of Deep Space 9.",
  title = "Example 2: Kirk vs Sisko",
  description = "Multiple changes highlighted",
}) => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>{title}</h2>
    <p>{description}</p>
    <Compare original={original} modified={modified} />
  </div>
);

export default ComplexParagraphExample;