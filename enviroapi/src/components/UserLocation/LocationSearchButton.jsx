import React from 'react';
import './LocationSearchButton.css';

const LocationSearchButton = ({ onSearch }) => (
  <button onClick={onSearch} className="location-search-button">
    <i className="fa fa-search" aria-hidden="true"></i>
  </button>
);

export default LocationSearchButton;
