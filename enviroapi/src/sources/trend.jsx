import React from 'react';

const TrendText = () => (
  <div>
    <p>Trend został obliczony na podstawie trzech ostatnich niepustych pomiarów.</p>
    <p>Obliczane są różnice między kolejnymi parami wartości.</p>
    <p>Kolejno od najstarszego A do najnowszego C:</p>
    <p>A - B<br/>B - C</p>
    <p>Suma tych różnic daje całkowitą zmianę.</p>
    <p>Określenie trendu:</p>
    <ul>
      <li>
        Rosnący, jeśli suma zmian jest większa niż 0.1. 
        <img src="/icons/rosnacy.png" alt="Rosnący" className="trend-icon" />
      </li>
      <li>
        Malejący, jeśli suma zmian jest mniejsza niż -0.1. 
        <img src="/icons/malejacy.png" alt="Malejący" className="trend-icon" />
      </li>
      <li>
        Boczny, jeśli suma zmian mieści się między -0.1 a 0.1. 
        <img src="/icons/boczny.png" alt="Boczny" className="trend-icon" />
      </li>
    </ul>
  </div>
);

export default TrendText;
