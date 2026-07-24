import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Map, Home, Info, Phone, FileText, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/peta', label: 'Peta Interaktif', icon: Map },
  { path: '/profil', label: 'Profil Desa', icon: FileText },
  { path: '/tentang', label: 'Tentang', icon: Info },
  { path: '/kontak', label: 'Kontak', icon: Phone },
];

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="ml-4 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-poppins font-semibold text-lg hidden sm:block">
                Desa Mekarjaya
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}