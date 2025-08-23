import Map from "../Components/Map/Map";
import "./Home.css";
import Btn from "../Components/Btn.jsx";
import LoadingBtn from "../Components/LoadingBtn.jsx";
import { useState } from "react";
import BeerTypeFilter from "../Components/BeerTypeFilter.jsx";
import BeerNameFilter from "../Components/BeerNameFilter.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [dummyBusi, setDummyBusi] = useState([
    {
      id: 1,
      username: "user1",
      store_name: "Café Carmel",
      location: { lat: 32.0853, lng: 34.7818 },
      created_at: "2025-08-20T09:00:00Z",
    },
    {
      id: 2,
      username: "user2",
      store_name: "Shuk Hacarmel Market",
      location: { lat: 32.0687, lng: 34.77 },
      created_at: "2025-08-19T14:30:00Z",
    },
    {
      id: 3,
      username: "user3",
      store_name: "Tel Aviv Bookstore",
      location: { lat: 32.0723, lng: 34.7791 },
      created_at: "2025-08-18T12:00:00Z",
    },
    {
      id: 4,
      username: "user4",
      store_name: "Rothschild Bakery",
      location: { lat: 32.0642, lng: 34.7771 },
      created_at: "2025-08-17T08:15:00Z",
    },
    {
      id: 5,
      username: "user5",
      store_name: "Dizengoff Fashion",
      location: { lat: 32.0792, lng: 34.7748 },
      created_at: "2025-08-10T08:15:00Z",
    },
  ]);

  const [dummyBeers, setDummyBeers] = useState([
    { id: 1, name: "GoldStar Classic", type: "Lager", business_id: 1 },
    { id: 2, name: "Maccabee Light", type: "Pale Lager", business_id: 1 },
    { id: 3, name: "Shapiro IPA", type: "IPA", business_id: 2 },
    { id: 4, name: "Jem’s Wheat", type: "Wheat Beer", business_id: 2 },
    { id: 5, name: "Negev Amber Ale", type: "Amber Ale", business_id: 3 },
    { id: 6, name: "Alexander Black", type: "Stout", business_id: 3 },
    { id: 7, name: "Florentin Pils", type: "Pilsner", business_id: 4 },
    { id: 8, name: "Dancing Camel IPA", type: "IPA", business_id: 4 },
    { id: 9, name: "Jaffa Pale Ale", type: "Pale Ale", business_id: 5 },
    {
      id: 10,
      name: "Jaffa Citrus Wheat",
      type: "Fruit Wheat Beer",
      business_id: 5,
    },
  ]);

  const [selectedBeers, setSelectedBeers] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Get unique beer types for the BeerTypeFilter
  const beerTypes = Array.from(new Set(dummyBeers.map((beer) => beer.type)));

  // Filter businesses based on selected beers and types
  const filteredBusinesses = dummyBusi.filter((busi) => {
    // Find all beers for this business
    const beersForBusiness = dummyBeers.filter(
      (beer) => beer.business_id === busi.id
    );
    // If filtering by beer name
    const matchesBeer =
      selectedBeers.length === 0 ||
      beersForBusiness.some((beer) => selectedBeers.includes(beer.name));
    // If filtering by beer type
    const matchesType =
      selectedTypes.length === 0 ||
      beersForBusiness.some((beer) => selectedTypes.includes(beer.type));
    return matchesBeer && matchesType;
  });
  
const navigate = useNavigate();
  
  return (
    <div className="home-root">
      {/*
      <div className="btns-row floating-controls">
        <div className="filter-btn-wrapper">
          <BeerNameFilter
            beers={dummyBeers}
            value={selectedBeers}
            onChange={setSelectedBeers}
          />
        </div>
        <div className="beer-type-filter-wrapper">
          <BeerTypeFilter
            beerTypes={beerTypes}
            value={selectedTypes}
            onChange={setSelectedTypes}
          />
        </div>
        <div className="login-btn-wrapper">
          <Btn name="login" onClick={() => navigate("/login")} />
        </div>
      </div>
      */}
      <Map businesses={filteredBusinesses} beers={dummyBeers} />
    </div>
  );
}
