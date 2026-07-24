import { MapContainer, TileLayer, GeoJson, Markers, Popup, useMap } from 'react-leaflet';
import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Custom icons
const requireContext = require.context('@/assets/icons', false, /\.(svg|png)$/);
function loadIcon(name, extension = 'svg') {
  const key = Object.keys(requireContext).find(k => k.includes(name));
  if (!key) return null;
  const path = requireContext(key);
  // Return an SVG React component or set src for img
  return `<svg className="w-6 h-6 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <use href="${path}" width="100%" height="100%" />
  </svg>`;
}

// Load all GeoJSON files
const categories = {
  pemerintahan: { label: 'Pemerintahan', geojson: '/data/pemerintahan.geojson' },
  pendidikan: { label: 'Pendidikan', geojson: '/data/sekolah.geojson' },
  kesehatan: { label: 'Kesehatan', geojson: '/data/kesehatan.geojson' },
  ibadah: { label: 'Ibadah', geojson: '/data/ibadah.geojson' },
  wisata: { label: 'Wisata', geojson: '/data/wisata.geojson' },
  umkm: { label: 'UMKM', geojson: '/data/umkm.geojson' },
  pertanian: { label: 'Pertanian', geojson: '/data/agri.geojson' },
  roads: { label: 'Jalan', geojson: '/data/jalan.geojson', icon: 'road' },
  boundary: { label: 'Batas Desa', geojson: '/data/batasdesa.geojson', icon: 'fence' },
};

