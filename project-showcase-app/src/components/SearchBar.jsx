export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
