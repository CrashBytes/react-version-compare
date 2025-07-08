import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

type SimpleParagraphExampleProps = {
  original?: string;
  modified?: string;
  title?: string;
  description?: string;
};

const SimpleParagraphExample: React.FC<SimpleParagraphExampleProps> = ({
  original = "I am Captain Kirk, Captain of the USS Enterprise.",
  modified = "I am Captain Picard, Captain of the USS Enterprise.",
  title = "Example 1: Kirk vs Picard",
  description = 'Only "Kirk" and "Picard" should be highlighted',
}) => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>{title}</h2>
    <p>{description}</p>
    <Compare original={original} modified={modified} />
  </div>
);

export default SimpleParagraphExample;