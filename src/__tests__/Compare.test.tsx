// src/__tests__/Compare.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Compare from '../components/Compare';

describe('Compare', () => {
  it('renders string comparison correctly', () => {
    const original = 'I am Captain Kirk, Captain of the USS Enterprise.';
    const modified = 'I am Captain Picard, Captain of the USS Enterprise.';
    
    render(
      <Compare 
        original={original}
        modified={modified}
      />
    );
    
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Modified')).toBeInTheDocument();
  });

  it('renders array comparison correctly', () => {
    const original = ['line 1', 'line 2', 'line 3'];
    const modified = ['line 1', 'modified line 2', 'line 3'];
    
    render(
      <Compare 
        original={original}
        modified={modified}
      />
    );
    
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Modified')).toBeInTheDocument();
  });

  it('shows error for mismatched types', () => {
    render(
      <Compare 
        original="string"
        modified={['array']}
      />
    );
    
    expect(screen.getByText(/Error: Both inputs must be either strings or arrays of strings/)).toBeInTheDocument();
  });
});