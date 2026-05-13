import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('calls onChange with input value', async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    await userEvent.type(screen.getByPlaceholderText('Search products...'), 'shoes');
    expect(onChange).toHaveBeenCalled();
  });

  it('displays the controlled value', () => {
    render(<SearchBar value="headphones" onChange={() => {}} />);
    expect(screen.getByDisplayValue('headphones')).toBeInTheDocument();
  });
});
