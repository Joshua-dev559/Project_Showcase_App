import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <span className="text-xl font-bold tracking-wide">🛒 Admin Portal</span>
      <div className="flex gap-6">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300 transition-colors'}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300 transition-colors'}>Products</NavLink>
        <NavLink to="/add-product" className={({ isActive }) => isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300 transition-colors'}>Add Product</NavLink>
      </div>
    </nav>
  );
}
