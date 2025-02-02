import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './CustomIcon.css';

const CustomIcon = ({
  position,
  popupContent,
  iconClass = 'fa-solid fa-location-dot',
  iconColor = 'black',
  iconSize = '24px',
  isHighlighted = false,
  markerType = '',
}) => {
  const markerClassName = `custom-marker${isHighlighted ? ' highlighted-marker' : ''}${markerType ? ` marker-${markerType}` : ''}`;

  const iconHtml = `
    <div class="${markerClassName}" style="font-size: ${iconSize}; color: ${iconColor};">
      <i class="${iconClass}"></i>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>{popupContent}</Popup>
    </Marker>
  );
};

CustomIcon.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  popupContent: PropTypes.node.isRequired,
  iconClass: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  isHighlighted: PropTypes.bool,
  markerType: PropTypes.string,
};

export default CustomIcon;
