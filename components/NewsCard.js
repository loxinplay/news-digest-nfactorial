export default function NewsCard({ article }) {
  // Проверяем и преобразуем дату, если она существует
  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available'; // Если даты нет, выводим "Дата не доступна"

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
        <p className="text-gray-700">{article.description}</p>
      </div>
    </div>
  );
}
