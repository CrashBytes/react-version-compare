import React from 'react';
import Compare from '../src/components/Compare';

type OrderInsensitiveExampleProps = {
  original?: string[];
  modified?: string[];
  title?: string;
  description?: string;
  caseSensitive?: boolean;
};

function sortArray(arr: string[]) {
  return [...arr].sort((a, b) => a.localeCompare(b));
}

const OrderInsensitiveExample: React.FC<OrderInsensitiveExampleProps> = ({
  original = ['Vulcan', 'Earth', 'Romulus'],
  modified = ['romulus', 'vulcan', 'earth'],
  title = "Example 6: Order Insensitive Array",
  description = "Arrays are compared as sets (order does not matter, case-insensitive)",
  caseSensitive = false,
}) => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>{title}</h2>
    <p>{description}</p>
    <Compare
      original={sortArray(original)}
      modified={sortArray(modified)}
      caseSensitive={caseSensitive}
    />
  </div>
);

export default OrderInsensitiveExample;