import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from 'react-leaflet';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const categories = {
  pemerintahan: { label: 'Pemerintahan', url: '/webgis-mekarjaya/data/pemerintahan.geojson', icon: 'fa-solid fa-building' },
  pendidikan: { label: 'Pendidikan', url: '/webgis-mekarjaya/data/sekolah.geojson', icon: 'fa-solid fa-school' },
  kesehatan: { label: 'Kesehatan', url: '/webgis-mekarjaya/data/kesehatan.geojson', icon: 'fa-solid fa-hospital' },
  ibadah: { label: 'Ibadah', url: '/webgis-mekarjaya/data/ibadah.geojson', icon: 'fa-solid fa-praying-hands' },
  wisata: { label: 'Wisata', url: '/webgis-mekarjaya/data/wisata.geojson', icon: 'fa-solid fa-tree' },
  umkm: { label: 'UMKM', url: '/webgis-mekarjaya/data/umkm.geojson', icon: 'fa-solid fa-store' },
  pertanian: { label: 'Pertanian', url: '/webgis-mekarjaya/data/agri.geojson', icon: 'fa-solid fa-tractor' },
};

const categoryIconColors = {
  pemerintahan: '#202940',
  pendidikan: '#4B4038',
  kesehatan: '#e74c3c',
  ibadah: '#27ae60',
  wisata: '#3498db',
  umkm: '#9A8678',
  pertanian: '#8B4513',
};

function PopupContent({ feature }) {
  const p = feature.properties;
  const lat = p.coordinates ? p.coordinates[1] : (feature.geometry?.coordinates?.[1]);
  const lng = p.coordinates ? p.coordinates[0] : (feature.geometry?.coordinates?.[0]);
  const mapsUrl = (lat && lng) ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` : '#';

  return (
    <div className="p-4 min-w-[260px] max-w-[300px]">
      {p.image && (
        <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-lg mb-2" />
      )}
      <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'Poppins, sans-serif', color: '#202940' }}>{p.name}</h3>
      {p.description && <p className="text-xs text-gray-600 mb-2">{p.description}</p>}
      {p.category && <p className="text-xs text-gray-500 mb-1">Kategori: <span className="font-medium">{p.category}</span></p>}
      {p.address && <p className="text-xs text-gray-500 mb-1">Alamat: {p.address}</p>}
      {(lat && lng) && <p className="text-xs text-gray-500 mb-2">Koordinat: {lat?.toFixed(6)}, {lng?.toFixed(6)}</p>}
      {(lat && lng) && (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
          className="inline-block bg-[#202940] text-white px-3 py-1.5 rounded text-xs hover:opacity-90 transition-opacity">
          Buka di Google Maps
        </a>
      )}
    </div>
  );
}

function GeoJsonLayer({ geojson, categoryKey, icon, selectedCategory }) {
  return (
    <GeoJSON
      key={categoryKey}
      data={geojson}
      pointToLayer={(feature, latlng) => {
        const color = categoryIconColors[categoryKey] || '#202940';
        return L.marker(latlng, {
          icon: L.divIcon({
            html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><i class="${icon}" style="font-size:24px;color:${color};filter:drop-shadow(1px 1px 2px rgba(0,0,0,0.3));"></i></div>`,
            className: '',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          })
        });
      }}
      onEachFeature={(feature, layer) => {
        layer.bindPopup(<PopupContent feature={feature} />, { maxWidth: 320 });
      }}
      filter={({ properties }) => {
        if (selectedCategory && properties.category !== selectedCategory) return false;
        return true;
      }}
    />
  );
}

function MapLoader({ activeLayers, selectedCategory }) {
  const [geoJsonData, setGeoJsonData] = useState({});
  const map = useMap();

  const loadGeoJson = useCallback(async () => {
    const data = {};
    for (const [key, cat] of Object.entries(categories)) {
      if (!activeLayers[cat.label]) continue;
      try {
        const response = await fetch(cat.url);
        if (response.ok) {
          const geojson = await response.json();
          data[key] = geojson;
        }
      } catch (error) {
        console.error(`Gagal memuat ${cat.url}:`, error);
      }
    }
    setGeoJsonData(data);
  }, [activeLayers]);

  useEffect(() => {
    loadGeoJson();
  }, [loadGeoJson]);

  useEffect(() => {
    const bounds = [];
    Object.values(geoJsonData).forEach(geojson => {
      if (geojson?.features) {
        geojson.features.forEach(f => {
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

  return (
    <>
      {Object.entries(geoJsonData).map(([key, geojson]) => (
        <GeoJsonLayer
          key={key}
          geojson={geojson}
          categoryKey={key}
          icon={categories[key].icon}
          selectedCategory={selectedCategory}
        />
      ))}
    </>
  );
}

function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="glass-card p-2 flex items-center space-x-2 w-full">
      <svg className="w-5 h-5 text-gray-400 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Cari nama, kategori, atau alamat..."
        data-search-input
        className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
      />
      <button
        onClick={onSearch}
        className="p-1.5 bg-[#202940] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

function Legend() {
  return (
    <div className="glass-card p-3 w-48">
      <h4 className="font-medium mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Legenda</h4>
      <div className="space-y-1.5">
        {Object.entries(categories).map(([key, cat]) => (
          <div key={key} className="flex items-center space-x-2">
            <i className={`${cat.icon} text-sm`} style={{ color: categoryIconColors[key] }} />
            <span className="text-xs text-gray-600">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerControl({ activeLayers, toggleLayer, setActiveLayers }) {
  const allCategories = Object.values(categories).map(c => c.label);
  const anyEnabled = allCategories.some(l => activeLayers[l] !== false);

  return (
    <div className="glass-card p-3 max-h-96 overflow-y-auto w-52 hidden md:block">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Lapisan</h3>
        <button
          onClick={() => {
            const next = {};
            allCategories.forEach(l => next[l] = !anyEnabled);
            setActiveLayers(next);
          }}
          className="text-xs text-[#202940] hover:underline"
        >
          {anyEnabled ? 'Sembunyikan' : 'Tampilkan'}
        </button>
      </div>
      <div className="space-y-1.5">
        {Object.entries(categories).map(([key, cat]) => {
          const enabled = activeLayers[cat.label] !== false;
          return (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => toggleLayer(cat.label, e.target.checked)}
                className="w-3.5 h-3.5 rounded"
              />
              <span className="text-xs">{cat.label}</span>
            </label>
          );
        })}
      </div>
    </div>
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
    if (!q) { setSelectedCategory(''); return; }
    const match = Object.values(categories).find(cat => cat.label.toLowerCase().includes(q));
    if (match) setSelectedCategory(match.label);
    else setSelectedCategory('');
  };

  const toggleLayer = (label, enabled) => {
    setActiveLayers(prev => ({ ...prev, [label]: enabled }));
  };

  return (
    <div className="relative" style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}>
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 md:left-20 md:right-auto z-[1000] max-w-md">
        <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
      </div>

      {/* Layer Control - desktop */}
      <div className="absolute top-20 left-4 z-[1000] hidden md:block">
        <LayerControl activeLayers={activeLayers} toggleLayer={toggleLayer} setActiveLayers={setActiveLayers} />
      </div>

      {/* Legend - desktop */}
      <div className="absolute top-20 right-4 z-[1000] hidden md:block">
        <Legend />
      </div>

      {/* Map */}
      <MapContainer
        center={[-6.5812, 106.8012]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapLoader activeLayers={activeLayers} selectedCategory={selectedCategory} />
      </MapContainer>
    </div>
  );
}