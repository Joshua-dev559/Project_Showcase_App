import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function addProduct(product) {
    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((r) => r.json())
      .then((newProduct) => setProducts((prev) => [...prev, newProduct]));
  }

  function updateProduct(id, changes) {
    return fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
      .then((r) => r.json())
      .then((updated) =>
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      );
  }

  function deleteProduct(id) {
    return fetch(`${API}/${id}`, { method: 'DELETE' }).then(() =>
      setProducts((prev) => prev.filter((p) => p.id !== id))
    );
  }

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
}
