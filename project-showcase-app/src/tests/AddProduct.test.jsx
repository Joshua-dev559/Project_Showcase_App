import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AddProduct from '../pages/AddProduct';

vi.mock('../hooks/useProducts', () => ({
  useProducts: () => ({ addProduct: vi.fn().mockResolvedValue() }),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe('AddProduct', () => {
  beforeEach(() => {
    render(<MemoryRouter><AddProduct /></MemoryRouter>);
  });

  it('renders the form fields', () => {
    expect(screen.getByPlaceholderText('e.g. Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Electronics')).toBeInTheDocument();
  });

  it('shows validation error when required fields are empty', async () => {
    await userEvent.click(screen.getByText('Add Product'));
    expect(screen.getByText('Name, price, and category are required.')).toBeInTheDocument();
  });

  it('does not show error when all required fields are filled', async () => {
    await userEvent.type(screen.getByPlaceholderText('e.g. Wireless Mouse'), 'Keyboard');
    await userEvent.type(screen.getByPlaceholderText('0.00'), '25');
    await userEvent.type(screen.getByPlaceholderText('e.g. Electronics'), 'Peripherals');
    await userEvent.click(screen.getByText('Add Product'));
    expect(screen.queryByText('Name, price, and category are required.')).not.toBeInTheDocument();
  });
});
