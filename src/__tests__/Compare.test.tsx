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
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
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
    expect(document.querySelector('.compare-inline')).toBeInTheDocument();
    const diffUnchangedSpans = screen.getAllByText(/foo bar/i);
    expect(diffUnchangedSpans.length).toBeGreaterThan(0);
    expect(screen.getByText('baz')).toHaveClass('diff-removed');
    expect(screen.getByText('qux')).toHaveClass('diff-added');
  });

  it('handles array comparison with non-string values and caseSensitive=false', () => {
    const original = ['Alpha', 42, null];
    const modified = ['alpha', 42, null];
    render(
      <Compare
        original={original as any}
        modified={modified as any}
        caseSensitive={false}
      />
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    const numberInstances = screen.getAllByText('42');
    expect(numberInstances.length).toBe(2);
    const unchangedLines = document.querySelectorAll('.diff-unchanged-line');
    expect(unchangedLines.length).toBeGreaterThanOrEqual(2);
  });

  it('renders fallback item when indexOf returns -1 in array diff', () => {
    const original = ['a', 'b', 'c'];
    const modified = ['x', 'y', 'z'];
    render(
      <Compare
        original={original}
        modified={modified}
      />
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
    expect(screen.getByText('x')).toBeInTheDocument();
    expect(screen.getByText('y')).toBeInTheDocument();
    expect(screen.getByText('z')).toBeInTheDocument();
  });

  it('renders unchanged lines when arrays are identical', () => {
    const original = ['same', 'lines', 'here'];
    const modified = ['same', 'lines', 'here'];
    render(
      <Compare
        original={original}
        modified={modified}
      />
    );
    expect(screen.getAllByText('same').length).toBe(2);
    expect(screen.getAllByText('lines').length).toBe(2);
    expect(screen.getAllByText('here').length).toBe(2);
    expect(document.querySelector('.diff-added-line')).toBeNull();
    expect(document.querySelector('.diff-removed-line')).toBeNull();
  });
});