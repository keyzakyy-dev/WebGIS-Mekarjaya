import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function LoadingScreen() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background dark:bg-gray-900 bg-opacity-80"
    >
      <div className="text-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-primary dark:bg-accent shadow-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-30" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" fill="none" />
              <path className="opacity-70" d="M6 12a6 6 0 1 1 12 0" />
            </svg>
          </div>
          <p className="text-lg text-white font-medium mt-4">
            <span className="text-primary">Memuat...</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}