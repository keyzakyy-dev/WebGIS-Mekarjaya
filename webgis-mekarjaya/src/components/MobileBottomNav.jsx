import { Link, useLocation } from 'react-router-dom';
import { Home, Map, FileText, Info, Phone } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/peta', label: 'Peta', icon: Map },
  { path: '/profil', label: 'Profil', icon: FileText },
  { path: '/tentang', label: 'Tentang', icon: Info },
  { path: '/kontak', label: 'Kontak', icon: Phone },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-primary dark:text-accent' : 'text-gray-500 hover:text-primary dark:hover:text-accent'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}