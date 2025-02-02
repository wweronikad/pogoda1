import React, { useEffect, useState } from 'react';
import './Sun.css';

const Sun = ({ position }) => {
  const [sunData, setSunData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSunData = async () => {
      const lat = position[0];
      const lng = position[1];

      try {
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          setSunData(data.results);
        } else {
          console.error('Błąd w pobieraniu danych:', data.status);
        }
      } catch (error) {
        console.error('Błąd w komunikacji z API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSunData();
  }, [position]);

  const convertTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  if (loading) {
    return <div>Ładowanie danych o wschodzie i zachodzie słońca...</div>;
  }

  if (!sunData) {
    return <div>Nie udało się pobrać danych o wschodzie i zachodzie słońca.</div>;
  }

  return (
    <div className="sun-data">
      <div className="sun-item">
        {/* <a href="https://www.flaticon.com/free-icons/sunrise" title="sunrise icons">Sunrise icons created by Mehwish - Flaticon</a> */}
        <img src="/icons/sunrise_2.svg" alt="Wschód słońca" className="sun-icon" />
        <p>{convertTime(sunData.sunrise)}</p>
      </div>
      <div className="sun-item">
        {/* <a href="https://www.flaticon.com/free-icons/sunset" title="sunset icons">Sunset icons created by Mehwish - Flaticon</a> */}
        <img src="/icons/sun_2.svg" alt="Południe słoneczne" className="sun-icon" />
        <p>{convertTime(sunData.solar_noon)}</p>
      </div>
      <div className="sun-item">
        {/* <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Pronicon - Flaticon</a> */}
        <img src="/icons/sunset_2.svg" alt="Zachód słońca" className="sun-icon" />
        <p>{convertTime(sunData.sunset)}</p>
      </div>
    </div>
  );
};

export default Sun;