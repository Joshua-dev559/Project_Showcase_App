import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onUpdate, onDelete }) {
  const [editPrice, setEditPrice] = useState(false);
  const [price, setPrice] = useState(product.price);
  const navigate = useNavigate();

  function handlePriceSave() {
    onUpdate(product.id, { price: parseFloat(price) });
    setEditPrice(false);
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-md transition-shadow">
      <h3
        onClick={() => navigate(`/products/${product.id}`)}
        className="text-lg font-semibold text-blue-700 cursor-pointer hover:underline"
      >
        {product.name}
      </h3>
      <p className="text-sm text-gray-500">{product.category}</p>

      <div className="flex items-center gap-2">
        {editPrice ? (
          <>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-24 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handlePriceSave} className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
            <button onClick={() => setEditPrice(false)} className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">✕</button>
          </>
        ) : (
          <>
            <span className="text-gray-800 font-medium">${product.price.toFixed(2)}</span>
            <button onClick={() => setEditPrice(true)} className="text-sm text-blue-600 border border-blue-300 px-2 py-1 rounded hover:bg-blue-50">Edit Price</button>
          </>
        )}
      </div>

      <p className="text-sm text-gray-600">Stock: <span className="font-medium">{product.stock}</span></p>
      <button onClick={() => onDelete(product.id)} className="mt-auto text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-start">Delete</button>
    </div>
  );
}
