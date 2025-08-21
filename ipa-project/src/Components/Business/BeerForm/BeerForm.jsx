import React, { useState } from "react";
import BeerDropdown from "./BeerDropdown";
import "./BeerForm.css";

const BeerForm = ({ onAddBeer }) => {
  const [form, setForm] = useState({ name: "", type: "" });

  const handleNameChange = (name) => {
    setForm({ name, type: "" });
  };

  const handleSelectBeer = (beer) => {
    setForm({ name: beer.name, type: beer.type });
  };

  const handleSubmit = () => {
    if (!form.name || !form.type) return;
    
    const newBeer = {
      id: Date.now(),
      name: form.name,
      type: form.type
    };
    
    onAddBeer(newBeer);
    setForm({ name: "", type: "" });
  };

  return (
    <div className="beer-form">
      <BeerDropdown 
        value={form.name}
        onChange={handleNameChange}
        onSelect={handleSelectBeer}
      />

      <input
        type="text"
        placeholder="Type"
        value={form.type}
        disabled
        className="type-input"
      />

      <button 
        onClick={handleSubmit}
        disabled={!form.name || !form.type}
        className="add-button"
      >
        Add Beer
      </button>
    </div>
  );
};

export default BeerForm;
