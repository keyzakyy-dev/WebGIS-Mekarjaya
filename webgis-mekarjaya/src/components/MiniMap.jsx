import { motion } from 'framer-motion';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';

const MiniMap = () => {
  const map = useMap();
  const MiniMapControl = () => {
    // Use the Leaflet MiniMap plugin integrated with react-leaflet
    return (
      <div className="mini-map-container">
        <MapContainer
          scrollWheelZoom={false}
          style={{ width: "150px", height: "150px", position: "absolute", bottom: "8px", left: "8px", zIndex: 1000 }}
          center={[map.center?.[1], map.center?.[0]]}
          zoom={map.zoom || 14}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {MiniMapControl()}
    </motion.div>
  );
};

export default MiniMap;