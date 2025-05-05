export default async function handler(req, res) {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({ message: 'NEWS_API_KEY не задан в .env.local' });
    }
  
    try {
      const newsRes = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&pageSize=7`,
        {
          headers: {
            'X-Api-Key': apiKey,
          },
        }
      );
  
      if (!newsRes.ok) {
        throw new Error('Ошибка при запросе к NewsAPI');
      }
  
      const newsData = await newsRes.json();
  
      const summaries = await Promise.all(
        newsData.articles.map(async (article) => {
          try {
            const summaryRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
              },
              body: JSON.stringify({
                model: 'mistral-medium',
                messages: [
                  {
                    role: 'user',
                    content: `Кратко подведи итог этой новости (1-2 предложения): ${article.description || article.content}`,
                  },
                ],
                temperature: 0.7,
              }),
            });
  
            const summaryData = await summaryRes.json();
            const summary = summaryData.choices?.[0]?.message?.content || '';
  
            return { ...article, summary };
          } catch (err) {
            return { ...article, summary: 'Не удалось получить резюме' };
          }
        })
      );
  
      res.status(200).json({ articles: summaries });
    } catch (err) {
      console.error('Ошибка в утреннем дайджесте:', err);
      res.status(500).json({ message: 'Ошибка при загрузке утреннего дайджеста' });
    }
  }
  