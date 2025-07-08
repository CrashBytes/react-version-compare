// example/index.tsx
import ReactDOM from 'react-dom';

import Compare, { CompareProps } from '../src/components/Compare';

import '../src/styles/Compare.css';

// Example data
const currentVersion = {
  id: 'current',
  name: 'Current Version',
  content: 'This is the current version of the content.',
  date: new Date()
};

const previousVersions = [
  {
    id: 'v1',
    name: 'Version 1',
    content: 'This is an earlier version of the content.',
    date: new Date(Date.now() - 86400000)
  }
];

ReactDOM.render(
  <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
    <h1>Version Compare Demo</h1>
    <Compare 
      currentVersion={currentVersion}
      previousVersions={previousVersions}
    />
  </div>,
  document.getElementById('root')
);