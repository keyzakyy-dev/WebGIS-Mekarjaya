import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary dark:text-accent">404</h1>
        <h2 className="font-poppins text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <Link to="/" className="btn-primary px-8 py-3">Kembali ke Beranda</Link>
      </motion.div>
    </div>
  );
}