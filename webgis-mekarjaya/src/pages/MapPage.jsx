import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { GeoJSON, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const categories = {
  pemerintahan: { label: 'Pemerintahan', url: '/data/pemerintahan.geojson', icon: 'fa-solid fa-building' },
  pendidikan: { label: 'Pendidikan', url: '/data/sekolah.geojson', icon: 'fa-solid fa-school' },
  kesehatan: { label: 'Kesehatan', url: '/data/kesehatan.geojson', icon: 'fa-solid fa-hospital' },
  ibadah: { label: 'Ibadah', url: '/data/ibadah.geojson', icon: 'fa-solid fa-praying-hands' },
  wisata: { label: 'Wisata', url: '/data/wisata.geojson', icon: 'fa-solid fa-tree' },
  umkm: { label: 'UMKM', url: '/data/umkm.geojson', icon: 'fa-solid fa-store' },
  pertanian: { label: 'Pertanian', url: '/data/agri.geojson', icon: 'fa-solid fa-tractor' },
  roads: { label: 'Jalan', url: '/data/jalan.geojson', icon: 'fa-solid fa-road' },
  boundary: { label: 'Batas Desa', url: '/data/batasdesa.geojson', icon: 'fa-solid fa-fence' },
};

function MapView({ activeLayers, selectedCategory, theme }) {
  const map = useMap();
  const [geoJsonData, setGeoJsonData] = useState({});

  const loadGeoJson = useCallback(async () => {
    const data = {};
    for (const [key, cat] of Object.entries(categories)) {
      if (!activeLayers[cat.label]) continue;
      try {
        const response = await fetch(cat.url);
        const geojson = await response.json();
        data[key] = { ...cat, geojson };
      } catch (error) {
        console.error(`Failed to load ${cat.url}:`, error);
      }
    }
    setGeoJsonData(data);
  }, [activeLayers]);

  useEffect(() => {
    loadGeoJson();
  }, [loadGeoJson]);

  useEffect(() => {
    const bounds = [];
    Object.values(geoJsonData).forEach(cat => {
      if (cat.geojson?.features) {
        cat.geojson.features.forEach(f => {
          if (f.geometry?.type === 'Point') {
            bounds.push([f.geometry.coordinates[1], f.geometry.coordinates[0]]);
          } else if (f.geometry?.type === 'Polygon') {
            f.geometry.coordinates[0].forEach(coord => {
              bounds.push([coord[1], coord[0]]);
            });
          } else if (f.geometry?.type === 'LineString') {
            f.geometry.coordinates.forEach(coord => {
              bounds.push([coord[1], coord[0]]);
            });
          }
        });
      }
    });

    if (bounds.length > 0) {
      const boundsObj = L.latLngBounds(bounds);
      if (boundsObj.isValid()) {
        map.fitBounds(boundsObj, { maxZoom: 16, padding: [50, 50] });
      }
    }
  }, [geoJsonData, map]);

  const PopupContent = ({ feature }) => {
    const p = feature.properties;
    return (
      <div className="glass-card p-4 min-w-[280px]">
        {p.image && (
          <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3 border-2 border-white dark:border-gray-700" />
        )}
        <h3 className="font-poppins font-semibold text-lg mb-1">{p.name}</h3>
        {p.description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{p.description}</p>}
        {p.category && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kategori: <span className="font-medium">{p.category}</span></p>}
        {p.address && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Alamat: {p.address}</p>}
        {p.coordinates && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Koordinat: {p.coordinates[1]?.toFixed(6)}, {p.coordinates[0]?.toFixed(6)}</p>}
        {(p.latitude && p.longitude) && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${p.latitude},${p.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-primary dark:bg-accent text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8h5.5a8 8 0 0 0 6.5 2h-.5a7 7 0 0 0-4.2 6H12z" />
            </svg>
            <span>Buka di Google Maps</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      {Object.entries(geoJsonData).map(([key, cat]) => {
        if (!cat.geojson) return null;
        
        return (
          <GeoJson
            key={key}
            data={cat.geojson}
            pointToLayer={(feature, latlng) => {
              const iconHtml = `<i class="fa-solid ${cat.icon} fa-2x text-primary dark:text-gray-300"></i>`;
              return L.marker(latlng, {
                icon: L.divIcon({
                  html: iconHtml,
                  className: 'custom-marker-icon',
                  iconSize: [32, 32],
                  iconAnchor: [16, 32]
                })
              });
            }}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(
                <PopupContent feature={feature} />,
                { className: 'custom-popup', maxWidth: 320 }
              );
            }}
            filter={({ properties }) => {
              if (selectedCategory && properties.category !== selectedCategory) return false;
              return true;
            }}
          />
        );
      })}
    </>
  );
}

function SearchBar({ value, onChange, onSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-3 flex items-center space-x-2 w-full"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Cari nama, kategori, atau alamat..."
        data-search-input
        className="flex-1 bg-transparent border-none outline-none text-sm text-primary dark:text-gray-100 placeholder-gray-400"
      />
      <button
        onClick={onSearch}
        className="p-2 bg-primary dark:bg-accent text-white rounded-lg hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </motion.div>
  );
}

function Legend() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-3 w-48"
    >
      <h4 className="font-poppins font-medium mb-3">Legenda</h4>
      <div className="space-y-2">
        {Object.entries(categories).map(([key, cat]) => (
          <div key={key} className="flex items-center space-x-2">
            <i className={`fa-solid ${cat.icon} text-primary dark:text-gray-300 text-lg`} />
            <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{cat.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MapPage() {
  const { theme } = useTheme();
  const [activeLayers, setActiveLayers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initialLayers = {};
    Object.values(categories).forEach(cat => {
      initialLayers[cat.label] = true;
    });
    setActiveLayers(initialLayers);
  }, []);

  const handleSearch = () => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;
    
    const filteredCategories = Object.entries(categories).filter(([key, cat]) => {
      return cat.label.toLowerCase().includes(q) || key.toLowerCase().includes(q);
    });
    
    if (filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0][1].label);
    }
  };

  const toggleLayer = (category, enabled) => {
    setActiveLayers(prev => ({ ...prev, [category]: enabled }));
  };

  const renderLayerControl = () => (
    <div className="absolute top-20 left-4 z-10 glass-card p-3 max-h-96 overflow-y-auto w-56 hidden md:block">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-poppins font-medium">Lapisan</h3>
        <button
          onClick={() => setActiveLayers(prev => {
            const next = {};
            const anyEnabled = Object.values(prev).some(v => v);
            Object.keys(prev).forEach(k => next[k] = !anyEnabled);
            return next;
          })}
          className="text-xs text-primary hover:underline"
        >
          {Object.values(activeLayers).some(v => v) ? 'Sembunyikan Semua' : 'Tampilkan Semua'}
        </button>
      </div>
      <div className="space-y-2">
        {Object.entries(categories).map(([key, cat]) => {
          const enabled = activeLayers[cat.label] !== false;
          return (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => toggleLayer(cat.label, e.target.checked)}
                className="w-4 h-4 rounded bg-primary text-white focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm font-medium capitalize">{cat.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed top-16 left-4 right-4 md:left-20 md:right-20 z-10 max-w-2xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
      </div>
      
      <div className="fixed top-16 right-4 z-10 md:right-20 hidden md:block">
        <Legend />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 relative"
      >
        <MapContainer
          className="min-h-full"
          scrollWheelZoom={true}
          center={[-6.5812, 106.8012]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {renderLayerControl()}

          <MarkerClusterGroup
            chunkedLoading
            chunkProgress
            disableClusteringAtZoom={17}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
          >
            <MapView 
              activeLayers={activeLayers} 
              selectedCategory={selectedCategory} 
              theme={theme} 
            />
          </MarkerClusterGroup>
        </MapContainer>
      </motion.div>
    </div>
  );
}