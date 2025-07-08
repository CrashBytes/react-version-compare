import React from 'react';
import { createRoot } from 'react-dom/client';
import Compare from '../src';
import '../src/styles/Compare.css';

const Demo = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
      <h1>React Compare Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Example 1: Kirk vs Picard</h2>
        <p>This will highlight only "Kirk" in red and "Picard" in green</p>
        <Compare 
          original="I am Captain Kirk, Captain of the USS Enterprise."
          modified="I am Captain Picard, Captain of the USS Enterprise."
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 2: Multiple Changes</h2>
        <p>This will highlight the larger differences</p>
        <Compare 
          original="I am Captain Kirk, Captain of the USS Enterprise."
          modified="I am Commander Benjamin Sisko, Commander of Deep Space 9."
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 3: Array Comparison</h2>
        <Compare 
          original={['item 1', 'item 2', 'item 3']}
          modified={['item 1', 'modified item 2', 'item 3']}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 4: Inline View</h2>
        <Compare 
          original="I am Captain Kirk, Captain of the USS Enterprise."
          modified="I am Captain Picard, Captain of the USS Enterprise."
          viewMode="inline"
        />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Demo />);