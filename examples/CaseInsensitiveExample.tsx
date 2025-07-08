import React from 'react';
import Compare from '../src/components/Compare';

type CaseInsensitiveExampleProps = {
  original?: string[];
  modified?: string[];
  title?: string;
  description?: string;
  caseSensitive?: boolean;
};

const CaseInsensitiveExample: React.FC<CaseInsensitiveExampleProps> = ({
  original = ['Vulcan', 'Earth', 'Romulus'],
  modified = ['romulus', 'vulcan', 'earth'],
  title = "Example 5: Case Insensitive",
  description = "Multiple changes highlighted",
  caseSensitive = false,
}) => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>{title}</h2>
    <p>{description}</p>
    <Compare original={original} modified={modified} caseSensitive={caseSensitive} />
  </div>
);

export default CaseInsensitiveExample;