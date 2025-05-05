export default async function handler(req, res) {
    const { content, mode } = req.body;
  
    const prompt =
      mode === 'explain'
        ? `Объясни простыми словами:\n\n${content}`
        : `Сделай краткое резюме этой новости (1-2 предложения):\n\n${content}`;
  
    try {
      const response = await fetch(
        'https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/gemini-pro:predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_API_KEY`,
          },
          body: JSON.stringify({
            instances: [{ prompt }],
            parameters: { temperature: 0.7 },
          }),
        }
      );
  
      const data = await response.json();
      const result = data.predictions[0].content;
  
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обращении к Gemini API' });
    }
  }
  