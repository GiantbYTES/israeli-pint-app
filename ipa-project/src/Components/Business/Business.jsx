
import React, { useState } from "react";
import BeerForm from "./BeerForm/BeerForm";
import BeerList from "./BeerList/BeerList";
import "./Business.css";

const Business = () => {
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
