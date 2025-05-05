export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Метод не разрешен' });
    }
  
    const { question } = req.body;
  
    if (!question || question.trim() === '') {
      return res.status(400).json({ message: 'Вопрос обязателен' });
    }
  
    try {
      const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
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
              content: question,
            },
          ],
          temperature: 0.7,
        }),
      });
  
      if (!mistralRes.ok) {
        throw new Error(`Mistral API ошибка: ${mistralRes.statusText}`);
      }
  
      const result = await mistralRes.json();
      const aiMessage = result.choices?.[0]?.message?.content;
  
      res.status(200).json({ answer: aiMessage || 'Ответ не получен' });
    } catch (err) {
      console.error('Ошибка AI-запроса:', err);
      res.status(500).json({ message: 'Ошибка при обращении к Mistral API' });
    }
  }
  