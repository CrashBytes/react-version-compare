import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

const KirkVsPicardDemo = () => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>Example 1: Kirk vs Picard</h2>
    <p>Only "Kirk" and "Picard" should be highlighted</p>
    <Compare
      original="I am Captain Kirk, Captain of the USS Enterprise."
      modified="I am Captain Picard, Captain of the USS Enterprise."
    />
  </div>
);

export default KirkVsPicardDemo;