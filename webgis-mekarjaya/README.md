# WebGIS Desa Mekarjaya

WebGIS interaktif untuk Desa Mekarjaya - Portal informasi geografis terintegrasi untuk Smart Village.

## Fitur Utama

- **Peta Interaktif**: React Leaflet dengan OpenStreetMap
- **Layer Control**: Aktif/nonaktifkan berbagai lapisan data
- **Pencarian**: Cari lokasi berdasarkan nama, kategori, atau alamat
- **Marker Clustering**: Kinerja optimal untuk banyak marker
- **Dark Mode**: Tema gelap & terang
- **Responsive Design**: Optimalkan untuk desktop, tablet, dan mobile
- **GitHub Pages**: Deploy otomatis

## Teknologi

- React 19 + Vite
- React Leaflet + Leaflet.js
- Tailwind CSS 4.x
- Framer Motion
- React Router DOM
- OpenStreetMap

## Setup Lokal

```bash
# Clone repository
git clone https://github.com/nama-anda/webgis-mekarjaya.git
cd webgis-mekarjaya

# Install dependencies
npm install

# Development server
npm run dev

# Build untuk produksi
npm run build

# Deploy ke GitHub Pages (manual)
npm run deploy
```

## Otomatis Deploy

Workflow GitHub Actions sudah dikonfigurasi untuk deploy otomatis ke GitHub Pages setiap kali ada push ke branch `main`.

## Struktur Folder

```
src/
├── components/     # Komponen UI (Map, Sidebar, Navbar, dll)
├── pages/          # Halaman (Home, Map, Profile, About, Contact, 404)
├── layouts/        # Layout utama
├── hooks/          # Custom hooks
├── utils/          # Helper functions
├── assets/         # Gambar dan ikon
└── styles/         # CSS global
public/
├── data/           # File GeoJSON
└── images/         # Gambar statis
```

## Data GeoJSON

Semua data geografis disimpan di `public/data/`:
- `sekolah.geojson` - Data sekolah
- `umkm.geojson` - Data UMKM
- `wisata.geojson` - Data wisata
- `kesehatan.geojson` - Data kesehatan
- `pemerintahan.geojson` - Data pemerintahan
- `ibadah.geojson` - Data tempat ibadah
- `agri.geojson` - Data pertanian
- `jalan.geojson` - Data jalan
- `batasdesa.geojson` - Batas desa

## Konfigurasi GitHub Pages

Setelah deploy pertama:
1. Buka Settings → Pages
2. Source: `gh-pages` branch → `/ (root)`
3. URL akan tersedia di `https://nama-anda.github.io/webgis-mekarjaya/`

## Kontribusi

Silakan fork dan kirim pull request untuk perbaikan!

## Lisensi

MIT License - Dibuat untuk Desa Mekarjaya