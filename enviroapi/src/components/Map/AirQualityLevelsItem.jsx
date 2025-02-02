import React from 'react';
import PropTypes from 'prop-types';

const AirQualityLevels = ({ isExpanded }) => {
  if (!isExpanded) return null;

  const airQualityLevels = [
    { color: '#0D5504', label: 'Bardzo Dobry' },
    { color: '#14A302', label: 'Dobry' },
    { color: '#BAA809', label: 'Umiarkowany' },
    { color: '#DB7909', label: 'Dostateczny' },
    { color: '#D4150B', label: 'Zły' },
    { color: '#900C05', label: 'Bardzo Zły' },
    { color: '#343434', label: 'Nieznany' },
  ];

  return (
    <>
      {airQualityLevels.map((level, index) => (
        <tr className="legend-item indented" key={index}>
          <td className="legend-icon"></td>
          <td className="legend-label">
            <span className="indented-content">
              <i
                className="fa-solid fa-location-dot"
                style={{ fontSize: '16px', color: level.color, paddingRight: '8px' }}
              ></i>
              {level.label}
            </span>
          </td>
        </tr>
      ))}
      <tr className="legend-item indented">
        <td className="legend-icon"></td>
        <td className="legend-label">
          <span className="indented-content">
            <a
              href="https://powietrze.gios.gov.pl/pjp/content/content_image/2831"
              target="_blank"
              rel="noopener noreferrer"
              className="air-quality-link"
            >
              więcej informacji
            </a>
          </span>
        </td>
      </tr>
    </>
  );
};

AirQualityLevels.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};

export default AirQualityLevels;
