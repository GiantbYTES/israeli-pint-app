
import React, { useState, useRef, useEffect } from "react";
import "./Business.css";

// 50 popular beers with name and type
const BEER_LIST = [
    { name: "Anchor Steam", type: "California Common" },
    { name: "Asahi Super Dry", type: "Lager" },
    { name: "Bass Pale Ale", type: "Pale Ale" },
    { name: "Birra Moretti", type: "Lager" },
    { name: "Blue Moon Belgian White", type: "Wheat Beer" },
    { name: "Brooklyn Lager", type: "Lager" },
    { name: "Bud Light", type: "Lager" },
    { name: "Budweiser", type: "Lager" },
    { name: "Carlsberg", type: "Pilsner" },
    { name: "Chang", type: "Lager" },
    { name: "Chimay Blue", type: "Trappist Ale" },
    { name: "Chimay Red", type: "Trappist Ale" },
    { name: "Chimay White", type: "Trappist Ale" },
    { name: "Coors Light", type: "Lager" },
    { name: "Corona Extra", type: "Lager" },
    { name: "Dos Equis Lager", type: "Lager" },
    { name: "Duvel", type: "Belgian Strong Ale" },
    { name: "Erdinger Weissbier", type: "Wheat Beer" },
    { name: "Fuller's ESB", type: "Bitter" },
    { name: "Fuller's London Pride", type: "Bitter" },
    { name: "Goldstar", type: "Lager" },
    { name: "Goldstar Slow Brew", type: "Lager" },
    { name: "Goldstar Unfiltered", type: "Lager" },
    { name: "Goose Island IPA", type: "IPA" },
    { name: "Guinness Draught", type: "Stout" },
    { name: "Guinness Extra Stout", type: "Stout" },
    { name: "Heineken", type: "Lager" },
    { name: "Hoegaarden", type: "Wheat Beer" },
    { name: "Kilkenny", type: "Irish Cream Ale" },
    { name: "Kirin Ichiban", type: "Lager" },
    { name: "Lagunitas IPA", type: "IPA" },
    { name: "Leffe Blonde", type: "Blonde Ale" },
    { name: "Leffe Brune", type: "Brown Ale" },
    { name: "Maccabee", type: "Lager" },
    { name: "Modelo Especial", type: "Lager" },
    { name: "Murphy's Irish Stout", type: "Stout" },
    { name: "Newcastle Brown Ale", type: "Brown Ale" },
    { name: "Pabst Blue Ribbon", type: "Lager" },
    { name: "Paulaner Hefe-Weißbier", type: "Wheat Beer" },
    { name: "Peroni Nastro Azzurro", type: "Lager" },
    { name: "Samuel Adams Boston Lager", type: "Lager" },
    { name: "Sapporo Premium", type: "Lager" },
    { name: "Shock Top", type: "Wheat Beer" },
    { name: "Sierra Nevada Pale Ale", type: "Pale Ale" },
    { name: "Singha", type: "Lager" },
    { name: "Stella Artois", type: "Pilsner" },
    { name: "Tsingtao", type: "Lager" },
    { name: "Tuborg", type: "Pilsner" },
    { name: "Weihenstephaner Hefeweissbier", type: "Wheat Beer" },
    { name: "Weihenstephaner Vitus", type: "Weizenbock" },
];

const Business = () => {
  const [beers, setBeers] = useState([
    { id: 1, name: "IPA Classic", type: "IPA" },
    { name: 2, name: "Golden Lager", type: "Lager" }
  ]);

  const [form, setForm] = useState({ name: "", type: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredBeers, setFilteredBeers] = useState(BEER_LIST);
  const dropdownRef = useRef(null);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setForm({ name: value, type: "" });
    
    if (value) {
      const filtered = BEER_LIST.filter(beer => 
        beer.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredBeers(filtered);
    } else {
      setFilteredBeers(BEER_LIST);
    }
    
    setDropdownOpen(true);
  };

  const handleSelectBeer = (beer) => {
    setForm({ name: beer.name, type: beer.type });
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

  const handleAdd = () => {
    if (!form.name || !form.type) return;
    const newBeer = { id: Date.now(), name: form.name, type: form.type };
    setBeers([...beers, newBeer]);
    setForm({ name: "", type: "" });
    setFilteredBeers(BEER_LIST);
  };

  const handleDelete = (id) => {
    setBeers(beers.filter((beer) => beer.id !== id));
  };

  return (
    <div className="business">
      <h2>Business Dashboard</h2>

      <div className="beer-form">
        <div className="custom-dropdown" ref={dropdownRef}>
          <div className="dropdown-input-container">
            <input
              type="text"
              placeholder="Beer Name"
              value={form.name}
              onChange={handleNameChange}
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

        <input
          type="text"
          placeholder="Type"
          value={form.type}
          disabled
          className="type-input"
        />

        <button 
          onClick={handleAdd}
          disabled={!form.name || !form.type}
          className="add-button"
        >
          Add Beer
        </button>
      </div>

      <ul className="beer-list">
        {beers.map((beer) => (
          <li className="beer-item" key={beer.id}>
            <button
              className="delete-beer-x"
              title="Delete beer"
              onClick={() => handleDelete(beer.id)}
            >
              &#10006;
            </button>
            <span>{beer.name} ({beer.type})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Business;
