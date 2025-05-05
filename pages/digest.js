import MorningDigest from '../components/MorningDigest';

export default function DigestPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700">📰 Утренний дайджест</h1>
      <p className="mb-4 text-gray-600">Краткие и важные новости на сегодня — отобраны и сжаты ИИ специально для вас.</p>
      <MorningDigest />
    </div>
  );
}