export const categoryIcons = {
  pemerintahan: 'fa-solid fa-building',
  pendidikan: 'fa-solid fa-school',
  kesehatan: 'fa-solid fa-hospital',
  ibadah: 'fa-solid fa-praying-hands',
  wisata: 'fa-solid fa-tree',
  umkm: 'fa-solid fa-store',
  pertanian: 'fa-solid fa-tractor',
  roads: 'fa-solid fa-road',
  boundary: 'fa-solid fa-fence',
};

export const categoryColors = {
  pemerintahan: '#202940',
  pendidikan: '#4B4038',
  kesehatan: '#9A8678',
  ibadah: '#202940',
  wisata: '#4B4038',
  umkm: '#9A8678',
  pertanian: '#202940',
  roads: '#4B4038',
  boundary: '#9A8678',
};

export const formatCoordinates = (lat, lng) => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

export const getGoogleMapsUrl = (lat, lng) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};