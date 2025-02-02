import React from 'react';
import PropTypes from 'prop-types';

const WindDirections = ({ degree }) => {
  const getWindDirection = (degree) => {
    if (degree === null || isNaN(degree)) return 'nieznany';

    if ((degree >= 337.5 && degree <= 360) || (degree >= 0 && degree < 22.5)) return 'północny';
    if (degree >= 22.5 && degree < 67.5) return 'północno-wschodni';
    if (degree >= 67.5 && degree < 112.5) return 'wschodni';
    if (degree >= 112.5 && degree < 157.5) return 'południowo-wschodni';
    if (degree >= 157.5 && degree < 202.5) return 'południowy';
    if (degree >= 202.5 && degree < 247.5) return 'południowo-zachodni';
    if (degree >= 247.5 && degree < 292.5) return 'zachodni';
    if (degree >= 292.5 && degree < 337.5) return 'północno-zachodni';

    return 'nieznany';
  };

  return <span>{getWindDirection(degree)}</span>;
};

WindDirections.propTypes = {
  degree: PropTypes.number,
};

export default WindDirections;
