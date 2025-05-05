import { useState } from 'react';

export default function NewsCard({ article }) {
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available';

  const handleAIRequest = async (mode) => {
    setLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: article.description || article.content, mode }),
      });

      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Ошибка при получении ответа от AI:', error);
      setAiSummary('Ошибка при получении ответа от AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{publishDate}</p>
        <p className="text-gray-700 mb-2">{article.description}</p>

        <div className="flex gap-2 mb-2">
          <button onClick={() => handleAIRequest('summary')} className="px-3 py-1 bg-blue-500 text-white rounded">
            Резюме
          </button>
          <button onClick={() => handleAIRequest('explain')} className="px-3 py-1 bg-green-500 text-white rounded">
            Объясни попроще
          </button>
        </div>

        {loading && <p className="text-sm text-gray-500">Загрузка...</p>}
        {aiSummary && <p className="text-sm text-gray-800">{aiSummary}</p>}
      </div>
    </div>
  );
}
