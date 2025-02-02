import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const mapGeoJsonData = (geoJsonData) => {
  return geoJsonData.features.reduce((acc, feature) => {
    acc[feature.properties.id] = feature;
    return acc;
  }, {});
};

const mergeHydroData = (apiData, geoJsonMap) => {
  return apiData
    .map((station) => {
      const matchingGeoJsonFeature = geoJsonMap[station.id_stacji];

      if (matchingGeoJsonFeature) {
        const { coordinates } = matchingGeoJsonFeature.geometry;
        const {
          alarmValue,
          warningValue,
          riverCourseKm,
          catchmentArea,
          ...geoJsonProperties
        } = matchingGeoJsonFeature.properties;

        return {
          ...station,
          ...geoJsonProperties,
          lat: coordinates[1],
          lon: coordinates[0],
          alarmValue,
          warningValue,
          riverCourseKm,
          catchmentArea,
        };
      }

      return null;
    })
    .filter((station) => station !== null);
};

const HydroStationsData = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHydroData = async () => {
      try {
        const apiDataResponse = await axios.get('https://danepubliczne.imgw.pl/api/data/hydro');
        const apiData = apiDataResponse.data;

        const geoJsonResponse = await axios.get('/localizations/hydro/hydro_xy.geojson');
        const geoJsonData = geoJsonResponse.data;

        const geoJsonMap = mapGeoJsonData(geoJsonData);
        const mergedData = mergeHydroData(apiData, geoJsonMap);

        onDataFetch(mergedData);
        setDataFetched(true);
      } catch (err) {
        console.error('Error fetching hydro data:', err);
        setError('Failed to load hydro station data. Please try again.');
      }
    };

    if (!dataFetched) {
      fetchHydroData();
    }
  }, [dataFetched, onDataFetch]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return null;
};

HydroStationsData.propTypes = {
  onDataFetch: PropTypes.func.isRequired,
};

export default HydroStationsData;
