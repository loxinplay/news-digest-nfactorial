import AIQuery from '../components/AIQuery';

export default function AIPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700">🤖 Спросите у AI</h1>
      <p className="mb-4 text-gray-600">Введите вопрос — и AI соберёт и объяснит вам актуальные новости по теме.</p>
      <AIQuery />
    </div>
  );
}
