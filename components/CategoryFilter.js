const categories = ['general', 'technology', 'sports', 'science', 'business', 'entertainment', 'health'];

export default function CategoryFilter({ current, onChange }) {
  return (
    <div className="flex space-x-2 mb-6">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border ${current === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
          {cat}
        </button>
      ))}
    </div>
  );
}