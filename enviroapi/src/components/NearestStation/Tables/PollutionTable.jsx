import React from 'react';
import PropTypes from 'prop-types';
import UniversalTable from './UniversalTable';
import { getPollutionColor } from '../AirQualityColors';
import TrendIcon from '../../Pollution/TrendIcon';

const parameterFormulas = {
  'dwutlenek azotu': 'NO2',
  'ozon': 'O3',
  'dwutlenek siarki': 'SO2',
  'benzen': 'C6H6',
  'tlenek węgla': 'CO',
};

const getOldestMeasurementDate = (sensors) => {
  if (!sensors || sensors.length === 0) {
    return 'Brak danych';
  }

  const dates = sensors
    .map(sensor => sensor.latestMeasurement ? new Date(sensor.latestMeasurement.date) : null)
    .filter(date => date !== null);

  if (dates.length === 0) {
    return 'Brak danych';
  }

  const oldestDate = new Date(Math.min(...dates));
  return oldestDate.toISOString().replace('T', ' ').split('.')[0];
};

const getParameterWithFormula = (paramName) => {
  const formula = parameterFormulas[paramName.toLowerCase()];
  return formula ? `${paramName} (${formula})` : paramName;
};

const sortParameters = (a, b) => {
  const parametersAtEnd = ['benzen', 'tlenek węgla'];
  const aIsAtEnd = parametersAtEnd.includes(a.paramName);
  const bIsAtEnd = parametersAtEnd.includes(b.paramName);

  if (aIsAtEnd && !bIsAtEnd) return 1;
  if (!aIsAtEnd && bIsAtEnd) return -1;
  return 0;
};

const PollutionTable = ({ station }) => {
  const columns = [
    { key: 'parameter', label: 'Parametr' },
    { key: 'latestMeasurement', label: `Pomiar z ${getOldestMeasurementDate(station.sensors)}` },
    { key: 'trend', label: 'Trend' },
  ];

  const data = station.sensors
    ? station.sensors.map(sensor => ({
        paramName: sensor.param.paramName.toLowerCase(),
        parameter: getParameterWithFormula(sensor.param.paramName),
        latestMeasurement: sensor.latestMeasurement ? (
          <span style={{ color: getPollutionColor(sensor.param.paramName, sensor.latestMeasurement.value), fontWeight: 'bold' }}>
            {sensor.latestMeasurement.value} μg/m³
          </span>
        ) : 'Ładowanie...',
        trend: sensor.trend !== null ? (
          <div style={{ textAlign: 'center' }}>
            <TrendIcon trend={sensor.trend} />
          </div>
        ) : 'Ładowanie...',
      })).sort(sortParameters)
    : [];

  return <UniversalTable columns={columns} data={data} />;
};

PollutionTable.propTypes = {
  station: PropTypes.object.isRequired,
};

export default PollutionTable;
