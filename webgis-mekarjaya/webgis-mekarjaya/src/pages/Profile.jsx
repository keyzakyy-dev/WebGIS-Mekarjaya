import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Award, Globe, Trees } from 'lucide-react';

const profileStats = [
  { label: 'Jumlah Penduduk', value: 12450, icon: Users },
  { label: 'Pria', value: 6215, icon: Users },
  { label: 'Wanita', value: 6235, icon: Users },
  { label: 'Luas Wilayah', value: '15,2 km²', icon: MapPin },
  { label: 'Jumlah RT', value: 25, icon: Users },
  { label: 'Jumlah RW', value: 5, icon: Users },
  { label: 'Jumlah Dusun', value: 8, icon: Trees },
  { label: 'Tahun Berdiri', value: '1985', icon: Calendar },
];

const achievements = [
  { year: '2023', achievement: 'Sertifikasi Desa Digital' },
  { year: '2022', achievement: 'Penghargaan Desa Silaturahmi' },
  { year: '2021', achievement: 'Program Revolusi Desa' },
  { year: '2020', achievement: 'Desa Mandiri' },
  { year: '2019', achievement: 'Desa Unggul' },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src="/images/profil-desa.jpg"
                alt="Foto Desa Mekarjaya"
                className="w-48 h-48 object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-poppins text-3xl font-bold text-primary mb-4">
                Desa Mekarjaya
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Desa Mekarjaya adalah salah satu desa yang terletak di Kecamatan Cibungbulang, Kabupaten Bogor, Jawa Barat.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Kecamatan Cibungbulang, Kabupaten Bogor, Jawa Barat 16680</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Statistik Demografi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profileStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-gray-100">{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Sejarah Singkat
          </h2>
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Desa Mekarjaya duluk disebut dengan sebutan "Mekar Jaya" dan memiliki sejarah yang kaya. 
              Terletak di dataran rendah dengan iklim tropis yang mendukung pertanian dan perkebunan.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Desa ini memiliki 8 dusun yang terbagi menjadi 25 RT dan 5 RW. Letak geografis yang strategis
              memungkinkan akses mudah ke pusat kota Bogor serta infrastruktur yang baik.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Pengembangan desa selalu menekankan pada pembangunan berkelanjutan, termasuk peningkatan 
              infrastruktur, pendidikan, kesehatan, serta ekonomi berbasis UMKM dan pertanian.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8"
        >
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Prestasi Desa
          </h2>
          <div className="relative border-l-2 border-primary/20 pl-6">
            {achievements.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="mb-8 ml-4"
              >
                <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-primary rounded-full">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-gray-100">{item.achievement}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}