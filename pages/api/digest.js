// pages/api/digest.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не поддерживается' });
  }

  const { articles } = req.body;

  const summaries = await Promise.all(
    articles.map(async (article) => {
      const prompt = `Сделай краткое резюме следующей новости: ${article.title} - ${article.description || article.content}`;
      try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
          }),
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'Не удалось получить резюме.';
      } catch (error) {
        console.error('Ошибка при обращении к Mistral:', error);
        return 'Ошибка при получении резюме.';
      }
    })
  );

  res.status(200).json({ summaries });
}
