import React, { useState,useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Headers/Header';
import Map from './components/Map/Map';
import LocationSearch from './components/UserLocation/LocationSearch';
import PollutionMarkers from './components/Pollution/PollutionMarkers';
import WeatherMarkers from './components/Weather/WeatherMarkers';
import HydroMarkers from './components/Hydro/HydroMarkers';
import PollutionStationsData from './components/Pollution/PollutionStationsData';
import PollutionData from './components/Pollution/PollutionData';
import WeatherStationsData from './components/Weather/WeatherStationsData';
import HydroStationsData from './components/Hydro/HydroStationsData';
import NearestStation from './components/NearestStation/NearestStation';
import backgroundImage from './backgrounds/clear_sky.webp';
import Footer from './components/Headers/Footer';
import './App.css';

function App() {
  const defaultPosition = [52.239087, 21.017461]; // Warszawa
  const [position, setPosition] = useState(defaultPosition);
  const [pollutionStations, setPollutionStations] = useState([]);
  const [combinedPollutionData, setCombinedPollutionData] = useState([]);
  const [weatherStations, setWeatherStations] = useState([]);
  const [hydroStations, setHydroStations] = useState([]);
  const [highlightedStations, setHighlightedStations] = useState({
    pollution: null,
    weather: null,
    hydro: null,
  });
  

  const handleLocationSelect = (newPosition) => {
    setPosition(newPosition);
  };

  const handlePollutionDataFetch = (data) => {
    setPollutionStations(data);
  };

  const handleCombinedPollutionDataFetch = (data) => {
    setCombinedPollutionData((prevData) => [...prevData, ...data]);
  };

  const handleWeatherDataFetch = (data) => {
    setWeatherStations(data);
  };

  const handleHydroDataFetch = (data) => {
    setHydroStations(data);
  };

  const handleHighlightStation = useCallback((station, type) => {
    setHighlightedStations((prev) => ({
      ...prev,
      [type]: station,
    }));
  }, []);

  const handleShowOnMap = (coordinates) => {
    if (mapRef.current) {
      mapRef.current.zoomToMarker(coordinates);
    }
  };

  const markers = [
    ...PollutionMarkers({ pollutionStations, pollutionData: combinedPollutionData, highlightedStation: highlightedStations.pollution }),
    ...WeatherMarkers({ weatherStations, highlightedStation: highlightedStations.weather }),
    ...HydroMarkers({ hydroStations, highlightedStation: highlightedStations.hydro }),
    { id: 'user', position, iconUrl: '/icons/blue_pin.png', popupContent: 'Twoja lokalizacja' }
  ];

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header />
      <LocationSearch onLocationSelect={handleLocationSelect} />
      <Map 
        position={position} 
        markers={markers}
        onZoomAndHighlight={() => {}}
      />
      <PollutionStationsData onDataFetch={handlePollutionDataFetch} />
      <PollutionData stationsData={pollutionStations} onCombinedDataFetch={handleCombinedPollutionDataFetch} />
      <WeatherStationsData onDataFetch={handleWeatherDataFetch} />
      <HydroStationsData onDataFetch={handleHydroDataFetch} />
      <div className="nearest-stations-container">
        <NearestStation 
          userLocation={position} 
          Stations={combinedPollutionData} 
          nearestStationText="Najbliższa stacja zanieczyszczeń powietrza:" 
          type="pollution" 
          onHighlightStation={handleHighlightStation}
        />
        <NearestStation 
          userLocation={position} 
          Stations={weatherStations} 
          nearestStationText="Najbliższa stacja pogodowa:" 
          type="weather" 
          onHighlightStation={handleHighlightStation}
        />
        <NearestStation 
          userLocation={position} 
          Stations={hydroStations} 
          nearestStationText="Najbliższa stacja hydrologiczna:" 
          type="hydro"
          onHighlightStation={handleHighlightStation}
        />
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  defaultPosition: PropTypes.arrayOf(PropTypes.number),
  pollutionStations: PropTypes.arrayOf(PropTypes.object),
  combinedPollutionData: PropTypes.arrayOf(PropTypes.object),
  weatherStations: PropTypes.arrayOf(PropTypes.object),
  hydroStations: PropTypes.arrayOf(PropTypes.object),
};

export default App;