export default function MapPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [mapRef] = useMap();
  const navigate = useNavigate();

  // Set map center and zoom after load
  useEffect(() => {
    const bounds = L.latLngBounds(
      Object.values(categories).map(cat => L.latLng(cat.latLng[1], cat.latLng[0]))
    );
    const center = bounds.getCenter();
    mapRef.setView([center.lat, center.lng], 13);
  }, [mapRef]);

  // Load GeoJSON data for selected categories
  const loadedLayers = Object.entries(categories)
    .filter(([, cat]) => !activeFilters[cat.label] || activeFilters[cat.label])
    .map(([key, cat]) => {
      return {
        id: key,
        type: 'FeatureCollection',
        properties: { category: key, ...cat },
        geometry: {
          type: 'Polygon',
          coordinates: cat.geoJSON?.coordinates || []
        }
      };
    });

  // Search handling
  const handleSearch = () => {
    const needle = searchQuery.toLowerCase();
    const results = loadedLayers
      .map(layer => {
        const lowerName = (layer.properties.name || '').toLowerCase();
        const lowerDesc = (layer.properties.description || '').toLowerCase();
        if (lowerName.includes(needle) || lowerDesc.includes(needle)) {
          const lat = layer.properties.coordinates?.[1];
          const lng = layer.properties.coordinates?.[0];
          if (lat && lng) {
            navigate('/peta/' + lat + '/' + lng);
            return { ...layer, lat, lng };
          }
        }
        return null;
      })
      .filter(Boolean);
    console.log('Search results:', results);
  };

  // Toggle layer filter
  const toggleFilter = (category, enabled) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: enabled
    }));
  };

  // Render popup content
  const PopupContent = ({ feature: feature }) => {
    const props = feature.properties;
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-center">
          <img
            src={props.image || '/images/default.jpg'}
            alt={props.name}
            className="w-20 h-20 object-cover rounded-lg border-2 border-white dark:border-gray-700"
          />
        </div>
        <h2 className="text-lg font-poppins font-semibold">{props.name}</h2>
        <p className="text-sm text-gray-600">{props.description}</p>
        <p className="text-xs text-gray-500">Kategori: <span className="font-medium">{props.category}</span></p>
        <p className="text-xs text-gray-500">Koordinat: {props.latitude?.toFixed(6)}, {props.longitude?.toFixed(6)}</p>
        <button className="mt-2 flex flex-row items-center space-x-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${props.latitude},${props.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-primary dark:bg-accent text-white px-3 py-1 rounded hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8h5.5a8 8 0 0 0 6.5 2h-.5a7 7 0 0 0-4.2 6H12z" />
            </svg>
            Cari di Peta
          </a>
        </button>
      </div>
    );
  };

  // Available marker icons per category
  const categoryIcons = {
    pemerintahan: 'fa-solid fa-building',
    pendidikan: 'fa-solid fa-school',
    kesehatan: 'fa-solid fa-hospital',
    ibadah: 'fa-solid fa-praying-hands',
    wisata: 'fa-solid fa-tree',
    umkm: 'fa-solid fa-store',
    pertanian: 'fa-solid fa-tractor',
    roads: 'fa-solid fa-road',
    boundary: 'fa-solid fa-polygon',
  };

  // Build layer control UI
  const renderLayerControl = () => (
    <div className="map-control glass-card p-4">
      <h3 className="font-poppins font-medium mb-3">Lapisan</h3>
      <div className="space-y-2">
        {Object.entries(categories).map(([key, cat]) => {
          const enabled = !!activeFilters[key];
          const icon = categoryIcons[key] || 'fa-solid fa-circle';
          return (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => toggleFilter(key, !enabled)}
                className="w-4 h-4 rounded bg-primary text-white"
              />
              <span className="font-medium text-sm">{cat.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  // Legend component
  const Legend = () => (
    <div className="glass-card p-3 mb-3 bg-gray-100 dark:bg-gray-800 roundedd-lg">
      <h4 className="font-poppins font-medium mb-2">Legenda</h4>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(categoryIcons).map(([key, Icon]) => (
          <div key={key} className="flex items-center space-x-1">
            <span className="text-xs flex items-center">
              <i className={Icon} className="w-5 h-5 text-primary"></i>
            </span>
            <span className={`font-light text-sm flex-1 capitalize`}>
              {categories[key]?.label || key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Search Input component
  const SearchBar = () => {
    return (
      <div className="flex-1 px-3 bg-gray-50 dark:bg-gray-700 rounded-full h-10">
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          className="w-full bg-transparent border-none focus:outline-none text-sm font-inter px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          data-search-input
        />
      </div>
    );
  };

  return (
    <MapContainer
      className="min-h-screen"
      scrollWheelZoom={false}
      attributionControl={false}
      center={[ -6.5812, 106.8012 ]}
      zoom={14}
      whenCreated={map => {
        // Add custom controls to Leaflet map instance
        const mapInstance = map;
        const layerControl = L.control.layers({}).addTo(mapInstance);
        mapInstance.on('click', () => layerControl.collapse({ reset: false }));
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render legend and layer control */}
      <div id="controls" className="absolute top-4 left-4 z-10">
        {renderLayerControl()}
        <Legend />
      </div>

      {/* Search bar at top */}
      <div className="absolute top-2 right-4 z-10 w-full max-w-xs">
        <SearchBar />
      </div>

      {/* Layer groups */}
      {loadedLayers.map(layer => {
        // Simplified usage: just add markers if geoJSON is point
        if (layer.geometry?.type === 'Point') {
          // This placeholder loads GeoJSON features — actual values come from loaded GeoJSON files
        }
        return null;
      })}

      {/* Markers from GeoJSON layers */}
      {loadedLayers.map((layer, idx) => (
        <GeoJson
          key={layer.id}
          data={layer.geometry}
          options={({
            click: e => {
              const feature = e.layer.feature;
              // You could open a modal with more details
            }
          })}
          pointToLayer={(feature, latlng) => {
            // Use custom icon per category
            const categoryKey = Object.keys(categories).find(
              key => categories[key]?.label === feature.properties.category
            );
            return L.marker(latlng, {
              title: feature.properties.name,
              icon: L.divIcon({
                html: `<i class="fa-solid fa-map-marker fa-2x text-${theme === 'dark' ? 'gray-300' : 'primary'}"></i>`,
                className: 'custom-marker'
              })
            });
          }}
          onEachFeature={(feature, layer) => {
            const props = feature.properties;
            layer.bindPopup(React.createElement(PopupContent, { feature: feature }));
          }}
          filter={({ properties }) => {
            // Show only layers that match selected filters
            const isVisible = !selectedCategory || properties.category === selectedCategory;
            const matchesSub = !selectedSubCategory || (properties.subcategory || '') === selectedSubCategory;
            return isVisible && matchesSub;
          }}
        >
          <Popup contentClassName="popup-content" closeOnClickOutside={false} />
        </GeoJson>
      ))}

      {/* Clustering */}
      <Markers
        distance={40}
        chunkedLoading
        chunkedLoadingLevel={5}
        disableClusteringAtZoom={17}
        singleColor={false}
      >
        {loadedLayers.map(layer => (
          layer.geometry?.features?.map(f => {
            const lat = f.geometry.coordinates[1];
            const lng = f.geometry.coordinates[0];
            const markerProps = {
              ...f.properties,
              coordinates: [lng, lat]
            };
            return (
              <Marker
                key={markerProps.id}
                position={[lng, lat]}
                icon={L.divIcon({
                  html: `<i class="fa-solid fa-search" style="color:${theme === 'dark' ? 'gray-300' : 'primary'}"></i>`},
                  className: 'custom-marker-cluster'
                })}
                onClick={() => {
                  navigate(`/peta/${lat}/${lng}`);
                }}
              >
                {/* Tooltip shows name */}
                <DivIcon html={markerProps.name} />
              </Marker>
            );
          })
        ))}
      </Markers>
    </MapContainer>
  );
}