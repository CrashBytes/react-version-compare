import Compare from '../src/components/Compare';
import React from 'react';

// Helper: Sort arrays for order-insensitive comparison
function sortArray(arr: string[]) {
  return [...arr].sort((a, b) => a.localeCompare(b));
}

const original = ['Vulcan', 'Earth', 'Romulus'];
const modified = ['romulus', 'vulcan', 'earth'];

const OrderInsensitiveExample = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
      <h2>Example 6: Order Insensitive Array</h2>
      <p>Arrays are compared as sets (order does not matter, case-insensitive)</p>
      <Compare
        original={sortArray(original)}
        modified={sortArray(modified)}
        caseSensitive={false}
      />
    </div>
  );
};

export default OrderInsensitiveExample;