import React from 'react';
import TrendText from '../../../sources/trend';
import './MoreInfo.css';

const MoreInfo = ({ sources, type }) => {
  return (
    <details>
      <summary>Więcej informacji</summary>
      <ul>
        {sources.map((source, index) => (
          <li key={index}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.text}
            </a>
          </li>
        ))}
      </ul>

      {type === 'pollution' && (
        <details>
          <summary>Jak został obliczony trend?</summary>
          <div className="trend-text">
            <TrendText />
          </div>
        </details>
      )}
    </details>
  );
};

export default MoreInfo;
