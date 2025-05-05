import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          News Digest
        </Link>

        <div className="hidden md:flex gap-6 text-gray-700">
          <Link href="/" className="hover:text-blue-500">Главная</Link>
          <Link href="/digest" className="hover:text-blue-500">Утренний дайджест</Link>
          <Link href="/ai" className="hover:text-blue-500">AI-запрос</Link>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link href="/" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Главная</Link>
          <Link href="/digest" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Утренний дайджест</Link>
          <Link href="/ai" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>AI-запрос</Link>
        </div>
      )}
    </nav>
  );
}
