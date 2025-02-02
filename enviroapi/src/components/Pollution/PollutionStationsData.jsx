import { useState, useEffect } from 'react';

const PollutionStationsData = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchPollutionStationsData = async () => {
        try {
          const response = await fetch('/localizations/pollution/pollution_xy.geojson');
          const geojson = await response.json();
          
          const pollutionStationsData = geojson.features.map(feature => ({
            id: feature.properties.id,
            stationName: feature.properties.name,
            gegrLat: feature.geometry.coordinates[1],
            gegrLon: feature.geometry.coordinates[0],
          }));
          
          onDataFetch(pollutionStationsData);
          setDataFetched(true);
        } catch (error) {
          console.error('Błąd przy fetchowaniu:', error);
        }
      };

      fetchPollutionStationsData();
    }
  }, [dataFetched, onDataFetch]);

  return null;
};

export default PollutionStationsData;
