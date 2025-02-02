import React from 'react';
import PropTypes from 'prop-types';
import WindDirection from './WindDirections';
import PopupTable from '../Popups/UniversalPopup';

const WeatherMarkers = ({ weatherStations, highlightedStation }) => {
  return weatherStations.map((station) => {
    const lat = parseFloat(station.lat);
    const lon = parseFloat(station.lon);

    if (!isNaN(lat) && !isNaN(lon)) {
      const windDirectionDegree = parseFloat(station.kierunek_wiatru);

      const isHighlighted = highlightedStation && highlightedStation.id_stacji === station.id_stacji;

      const tableData = [
        { label: 'Temperatura:', value: station.temperatura ? `${station.temperatura} °C` : 'Brak danych' },
        { label: 'Wilgotność:', value: station.wilgotnosc_wzgledna ? `${station.wilgotnosc_wzgledna} %` : 'Brak danych' },
        { label: 'Ciśnienie:', value: station.cisnienie ? `${station.cisnienie} Pa` : 'Brak danych' },
        { label: 'Prędkość wiatru:', value: station.predkosc_wiatru ? `${station.predkosc_wiatru} km/h` : 'Brak danych' },
        { label: 'Kierunek wiatru:', value: <WindDirection degree={windDirectionDegree} /> },
        { label: 'Suma opadu:', value: station.suma_opadu ? `${station.suma_opadu} mm` : 'Brak danych' },
      ];

      const popupContent = (
        <PopupTable
          stationName={station.stacja || 'Nieznana lokalizacja'}
          title={`Pomiar: ${station.data_pomiaru} ${station.godzina_pomiaru}:00`}
          data={tableData}
        />
      );

      return {
        id: station.id,
        position: [lat, lon],
        iconClass: 'fa-solid fa-cloud',
        iconColor: '#FD287D', // pink
        iconSize: '20px',
        popupContent,
        isHighlighted,
        markerType: 'weather',
      };
    }
    return null;
  }).filter(Boolean);
};

WeatherMarkers.propTypes = {
  weatherStations: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightedStation: PropTypes.object,
};

export default WeatherMarkers;
