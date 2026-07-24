import { useState } from 'react';
import { Plus, X, MapPin, Search, Filter, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme } = useTheme();

  const actions = [
    {
      icon: MapPin,
      label: 'Lokasi Saya',
      onClick: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // You can pass the coordinates to the map through a context or state.
              // For now, we'll just log the location.
              console.log('Current location:', position.coords.latitude, position.coords.longitude);
              // In a real app, you'd update the map view.
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        }
      },
      color: 'bg-blue-500',
    },
    {
      icon: Search,
      label: 'Pencarian',
      onClick: () => {
        const searchInput = document.querySelector('[data-search-input]');
        if (searchInput) searchInput.focus();
      },
      color: 'bg-green-500',
    },
    {
      icon: Filter,
      label: 'Filter Lapisan',
      onClick: () => {
        const layerControl = document.querySelector('.leaflet-control-layers');
        if (layerControl) {
          layerControl.classList.toggle('hidden');
        }
      },
      color: 'bg-yellow-500',
    },
    {
      icon: Plus,
      label: 'Tambah Marker',
      onClick: () => {
        console.log('Tambah marker');
        // You can open a modal to add a new marker.
      },
      color: 'bg-purple-500',
    },
    {
      icon: Moon,
      label: 'Toggle Gelap',
      onClick: toggleTheme,
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="fixed bottom-24 md:bottom-8 right-8 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary dark:bg-accent rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors"
        aria-label="Toggle actions"
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ staggerChildren: 0.05 }}
            className="absolute bottom-16 right-0 flex flex-col items-end space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`w-12 h-12 ${action.color} rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow`}
                aria-label={action.label}
                title={action.label}
              >
                <action.icon size={20} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}