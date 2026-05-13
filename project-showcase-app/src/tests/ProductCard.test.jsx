import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 29.99,
  category: 'Electronics',
  stock: 10,
};

function renderCard(overrides = {}) {
  return render(
    <MemoryRouter>
      <ProductCard
        product={mockProduct}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        {...overrides}
      />
    </MemoryRouter>
  );
}

describe('ProductCard', () => {
  it('renders product name, price, and category', () => {
    renderCard();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('shows price input when Edit Price is clicked', async () => {
    renderCard();
    await userEvent.click(screen.getByText('Edit Price'));
    expect(screen.getByDisplayValue('29.99')).toBeInTheDocument();
  });

  it('calls onDelete when Delete is clicked', async () => {
    const onDelete = vi.fn();
    renderCard({ onDelete });
    await userEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('calls onUpdate with new price on Save', async () => {
    const onUpdate = vi.fn().mockResolvedValue();
    renderCard({ onUpdate });
    await userEvent.click(screen.getByText('Edit Price'));
    const input = screen.getByDisplayValue('29.99');
    await userEvent.clear(input);
    await userEvent.type(input, '49.99');
    await userEvent.click(screen.getByText('Save'));
    expect(onUpdate).toHaveBeenCalledWith('1', { price: 49.99 });
  });
});
