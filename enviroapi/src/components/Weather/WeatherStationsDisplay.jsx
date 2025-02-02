import React from 'react';
import WeatherStationsData from './WeatherStationsData';

const WeatherStations = ({ onDataFetch }) => {
  return <WeatherStationsData onDataFetch={onDataFetch} />;
};

export default WeatherStations;
