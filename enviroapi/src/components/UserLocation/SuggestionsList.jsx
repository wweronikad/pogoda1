import React from 'react';

const SuggestionsList = ({ suggestions, handleSearch, setIsDropdownVisible, setIsFocused }) => {
  const handleClick = (location) => {
    handleSearch(location);
    setIsDropdownVisible(false);
    setIsFocused(false);
  };

  return (
    <div style={{
      position: 'absolute',
      zIndex: 1001, // nad wszystkim sie ma pojawiac lista
      background: 'white',
      color: 'black',
      border: '1px solid #ccc',
      width: '100%',
    }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {suggestions.map((location) => (
          <li
            key={location.place_id}
            onClick={() => handleClick(location)}
            style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
          >
            {location.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
