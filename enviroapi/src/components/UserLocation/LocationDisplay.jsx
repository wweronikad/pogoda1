import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import Sun from './Sun';
import './LocationDisplay.css';

const LocationDisplay = ({ locationName, position }) => {
  const parseAddress = (locationName) => {
    const addressParts = locationName.split(', ');

    const filteredParts = addressParts.filter(part => {
      const isRegionOrCountryOrPostalCode = /gmina|powiat|województwo|province|county|Polska|Poland|\d{2}-\d{3}/i.test(part);
      return !isRegionOrCountryOrPostalCode;
    });

    const city = filteredParts[filteredParts.length - 1];
    return { city };
  };

  const { city } = parseAddress(locationName);

  return (
    <div className="location-display">
      <div className="location-left">
        <FontAwesomeIcon icon={faMapPin} className="location-icon" />
        <div className="location-details">
          <div className="location-city">{city}</div>
        </div>
      </div>
      <div className="sun-info">
        <Sun position={position} />
      </div>
    </div>
  );
};

export default LocationDisplay;
