import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const WeatherDataComponent = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        try {
          const apiData = await axios.get('https://danepubliczne.imgw.pl/api/data/synop');
          const geoJsonDataResponse = await axios.get('/localizations/weather/stacje_synoptyczne_metadata.geojson');
          const geoJsonData = geoJsonDataResponse.data;

          const mergedData = apiData.data.map(apiItem => {
            if (apiItem.stacja === "Platforma") return null;

            const kodStacji = apiItem.id_stacji.slice(-3);
            const matchingFeature = geoJsonData.features.find(
              feature => feature.properties['kod stacji'] === kodStacji
            );

            return matchingFeature
              ? { ...apiItem, lon: matchingFeature.geometry.coordinates[0], lat: matchingFeature.geometry.coordinates[1] }
              : null;
          }).filter(Boolean);

          onDataFetch(mergedData);
          setDataFetched(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [dataFetched, onDataFetch]);

  return null;
};

WeatherDataComponent.propTypes = {
  onDataFetch: PropTypes.func.isRequired,
};

export default WeatherDataComponent;
