import { useEffect, useState } from 'react';
import { fetchNews } from '../utils/fetchNews';

export default function Digest() {
  const [digest, setDigest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDigest = async () => {
      setLoading(true);
      const news = await fetchNews(); // по умолчанию категория 'general'
      const topNews = news.slice(0, 7); // первые 7 новостей

      const summaries = await Promise.all(
        topNews.map(async article => {
          try {
            const res = await fetch('/api/summary', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: article.text }),
            });
            const data = await res.json();
            return { ...article, summary: data.summary };
          } catch {
            return { ...article, summary: 'Ошибка при генерации резюме' };
          }
        })
      );

      setDigest(summaries);
      setLoading(false);
    };

    getDigest();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📰 Утренний AI-дайджест</h1>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="space-y-6">
          {digest.map((article, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(article.publish_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">{article.summary}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Читать полностью →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
