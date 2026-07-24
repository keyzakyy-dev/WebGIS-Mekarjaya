import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const statistics = [
  { title: 'Penduduk', value: '12.450', icon: 'fa-solid fa-users', color: 'bg-primary' },
  { title: 'Luas Wilayah', value: '15,2 km²', icon: 'fa-solid fa-map-marked-alt', color: 'bg-secondary' },
  { title: 'RT', value: '25', icon: 'fa-solid fa-list', color: 'bg-accent' },
  { title: 'RW', value: '5', icon: 'fa-solid fa-th-list', color: 'bg-primary' },
  { title: 'Dusun', value: '8', icon: 'fa-solid fa-tree', color: 'bg-secondary' },
  { title: 'Fasilitas Publik', value: '42', icon: 'fa-solid fa-building', color: 'bg-accent' },
];

const features = [
  {
    title: 'Peta Interaktif',
    description: 'Jelajahi Desa Mekarjaya melalui peta interaktif lengkap dengan informasi fasilitas, landmark, dan data spasial.',
    icon: 'fa-solid fa-map',
    link: '/peta',
    color: 'from-primary to-accent'
  },
  {
    title: 'Profil Desa',
    description: 'Informasi lengkap tentang sejarah, struktur pemerintahan, visi dan misi Desa Mekarjaya.',
    icon: 'fa-solid fa-file-alt',
    link: '/profil',
    color: 'from-secondary to-primary'
  },
  {
    title: 'Data Terbuka',
    description: 'Akses ke data publik desa termasuk statistik, anggaran, dan laporan kinerja dalam format yang mudah dipahami.',
    icon: 'fa-solid fa-database',
    link: '/tentang',
    color: 'from-accent to-secondary'
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary to-black/50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative py-20 md:py-28 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Desa Mekarjaya
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-8 drop-shadow">
              WebGIS Desa Mekarjaya - Portal informasi geografis terintegrasi untuk Smart Village
            </p>
            <Link to="/peta" className="btn-primary btn-lg px-8 py-3">
              Buka Peta Interaktif
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl font-bold text-center mb-10 text-primary">
            Statistik Desa Mekarjaya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-6 text-center hover:shadow-glow transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <i className={`${stat.icon} text-2xl ${stat.color} mb-2`} />
                </div>
                <h3 className="font-poppins font-semibold text-lg text-primary mb-2">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl font-bold text-center mb-10 text-primary">
            Fitur Utama
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-6 flex items-start space-x-4 hover:shadow-glow transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-accent/20">
                    <i className={`${feature.icon} text-xl text-white`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold text-lg mb-2 text-primary">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <Link to={feature.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Selengkapnya
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7m0 0l7 7m-7-7v12" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-bold text-white mb-6">
            Bergabunglah dengan komunitas Desa Mekarjaya digital
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Temukan informasi penting tentang desa Anda dengan cepat dan mudah melalui aplikasi WebGIS kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/peta" className="btn-secondary btn-lg px-8 py-3">
              Jelajah Peta Sekarang
            </Link>
            <Link to="/profil" className="btn-accent btn-lg px-8 py-3">
              Lihat Profil Desa
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - will be handled by AppLayout */}
    </div>
  );
}