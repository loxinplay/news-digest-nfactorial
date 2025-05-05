import { useState } from 'react';
import { Loader, Bot, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIQuery() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error('Ошибка при запросе к AI:', err);
      setAnswer('Ошибка при получении ответа от AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Search size={18} />
          Введите ваш вопрос:
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Например: Что происходит с экономикой в 2025 году?"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Bot size={18} />
          Спросить у AI
        </button>
      </form>

      {loading && (
        <div className="mt-6 text-gray-500 flex items-center gap-2">
          <Loader className="animate-spin" size={18} />
          AI формулирует ответ...
        </div>
      )}

      {answer && (
        <motion.div
          className="mt-6 bg-gray-50 border-l-4 border-blue-500 p-4 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
            <Bot size={16} />
            Ответ AI:
          </h3>
          <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
