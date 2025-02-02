import React from 'react';
import PropTypes from 'prop-types';

const TrendIcon = ({ trend }) => {
  const icons = ['/icons/malejacy.png', '/icons/boczny.png', '/icons/rosnacy.png'];
  if (trend === null) {
    return <span>Brak trendu</span>;
  }
  return (
    <img 
      src={icons[trend] || icons[1]}
      alt="Trend ikona" 
      width="12" 
      height="12" 
      style={{ verticalAlign: 'middle' }}
    />
  );
};

TrendIcon.propTypes = {
  trend: PropTypes.number.isRequired,
};

export default TrendIcon;
