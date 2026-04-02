import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const headings = screen.getAllByText(/Silvestre Dourado/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders the navigation links', () => {
    render(<App />);
    // Navigation renders desktop + mobile duplicates, so use getAllByText
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Projects').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });
});
