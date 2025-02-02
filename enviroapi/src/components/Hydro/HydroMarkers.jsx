import React from 'react';
import PopupTable from '../Popups/UniversalPopup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getWaterLevelColorAndTooltip } from './WaterLevelUtils';

const HydroMarkers = ({ hydroStations, highlightedStation }) => {
  return hydroStations.map((station) => {
    const lat = parseFloat(station.lat);
    const lon = parseFloat(station.lon);

    if (!isNaN(lat) && !isNaN(lon)) {
      const stanWody = parseFloat(station.stan_wody);
      const warningValue = parseFloat(station.warningValue);
      const alarmValue = parseFloat(station.alarmValue);
      const isHighlighted = highlightedStation?.id_stacji === station.id_stacji;

      const { color: stanWodyColor, tooltip: tooltipMessage } = getWaterLevelColorAndTooltip(
        stanWody,
        warningValue,
        alarmValue
      );

      const tableData = [
        { label: 'Rzeka:', value: station.rzeka || 'Ładowanie...' },
        { label: 'Województwo:', value: station.województwo || 'Ładowanie...' },
        {
          label: 'Stan wody:',
          value: (
            <span style={{ color: stanWodyColor }}>
              {station.stan_wody ? `${station.stan_wody} cm` : 'Ładowanie...'}
              <i
                className="fa-regular fa-circle-question"
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                title={tooltipMessage}
                aria-label={tooltipMessage}
              ></i>
            </span>
          ),
        },
        { label: 'Temperatura wody:', value: station.temperatura_wody ? `${station.temperatura_wody} °C` : 'Brak danych' },
        { label: 'Zjawisko lodowe:', value: station.zjawisko_lodowe === '0' ? 'Brak' : 'Obecne' },
        { label: 'Zjawisko zarastania:', value: station.zjawisko_zarastania === '0' ? 'Brak' : 'Obecne' },
        { label: 'Wartość alarmowa:', value: station.alarmValue ? `${station.alarmValue} cm` : 'Brak danych' },
        { label: 'Wartość ostrzegawcza:', value: station.warningValue ? `${station.warningValue} cm` : 'Brak danych' },
        { label: 'Kilometraż rzeki:', value: station.riverCourseKm ? `${station.riverCourseKm} km` : 'Brak danych' },
        { label: 'Powierzchnia zlewni:', value: station.catchmentArea ? `${station.catchmentArea} km²` : 'Brak danych' },
      ];

      const popupContent = (
        <PopupTable
          stationName={station.stacja || 'Ładowanie lokalizacji...'}
          title={`Data pomiaru: ${station.stan_wody_data_pomiaru || 'Ładowanie...'}`}
          data={tableData}
        />
      );

      return {
        id: station.id_stacji,
        position: [lat, lon],
        iconClass: 'fa-solid fa-droplet',
        iconColor: '#0686AD',
        popupContent,
        isHighlighted,
        markerType: 'hydro',
      };
    }

    return null;
  }).filter(Boolean);
};

export default HydroMarkers;
