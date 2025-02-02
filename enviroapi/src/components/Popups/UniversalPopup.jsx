import React from 'react';
import PropTypes from 'prop-types';

const PopupTable = ({ title, stationName, data }) => {
  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
        {stationName}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
        <thead>
          <tr>
            <th
              colSpan="2"
              style={{
                padding: '5px',
                textAlign: 'left',
                backgroundColor: '#f2f2f2',
                borderBottom: '1px solid #ccc',
              }}
            >
              {title}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>{row.label}</td>
              <td style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PopupTable.propTypes = {
  title: PropTypes.string.isRequired,
  stationName: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    })
  ).isRequired,
};

export default PopupTable;
