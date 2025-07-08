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

  it('handles array comparison with caseSensitive=false', () => {
    const original = ['Alpha', 'Bravo', 'Charlie'];
    const modified = ['alpha', 'bravo', 'charlie'];
    render(
      <Compare
        original={original}
        modified={modified}
        caseSensitive={false}
      />
    );
    // Should not highlight any differences
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    // Optionally, check that no diff-added or diff-removed classes are present
    expect(document.querySelector('.diff-added')).toBeNull();
    expect(document.querySelector('.diff-removed')).toBeNull();
  });

  it('renders inline view mode', () => {
    const original = 'foo bar baz';
    const modified = 'foo bar qux';
    render(
      <Compare
        original={original}
        modified={modified}
        viewMode="inline"
      />
    );
    // Should render the inline container
    expect(document.querySelector('.compare-inline')).toBeInTheDocument();

    // Check for the correct diff spans and their content
    const diffUnchangedSpans = screen.getAllByText(/foo bar/i);
    expect(diffUnchangedSpans.length).toBeGreaterThan(0);

    expect(screen.getByText('baz')).toHaveClass('diff-removed');
    expect(screen.getByText('qux')).toHaveClass('diff-added');
  });
});