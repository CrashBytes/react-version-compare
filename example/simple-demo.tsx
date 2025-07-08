// example/simple-demo.tsx
import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

const App = () => {
  // String examples - exactly what you described
  const example1Original = 'I am Captain Kirk, Captain of the USS Enterprise.';
  const example1Modified = 'I am Captain Picard, Captain of the USS Enterprise.';

  const example2Original = 'I am Captain Kirk, Captain of the USS Enterprise.';
  const example2Modified = 'I am Commander Benjamin Sisko, Commander of Deep Space 9.';

  // Array example
  const arrayOriginal = [
    'First item',
    'Second item', 
    'Third item',
    'Fourth item'
  ];
  
  const arrayModified = [
    'First item',
    'Modified second item',
    'Third item',
    'New fourth item'
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
      <h1>React Compare Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Example 1: Kirk vs Picard</h2>
        <p>Only "Kirk" and "Picard" should be highlighted</p>
        <Compare 
          original={example1Original}
          modified={example1Modified}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 2: Kirk vs Sisko</h2>
        <p>Multiple changes highlighted</p>
        <Compare 
          original={example2Original}
          modified={example2Modified}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 3: Array Comparison</h2>
        <Compare 
          original={arrayOriginal}
          modified={arrayModified}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 4: Inline View</h2>
        <Compare 
          original={example1Original}
          modified={example1Modified}
          viewMode="inline"
        />
      </div>
    </div>
  );
};

export default App;