import React from 'react';
import PropTypes from 'prop-types';

const LegendItem = ({ iconClass, iconColor, label }) => {
  return (
    <tr className="legend-item">
      <td className="legend-icon" style={{ fontSize: '20px', color: iconColor }}>
        <i className={iconClass}></i>
      </td>
      <td className="legend-label">{label}</td>
    </tr>
  );
};

LegendItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LegendItem;
