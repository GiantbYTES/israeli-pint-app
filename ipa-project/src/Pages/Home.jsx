import Map from "../Components/Map/Map";
import "./Home.css";
import Btn from "../Components/Btn.jsx";
import LoadingBtn from "../Components/LoadingBtn.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../data/supabase";
import BeerTypeFilter from "../Components/BeerTypeFilter.jsx";
import BeerNameFilter from "../Components/BeerNameFilter.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Home() {
  const [dummyBusi, setDummyBusi] = useState([]);
  const [dummyBeers, setDummyBeers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch businesses
      const { data: businesses, error: busiError } = await supabase
        .from("Businesses")
        .select("*");
      if (!busiError && businesses) setDummyBusi(businesses);

      // Fetch beers
      const { data: beers, error: beerError } = await supabase
        .from("Beers")
        .select("*");
      if (!beerError && beers) setDummyBeers(beers);
    }
    fetchData();
  }, []);

  const [selectedBeers, setSelectedBeers] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out");
    }
  };

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
  const { activeUser, onLogout } = useAuth();

  return (
    <div className="home-root">
      {
        <>
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
          </div>
          <div
            className="login-btn-absolute"
            key={activeUser ? activeUser.id || "user" : "guest"}
          >
            {activeUser ? (
              <div className="manage-logout-flex">
                <Btn
                  name="manage"
                  onClick={() => navigate("/business-dashboard")}
                />
                <Btn name="logout" onClick={handleLogout} />
              </div>
            ) : (
              <Btn name="login" onClick={() => navigate("/login")} />
            )}
          </div>
        </>
      }
      <Map businesses={filteredBusinesses} beers={dummyBeers} />
    </div>
  );
}
