import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    { icon: MapPin, title: 'Alamat', info: 'Jl. Raya Mekarjaya No. 1, Kecamatan Cibungbulang, Kabupaten Bogor, Jawa Barat 16680' },
    { icon: Phone, title: 'Telepon', info: '(0251) 8645-1234' },
    { icon: Mail, title: 'Email', info: 'desa.mekarjaya@bogorkab.go.id' },
    { icon: Clock, title: 'Jam Kerja', info: 'Senin - Jumat: 08:00 - 16:00 WIB' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fa-brands fa-facebook', url: '#' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', url: '#' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', url: '#' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-poppins text-4xl font-bold text-primary mb-4">Kontak Kami</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Hubungi kami untuk pertanyaan, masukan, atau informasi lebih lanjut.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="font-poppins text-2xl font-bold text-primary mb-6">Informasi Kontak</h2>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-poppins font-semibold text-lg text-primary mt-8 mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <h2 className="font-poppins text-2xl font-bold text-primary mb-6">Kirim Pesan</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan</label>
                <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"></textarea>
              </div>
              <button className="w-full btn-primary">Kirim Pesan</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}