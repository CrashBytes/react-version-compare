// src/__tests__/VersionCompare.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VersionCompare from '../components/VersionCompare';

describe('VersionCompare', () => {
  it('renders without crashing', () => {
    const currentVersion = {
      id: 'current',
      content: 'Current content'
    };
    
    const previousVersions = [
      {
        id: 'v1',
        content: 'Previous content'
      }
    ];
    
    render(
      <VersionCompare 
        currentVersion={currentVersion}
        previousVersions={previousVersions}
      />
    );
    
    expect(screen.getByText('Compare with:')).toBeInTheDocument();
  });
});