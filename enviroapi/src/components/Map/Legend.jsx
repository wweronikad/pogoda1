import React, { useState } from 'react';
import './Legend.css';
import LegendItem from './LegendItem';
import AirQualityLevels from './AirQualityLevelsItem';

const Legend = () => {
  const [expandedSections, setExpandedSections] = useState({ airQuality: false });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="map-legend">
      <table className="legend-table">
        <tbody>
          <LegendItem iconClass="fa-solid fa-circle-user" iconColor="black" label="Lokalizacja Użytkownika" />
          <LegendItem iconClass="fa-solid fa-cloud" iconColor="#FD287D" label="Stacja Pogodowa" />
          <LegendItem iconClass="fa-solid fa-droplet" iconColor="#0686AD" label="Stacja Hydrologiczna" />
          <LegendItem iconClass="fa-solid fa-location-dot" iconColor="black" label="Stacja Zanieczyszczeń Powietrza" />

          <tr className="legend-item collapsible-header" onClick={() => toggleSection('airQuality')}>
            <td className="legend-icon"></td>
            <td className="legend-label collapsible-label">
              <i className={`fa-solid ${expandedSections.airQuality ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              <span className="collapsible-title">Ogólne indeksy jakości powietrza</span>
            </td>
          </tr>
          <AirQualityLevels isExpanded={expandedSections.airQuality} />
        </tbody>
      </table>
    </div>
  );
};

export default Legend;
