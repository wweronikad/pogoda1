import React from 'react';
import HydroStationsData from './HydroStationsData';

const HydroStations = ({ onDataFetch }) => {
  return <HydroStationsData onDataFetch={onDataFetch} />;
};

export default HydroStations;
