
export default async function handler(req, res) {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const category = req.query.category || 'general';
  
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing' });
    }
  
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=20&language=en&apiKey=${apiKey}`
      );
  
      const data = await response.json();
      res.status(200).json(data.articles || []);
    } catch (error) {
      console.error('Ошибка при получении новостей:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  }
  