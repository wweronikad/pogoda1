import React, { useState, useEffect, useCallback } from 'react';
import SearchInput from './SearchInput';
import LocationButton from './LocationButton';
import LocationDisplay from './LocationDisplay';
import './LocationSearch.css';

const LocationSearch = ({ onLocationSelect }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locationName, setLocationName] = useState('Warszawa');
  const [position, setPosition] = useState([52.2297, 21.0122]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const fetchSuggestions = useCallback(async () => {
    if (search) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=pl&q=${encodeURIComponent(search)}`,
          {
            headers: {
              'User-Agent': 'EnviroAPI/1.0',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Błąd: ${response.status}`);
        }

        const data = await response.json();
        setSuggestions(data.slice(0, 5)); // Limit 5 podpowiedzi
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
        setSuggestions([]);
        setIsDropdownVisible(false);
      }
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [fetchSuggestions]);

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
              {
                headers: {
                  'User-Agent': 'EnviroAPI/1.0',
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Błąd: ${response.status}`);
            }

            const data = await response.json();
            setLocationName(data.display_name || 'Nieznane');
            setPosition([lat, lon]);
            onLocationSelect([lat, lon]);
          } catch (error) {
            console.error('Wystąpił błąd podczas pobierania lokalizacji:', error);
            setLocationName('Błąd pobierania lokalizacji');
          }
        },
        (error) => {
          console.error('Błąd geolokalizacji:', error);
          setLocationName('Nie można uzyskać lokalizacji');
        }
      );
    } else {
      console.error('Geolokalizacja nie jest obsługiwana przez tę przeglądarkę');
      setLocationName('Geolokalizacja niedostępna');
    }
  };

  const handleSearch = (location) => {
    setSearch(location.display_name);
    setLocationName(location.display_name);
    setPosition([Number(location.lat), Number(location.lon)]);
    setSuggestions([]);
    setIsDropdownVisible(false);
    onLocationSelect([Number(location.lat), Number(location.lon)]);
  };

  return (
    <div className="location-search-container">
      <div className="row first-row">
        <div className="column">
          <LocationDisplay locationName={locationName} position={position} />
        </div>
      </div>

      <div className="row second-row">
        <div className="column half-column">
          <SearchInput
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            handleSearch={handleSearch}
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </div>
        <div className="column half-column">
          <LocationButton onClick={handleUseLocation} />
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
