import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import CustomIcon from '../Popups/CustomIcon.jsx';
import UserLocationMarker from '../UserLocation/UserLocationMarker.jsx';
import Legend from './Legend.jsx';
import './Map.css';

const Map = ({ position, markers, onZoomAndHighlight }) => {
  const mapRef = useRef(null);

  return (
    <MapContainer
      ref={mapRef}
      center={[52.0, 19.0]}
      zoom={6}
      scrollWheelZoom={true}
      className="custom-map"
      style={{ height: '500px', width: '90%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {Array.isArray(markers) &&
        markers.map(marker => (
          marker.id === 'user' ? (
            <UserLocationMarker key={marker.id} position={marker.position} iconUrl="/icons/blue_pin.png" />
          ) : (
            <CustomIcon
              key={marker.id}
              position={marker.position}
              popupContent={marker.popupContent}
              iconClass={marker.iconClass}
              iconColor={marker.iconColor}
              iconSize={marker.iconSize}
              isHighlighted={marker.isHighlighted}
              markerType={marker.markerType}
            />
          )
        ))
      }
      <Legend markers={markers} />
    </MapContainer>
  );
};

export default Map;
