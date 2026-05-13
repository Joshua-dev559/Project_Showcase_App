import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((r) => r.json())
      .then((data) => { setProduct(data); setForm(data); });
  }, [id]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(form.price), stock: parseInt(form.stock), description: form.description }),
    })
      .then((r) => r.json())
      .then((updated) => { setProduct(updated); setEditing(false); });
  }

  if (!product) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-blue-600 hover:underline">← Back</button>

      <div className="bg-white rounded-xl shadow p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
        <p className="text-sm text-gray-400 mb-6">{product.category}</p>

        {editing ? (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Price
              <input name="price" type="number" value={form.price} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Stock
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Description
              <textarea name="description" value={form.description} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" rows={3} />
            </label>
            <div className="flex gap-3 mt-2">
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
              <button onClick={() => setEditing(false)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-gray-700">
            <p><span className="font-semibold">Price:</span> ${product.price.toFixed(2)}</p>
            <p><span className="font-semibold">Stock:</span> {product.stock}</p>
            <p><span className="font-semibold">Description:</span> {product.description}</p>
            <button onClick={() => setEditing(true)} className="mt-4 self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit Product</button>
          </div>
        )}
      </div>
    </div>
  );
}
