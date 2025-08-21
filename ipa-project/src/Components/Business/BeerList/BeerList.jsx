import React from "react";
import BeerItem from "./BeerItem";
import "./BeerList.css";

const BeerList = ({ beers, onDeleteBeer }) => {
  return (
    <ul className="beer-list">
      {beers.map((beer) => (
        <BeerItem 
          key={beer.id}
          beer={beer}
          onDelete={onDeleteBeer}
        />
      ))}
    </ul>
  );
};

export default BeerList;
