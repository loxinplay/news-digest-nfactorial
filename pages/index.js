import { useState, useEffect } from 'react';
import { fetchNews } from '../utils/fetchNews';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const [category, setCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedCategory') || 'general';
    }
    return 'general';
  });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchNews(category)
      .then(data => setArticles(data))
      .finally(() => setLoading(false));
  }, [category]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCategory', category);
    }
  }, [category]);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">News Digest</h1>
      <CategoryFilter current={category} onChange={setCategory} />

      {loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="border rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-4 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {articles.map((article, idx) => (
      <NewsCard key={idx} article={article} />
    ))}
  </div>
)}
    </div>
  );
}