// pages/api/summary.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Missing content' });

  try {
    const response = await axios.post(
      'https://api.fireworks.ai/inference/v1/chat/completions',
      {
        model: 'mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'Ты помощник, делающий краткое резюме новостей (1-2 предложения).' },
          { role: 'user', content },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = response.data.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
}
