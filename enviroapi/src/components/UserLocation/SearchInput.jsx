import React, { useState } from 'react';
import SuggestionsList from './SuggestionsList';
import './SearchInput.css';

const SearchInput = ({ search, setSearch, suggestions, handleSearch, isDropdownVisible, setIsDropdownVisible }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setIsDropdownVisible(e.target.value !== '');
  };

  return (
    <div className="input-container">
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder={isFocused ? '' : 'Wpisz miejscowość...'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
      />
      {isDropdownVisible && isFocused && (
        <SuggestionsList
          suggestions={suggestions}
          handleSearch={handleSearch}
          setIsDropdownVisible={setIsDropdownVisible}
          setIsFocused={setIsFocused}
        />
      )}
    </div>
  );
};

export default SearchInput;
