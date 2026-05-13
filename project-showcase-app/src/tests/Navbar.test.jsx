import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
  });

  it('renders the brand name', () => {
    expect(screen.getByText(/Admin Portal/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  it('Home link points to /', () => {
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('Products link points to /products', () => {
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
  });
});
