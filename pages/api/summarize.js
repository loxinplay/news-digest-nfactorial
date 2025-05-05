
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не поддерживается' });
  }

  const { content, mode } = req.body;

  const prompt =
    mode === 'explain'
      ? `Объясни простыми словами: ${content}`
      : `Сделай краткое резюме следующей новости: ${content}`;

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
    const summary = data.choices?.[0]?.message?.content || 'Не удалось получить ответ от Mistral.';

    res.status(200).json({ summary });
  } catch (error) {
    console.error('Ошибка при обращении к Mistral:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}
