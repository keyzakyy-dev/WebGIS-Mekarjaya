import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'fa-brands fa-facebook-f', href: '#', label: 'Facebook' },
    { icon: 'fa-brands fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fa-brands fa-instagram', href: '#', label: 'Instagram' },
    { icon: 'fa-brands fa-youtube', href: '#', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Jl. Raya Mekarjaya No. 1, Desa Mekarjaya, Kec. Cibungbulang, Kab. Bogor, Jawa Barat 16680' },
    { icon: Phone, text: '(0251) 8645-1234' },
    { icon: Mail, text: 'desa.mekarjaya@bogorkab.go.id' },
    { icon: Clock, text: 'Senin - Jumat: 08:00 - 16:00 WIB' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Desa Mekarjaya</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              WebGIS resmi Desa Mekarjaya untuk informasi geografis, fasilitas umum, dan profil desa.
              Dibangun untuk mendukung Smart Village dan transparansi pemerintahan desa.
            </p>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Beranda', path: '/' },
                { label: 'Peta Interaktif', path: '/peta' },
                { label: 'Profil Desa', path: '/profil' },
                { label: 'Tentang', path: '/tentang' },
                { label: 'Kontak', path: '/kontak' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Kategori</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Pemerintahan',
                'Pendidikan',
                'Kesehatan',
                'Ibadah',
                'Wisata',
                'UMKM',
                'Pertanian',
              ].map((cat) => (
                <li key={cat}>
                  <Link to={`/peta?category=${cat.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Media Sosial</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            <h4 className="font-poppins font-medium mb-3">Informasi Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-start space-x-3">
                  <item.icon size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Desa Mekarjaya. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Dibangun dengan <span className="text-red-500">♥</span> untuk Smart Village
          </p>
        </div>
      </div>
    </footer>
  );
}