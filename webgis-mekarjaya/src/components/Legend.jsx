import { motion } from 'framer-motion';

const categories = {
  pemerintahan: { label: 'Pemerintahan', icon: 'fa-solid fa-building' },
  pendidikan: { label: 'Pendidikan', icon: 'fa-solid fa-school' },
  kesehatan: { label: 'Kesehatan', icon: 'fa-solid fa-hospital' },
  ibadah: { label: 'Ibadah', icon: 'fa-solid fa-praying-hands' },
  wisata: { label: 'Wisata', icon: 'fa-solid fa-tree' },
  umkm: { label: 'UMKM', icon: 'fa-solid fa-store' },
  pertanian: { label: 'Pertanian', icon: 'fa-solid fa-tractor' },
  roads: { label: 'Jalan', icon: 'fa-solid fa-road' },
  boundary: { label: 'Batas Desa', icon: 'fa-solid fa-fence' },
};

export function Legend() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-4 w-48 max-h-96 overflow-y-auto"
    >
      <h4 className="font-poppins font-medium mb-3 text-primary">Legenda</h4>
      <div className="space-y-2">
        {Object.entries(categories).map(([key, cat]) => (
          <div key={key} className="flex items-center space-x-2">
            <i className={`fa-solid ${cat.icon} text-primary dark:text-gray-300 text-sm`} />
            <span className="text-xs text-gray-600 dark:text-gray-300 capitalize">{cat.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}