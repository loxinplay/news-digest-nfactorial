
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { title, content } = req.body;
      try {
        const summary = await getSummaryFromMistral(title, content);
        res.status(200).json({ summary });
      } catch (error) {
        res.status(500).json({ error: 'Ошибка при генерации резюме' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  
  async function getSummaryFromMistral(title, content) {
    // Замените на правильный вызов API для Mistral или другого LLM
    const response = await fetch('https://api.mistral.ai/summarize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    return data.summary;
  }
  