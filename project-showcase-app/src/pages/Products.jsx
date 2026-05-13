import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const { products, loading, error, updateProduct, deleteProduct } = useProducts();
  const [query, setQuery] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading products...</p>;
  if (error)   return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
