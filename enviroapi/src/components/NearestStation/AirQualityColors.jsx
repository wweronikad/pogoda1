import PropTypes from 'prop-types';
import { pollutionColors } from './../Pollution/AirColorUtils';

const parameterMap = {
  'pył zawieszony PM10': 'PM10',
  'pył zawieszony PM2.5': 'PM2.5',
  'dwutlenek azotu': 'NO2',
  'ozon': 'O3',
  'dwutlenek siarki': 'SO2',
  'benzen': 'C6H6',
  'tlenek węgla': 'CO',
};

const thresholds = {
  PM10: [20, 50, 80, 110, 150],
  'PM2.5': [13, 35, 55, 75, 110],
  O3: [70, 120, 150, 180, 240],
  NO2: [40, 100, 150, 200, 230],
  SO2: [50, 100, 200, 350, 500],
  C6H6: [5, 30],
  CO: [10000, 30000],
};

export const getPollutionColor = (param, value) => {
  const mappedParam = parameterMap[param] || param;
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return pollutionColors.unknown;
  }

  const getParameterThresholds = thresholds[mappedParam];
  if (!getParameterThresholds) return pollutionColors.unknown;

  const colors = [
    pollutionColors.veryGood,
    pollutionColors.good,
    pollutionColors.moderate,
    pollutionColors.sufficient,
    pollutionColors.bad,
    pollutionColors.veryBad,
  ];

  for (let i = 0; i < getParameterThresholds.length; i++) {
    if (numericValue <= getParameterThresholds[i]) {
      return colors[i];
    }
  }
  return colors[colors.length - 1];
};

getPollutionColor.propTypes = {
  param: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
