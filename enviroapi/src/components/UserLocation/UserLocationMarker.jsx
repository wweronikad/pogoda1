import React, { useEffect, useRef, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const UserLocationMarker = ({ position }) => {
  const map = useMap();
  const [initialPopupContent, setInitialPopupContent] = useState('Twoja domyślna lokalizacja');
  const [initialZoomDone, setInitialZoomDone] = useState(false);
  const markerRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    if (!initialZoomDone) {
      map.setView(position, 8);
      setTimeout(() => {
        map.flyTo(position, 12, { duration: 1.5 });
        setInitialZoomDone(true);
        const popup = L.popup({ closeButton: false })
          .setLatLng(position)
          .setContent('Twoja domyślna lokalizacja')
          .openOn(map);
        setTimeout(() => {
          map.closePopup(popup);
          if (markerRef.current) {
            markerRef.current.openPopup();
          }
        }, 2000);
      }, 500);
    }
  }, [position, initialZoomDone, map]);

  useEffect(() => {
    if (initialZoomDone && currentPosition !== position) {
      setInitialPopupContent('Twoja lokalizacja');
      setCurrentPosition(position);
      map.flyTo(position, 12, { duration: 1.5 });
    }
  }, [position, initialZoomDone, currentPosition, map]);

  const customIcon = L.divIcon({
    html: `<div style="font-size: 30px; color: black;"><i class="fa-solid fa-circle-user"></i></div>`,
    className: 'custom-marker',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const handleDragEnd = (event) => {
    const newLatLng = event.target.getLatLng();
    setCurrentPosition(newLatLng);
    setInitialPopupContent('Twoja lokalizacja');
  };

  return (
    <Marker
      position={currentPosition}
      icon={customIcon}
      ref={markerRef}
      draggable={true}
      eventHandlers={{ dragend: handleDragEnd }}
    >
      <Popup>{initialPopupContent}</Popup>
    </Marker>
  );
};

export default UserLocationMarker;
