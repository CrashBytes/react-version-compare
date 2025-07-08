import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

const KirkVsSiskoDemo = () => (
  <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
    <h2>Example 2: Kirk vs Sisko</h2>
    <p>Multiple changes highlighted</p>
    <Compare
      original="I am Captain Kirk, Captain of the USS Enterprise."
      modified="I am Commander Benjamin Sisko, Commander of Deep Space 9."
    />
  </div>
);

export default KirkVsSiskoDemo;