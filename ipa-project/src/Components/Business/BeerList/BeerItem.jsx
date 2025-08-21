import React from "react";
import "./BeerItem.css";

const BeerItem = ({ beer, onDelete }) => {
  return (
    <li className="beer-item">
      <button
        className="delete-beer-x"
        title="Delete beer"
        onClick={() => onDelete(beer.id)}
      >
        &#10006;
      </button>
      <span>{beer.name} ({beer.type})</span>
    </li>
  );
};

export default BeerItem;
