
import React, { useState } from "react";
import BeerForm from "./BeerForm/BeerForm";
import BeerList from "./BeerList/BeerList";
import "./Business.css";

const Business = () => {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [beers, setBeers] = useState([
    { id: 1, name: "IPA Classic", type: "IPA" },
    { id: 2, name: "Golden Lager", type: "Lager" }
  ]);

  const handleAddBeer = (newBeer) => {
    setBeers([...beers, newBeer]);
  };

  const handleDeleteBeer = (id) => {
    setBeers(beers.filter((beer) => beer.id !== id));
  };

  return (
    <div className="business">
      <h2>Business Dashboard</h2>
      
      <div className="store-info">
        <div className="input-group">
          <label htmlFor="storeName">Store Name:</label>
          <input
            type="text"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter store name"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter store address"
          />
        </div>
      </div>
      
      <BeerForm 
        onAddBeer={handleAddBeer} 
        existingBeers={beers}
      />
      
      <BeerList 
        beers={beers}
        onDeleteBeer={handleDeleteBeer}
      />
    </div>
  );
};

export default Business;
