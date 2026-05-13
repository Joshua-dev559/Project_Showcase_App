import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const INITIAL = { name: '', price: '', category: '', stock: '', description: '' };

export default function AddProduct() {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setError('Name, price, and category are required.');
      return;
    }
    addProduct({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 })
      .then(() => navigate('/products'));
  }

  const inputClass = 'border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
      {error && <p className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white shadow rounded-xl p-8 border border-gray-100">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Product Name *
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Wireless Mouse" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Price ($) *
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0.00" min="0" step="0.01" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Category *
          <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Stock
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" min="0" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Description
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short product description..." className={`${inputClass} resize-none`} rows={3} />
        </label>
        <button type="submit" className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-medium">Add Product</button>
      </form>
    </div>
  );
}
