import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect, vi, describe, test, afterEach } from 'vitest';
globalThis.expect = expect;
await import('@testing-library/jest-dom');

// Mock the lucide-react Search icon to avoid SVG rendering issues in tests
vi.mock('lucide-react', () => ({
  __esModule: true,
  Search: (props) => <svg data-testid="search-icon" {...props} />,
}));

import Search from '../Search';

describe('Search component', () => {
  afterEach(() => cleanup());
  test('renders input with provided value and placeholder', () => {
    const setSearchTerm = vi.fn();
    render(<Search searchTerm="hello" setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText(/Search movies, shows.../i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('hello');

    // icon should be present via mocked component
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('calls setSearchTerm on input change', () => {
    const setSearchTerm = vi.fn();
    render(<Search searchTerm="" setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText(/Search movies, shows.../i);
    fireEvent.change(input, { target: { value: 'matrix' } });

    expect(setSearchTerm).toHaveBeenCalledWith('matrix');
  });
});
