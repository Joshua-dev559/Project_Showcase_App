import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">E-Commerce Admin Portal</h1>
        <p className="text-gray-500 text-lg mb-8">Manage your product catalogue with ease — add, update, search, and remove products from one place.</p>
        <div className="flex justify-center gap-4">
          <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">View Products</Link>
          <Link to="/add-product" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">Add Product</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <span className="text-3xl">📦</span>
          <h3 className="font-semibold text-gray-800 mt-3 mb-1">Product Management</h3>
          <p className="text-sm text-gray-500">Browse and manage all products in your store.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <span className="text-3xl">✏️</span>
          <h3 className="font-semibold text-gray-800 mt-3 mb-1">Inline Editing</h3>
          <p className="text-sm text-gray-500">Update product prices directly from the product list.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <span className="text-3xl">🔍</span>
          <h3 className="font-semibold text-gray-800 mt-3 mb-1">Live Search</h3>
          <p className="text-sm text-gray-500">Instantly filter products by name as you type.</p>
        </div>
      </div>
    </div>
  );
}
