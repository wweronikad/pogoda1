import React, { useEffect, useState, useRef } from 'react';
import * as turf from '@turf/turf';
import StationDataTable from './Tables/StationDataTables';
import MoreInfo from './MoreInfo/MoreInfo';
import './NearestStation.css';

import { GIOS_API, IMGW_API, HEALTH_INFORMATION, AIR_QUALITY_INDICES_INFO } from '../../sources/sourcesLinks';

const NearestStation = ({ userLocation, Stations, nearestStationText, type, onHighlightStation }) => {
  const [nearestStation, setNearestStation] = useState(null);
  const [distanceToNearestStation, setDistanceToNearestStation] = useState(null);

  const previousNearestStation = useRef(null);

  useEffect(() => {
    const findNearestStation = () => {
      if (userLocation && Stations.length > 0) {
        const userPoint = turf.point(userLocation);
        let nearestDist = Infinity;
        let nearestStation = null;

        Stations.forEach((station) => {
          let lat, lon;
          if (station) {
            if (station.lat && station.lon) {
              lat = parseFloat(station.lat);
              lon = parseFloat(station.lon);
            } else if (station.gegrLat && station.gegrLon) {
              lat = parseFloat(station.gegrLat);
              lon = parseFloat(station.gegrLon);
            } else if (station.y && station.x) {
              lat = parseFloat(station.y);
              lon = parseFloat(station.x);
            }

            if (!isNaN(lat) && !isNaN(lon)) {
              const stationPoint = turf.point([lat, lon]);
              const distance = turf.distance(userPoint, stationPoint);

              if (distance < nearestDist) {
                nearestDist = distance;
                nearestStation = station;
              }
            }
          }
        });

        if (nearestStation !== previousNearestStation.current) {
          setNearestStation(nearestStation);
          setDistanceToNearestStation(nearestDist.toFixed(2));
        
          if (onHighlightStation) {
            onHighlightStation(nearestStation, type);
          }
        
          previousNearestStation.current = nearestStation;
        }
      }
    };

    findNearestStation();
  }, [userLocation, Stations, onHighlightStation, type]);

  const getStationName = (station) => {
    if (type === 'pollution') {
      return station.stationName || 'Brak nazwy';
    } else if (type === 'weather') {
      return station.stacja || 'Brak nazwy';
    } else if (type === 'hydro') {
      return station.stacja || 'Brak nazwy';
    }
    return 'Brak nazwy';
  };

  const pollutionSources = [
    { text: 'Interfejs programistyczny API GIOŚ', url: GIOS_API },
    { text: 'Informacje zdrowotne', url: HEALTH_INFORMATION },
    { text: 'Informacje o zakresach kolorów indeksów jakości powietrza', url: AIR_QUALITY_INDICES_INFO },
  ];

  const weatherSources = [
    { text: 'Interfejs API dane publiczne IMGW', url: IMGW_API },
  ];

  const hydroSources = [
    { text: 'Interfejs API dane publiczne IMGW', url: IMGW_API },
  ];

  const getSourcesForType = (type) => {
    switch (type) {
      case 'pollution':
        return pollutionSources;
      case 'weather':
        return weatherSources;
      case 'hydro':
        return hydroSources;
      default:
        return [];
    }
  };

  const sources = getSourcesForType(type); // Pobranie odpowiednich źródeł w zależności od typu

  return (
    <div className="nearest-station">
      {nearestStation ? (
        <>
          <div className="station-heading-container">
            <h3>{nearestStationText}</h3>
            <h4>{getStationName(nearestStation)}</h4>
          </div>

          <div className="station-data-container">
            <StationDataTable station={nearestStation} type={type} />
          </div>

          <div className="distance-container">
            Odległość Twojej lokalizacji od najbliższej stacji: {distanceToNearestStation} km
          </div>

          <MoreInfo sources={sources} type={type} />
        </>
      ) : (
        <div>
          <strong>Ładowanie lokalizacji...</strong>
          <br />
          <div className="distance-container">
            Odległość Twojej lokalizacji od najbliższej stacji: Ładowanie...
          </div>
        </div>
      )}
    </div>
  );
};

export default NearestStation;
