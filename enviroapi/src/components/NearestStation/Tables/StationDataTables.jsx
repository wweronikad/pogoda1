import React from 'react';
import PollutionTable from './PollutionTable';
import WeatherTable from './WeatherTable';
import HydroTable from './HydroTable';

const StationData = ({ station, type}) => {
  if (!station) {
    console.error('StationData: station prop is undefined');
    return <div>Error: Station data is missing.</div>;
  }

  const tables = {
    pollution: (
      <PollutionTable 
        station={station} 
      />
    ),
    weather: (
      <WeatherTable 
        station={station} 
      />
    ),
    hydro: (
      <HydroTable 
        station={station} 
      />
    ),
  };

  return tables[type] || null;
};

export default StationData;
