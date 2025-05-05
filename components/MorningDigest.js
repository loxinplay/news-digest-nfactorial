import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MorningDigest() {
  const [digest, setDigest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDigest = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/morning-digest');
        const data = await res.json();
        setDigest(data.articles || []);
      } catch (err) {
        console.error('Ошибка при загрузке дайджеста:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDigest();
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {loading ? (
        <div className="text-center text-gray-500">Загрузка дайджеста...</div>
      ) : digest.length === 0 ? (
        <div className="text-center text-gray-500">Нет новостей для отображения.</div>
      ) : (
        digest.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow p-6 border border-gray-100 hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2 flex gap-2 items-center">
              <Newspaper size={20} />
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 mb-3">{item.date}</p>
            <p className="text-gray-700">{item.summary}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-sm text-blue-600 hover:underline"
            >
              Читать полностью <ExternalLink size={14} />
            </a>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
