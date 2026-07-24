import { motion } from 'framer-motion';
import { Target, Heart, Globe, Users, Award, Lightbulb, Database, Shield } from 'lucide-react';

const vision = "Membangun Desa Mekarjaya yang maju, sejahtera, dan berdaya saing tinggi dengan pendekatan digital.";

const mission = [
  "Meningkatkan pelayanan publik melalui teknologi informasi",
  "Membangun infrastruktur digital desa yang terintegrasi",
  "Mendorong pembangunan berkelanjutan berbasis lingkungan",
  "Meningkatkan kualitas sumber daya manususia melalui pendidikan",
  "Mengembangkan ekonomi lokal berbasis UMKM dan pertanian",
];

const values = [
  { title: "Integritas", description: "Tetap tulus dan bertanggung jawab dalam setiap tindakan", icon: Shield },
  { title: "Inovasi", description: "Selalu mencari solusi terbaik dengan pendekatan baru", icon: Lightbulb },
  { title: "Kolaborasi", description: "Bekerja sama dengan semua elemen masyarakat", icon: Users },
  { title: "Keberlanjutan", description: "Pembangunan yang ramah lingkungan dan berkelanjutan", icon: Globe },
  { title: "Kepedulian", description: "Peduli pada kebutuhan masyarakat setiap lokal", icon: Heart },
];

const features = [
  {
    title: "WebGIS Desa",
    description: "Platform digital untuk visualisasi data spasial dan pemetaan fasilitas desa",
    icon: Database,
    color: "text-primary"
  },
  {
    title: "Smart Village",
    description: "Implementasi teknologi untuk meningkatkan efisiensi pemerintahan desa",
    icon: Target,
    color: "text-secondary"
  },
  {
    title: "Data Terbuka",
    description: "Akses data statistik dan informasi desa secara transparan",
    icon: Shield,
    color: "text-accent"
  },
  {
    title: "Layanan Digital",
    description: "Pengambilan keputusan berbasis data dengan pendekatan digital-first",
    icon: Lightbulb,
    color: "text-primary"
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-poppins text-4xl font-bold text-primary mb-4">
            Tentang Desa Mekarjaya
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            WebGIS resmi Desa Mekarjaya untuk mendukung Smart Village dan transparansi pemerintahan desa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="font-poppins text-2xl font-bold text-primary mb-6">Visi</h2>
            <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic border-l-4 border-primary pl-4 py-4">
              {vision}
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="font-poppins text-2xl font-bold text-primary mb-6">Misi</h2>
            <ol className="space-y-4">
              {mission.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 mb-12"
        >
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">Nilai-nilai Desa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="text-center p-4"
              >
                <value.icon className={`w-8 h-8 mx-auto mb-3 ${value.color}`} />
                <h3 className="font-poppins font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2">{value.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8"
        >
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">Fitur WebGIS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <feature.icon className={`w-6 h-6 ${feature.color} flex-shrink-0`} />
                <div>
                  <h3 className="font-poppins font-semibold text-gray-800 dark:text-gray-100 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}