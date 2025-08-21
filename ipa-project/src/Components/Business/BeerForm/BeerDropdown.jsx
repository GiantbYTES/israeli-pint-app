import React, { useState, useRef, useEffect } from "react";
import { BEER_LIST } from "../data/beerData";
import "./BeerDropdown.css";

const BeerDropdown = ({ value, onChange, onSelect, existingBeers = [] }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredBeers, setFilteredBeers] = useState(BEER_LIST);
  const dropdownRef = useRef(null);

  const getAvailableBeers = () => {
    const existingBeerNames = existingBeers.map(beer => beer.name);
    return BEER_LIST.filter(beer => !existingBeerNames.includes(beer.name));
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    const availableBeers = getAvailableBeers();
    
    if (inputValue) {
      const filtered = availableBeers.filter(beer => 
        beer.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredBeers(filtered);
    } else {
      setFilteredBeers(availableBeers);
    }
    
    setDropdownOpen(true);
  };

  const handleSelectBeer = (beer) => {
    onSelect(beer);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset filtered beers when value is cleared or existingBeers change
  useEffect(() => {
    const availableBeers = getAvailableBeers();
    if (!value) {
      setFilteredBeers(availableBeers);
    }
  }, [value, existingBeers]);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-input-container">
        <input
          type="text"
          placeholder="Beer Name"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)}
          className="dropdown-input"
        />
        <span className="dropdown-arrow">▼</span>
      </div>
      
      {dropdownOpen && filteredBeers.length > 0 && (
        <ul className="dropdown-list">
          {filteredBeers.map((beer) => (
            <li
              key={beer.name}
              className="dropdown-item"
              onClick={() => handleSelectBeer(beer)}
            >
              {beer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BeerDropdown;
