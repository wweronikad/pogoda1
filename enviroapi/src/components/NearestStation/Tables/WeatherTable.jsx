import React from 'react';
import PropTypes from 'prop-types';
import UniversalTable from './UniversalTable';
import WindDirections from '../../Weather/WindDirections';

const WeatherTable = ({ station }) => {
  const columns = [
    { key: 'parameter', label: 'Parametr' },
    { key: 'latestMeasurement', label: `Pomiar z ${station.data_pomiaru || 'Ładowanie...'}` },
  ];

  const data = [
    { parameter: 'Temperatura', latestMeasurement: station.temperatura ? `${station.temperatura} °C` : 'Ładowanie...' },
    { parameter: 'Wilgotność względna', latestMeasurement: station.wilgotnosc_wzgledna ? `${station.wilgotnosc_wzgledna} %` : 'Ładowanie...' },
    { parameter: 'Ciśnienie', latestMeasurement: station.cisnienie ? `${station.cisnienie} Pa` : 'Ładowanie...' },
    { parameter: 'Prędkość wiatru', latestMeasurement: station.predkosc_wiatru ? `${station.predkosc_wiatru} km/h` : 'Ładowanie...' },
    { parameter: 'Kierunek wiatru', latestMeasurement: station.kierunek_wiatru ? <WindDirections degree={parseFloat(station.kierunek_wiatru)} /> : 'Ładowanie...' },
    { parameter: 'Suma opadu', latestMeasurement: station.suma_opadu ? `${station.suma_opadu} mm` : 'Ładowanie...' },
  ];

  return <UniversalTable columns={columns} data={data} />;
};

WeatherTable.propTypes = {
  station: PropTypes.object.isRequired,
};

export default WeatherTable;
