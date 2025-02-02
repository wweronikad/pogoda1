import React from 'react';
import NearestStation from './NearestStation';

const NearestStations = ({ userLocation, pollutionStations, weatherStations, hydroStations }) => {
  return (
    <div className="nearest-stations-container">
      <NearestStation 
        userLocation={userLocation} 
        Stations={pollutionStations} 
        nearestStationText="Najbliższa stacja zanieczyszczeń powietrza:" 
        type="pollution" 
      />
      <NearestStation 
        userLocation={userLocation} 
        Stations={weatherStations} 
        nearestStationText="Najbliższa stacja pogodowa:" 
        type="weather" 
      />
      <NearestStation 
        userLocation={userLocation} 
        Stations={hydroStations} 
        nearestStationText="Najbliższa stacja hydrologiczna:" 
        type="hydro" 
      />
    </div>
  );
};

export default NearestStations;
