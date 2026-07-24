import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function SearchBar({ value, onChange, onSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-3 flex items-center space-x-2 w-full max-w-2xl mx-auto"
    >
      <Search className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
        placeholder="Cari nama, kategori, atau alamat..."
        data-search-input
        className="flex-1 bg-transparent border-none outline-none text-sm text-primary dark:text-gray-100 placeholder-gray-400"
      />
      <button
        onClick={onSearch}
        className="p-2 bg-primary dark:bg-accent text-white rounded-lg hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    </motion.div>
  );
}