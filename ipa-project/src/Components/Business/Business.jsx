
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeerForm from "./BeerForm/BeerForm";
import BeerList from "./BeerList/BeerList";
import { supabase } from "../../data/supabase";
import { useAuth } from "../../auth/AuthProvider";
import "./Business.css";

const Business = () => {
  const { activeUser, onLogout } = useAuth();
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [businessId, setBusinessId] = useState(null);
  const [beers, setBeers] = useState([]);


  useEffect(() => {
    if (activeUser) {
      fetchBusinessData();
    }
  }, [activeUser]);


  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Businesses')
        .select('id, store_name, location')
        .eq('user_id', activeUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching business data:', error);
        return;
      }

      if (data) {
        setStoreName(data.store_name || "");
        setAddress(data.location || "");
        setBusinessId(data.id);
        
        // Fetch beers after getting business data
        await fetchBeers(data.id);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  // Fetch beers from Supabase based on business_id
  const fetchBeers = async (businessIdToUse = businessId) => {
    if (!businessIdToUse) {
      console.log('No business ID available to fetch beers');
      return;
    }

    try {
      console.log('Fetching beers for business ID:', businessIdToUse);
      const { data, error } = await supabase
        .from('Beers')
        .select('id, name, type')
        .eq('business_id', businessIdToUse)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching beers:', error);
        return;
      }

      console.log('Fetched beers:', data);
      setBeers(data || []);
    } catch (error) {
      console.error('Error fetching beers:', error);
    }
  };


  // Get coordinates from address using OpenStreetMap
  const getCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    } else {
      throw new Error("Address not found");
    }
  };


  const handleBusinessName = async () => {
    if (!activeUser) {
      console.error('No active user');
      alert('Please log in to save business information');
      return;
    }

    if (!storeName.trim()) {
      alert('Please enter a store name');
      return;
    }

    if (!address.trim()) {
      alert('Please enter an address');
      return;
    }

    try {
      setLoading(true);
      console.log('Saving business info for user:', activeUser.id);
      console.log('Store name:', storeName);
      console.log('Location:', address);
      
      let latitude = null;
      let longitude = null;
      
      try {
        console.log('Getting coordinates for address:', address);
        const coords = await getCoordinates(address);
        latitude = coords.lat;
        longitude = coords.lng;
        console.log('Coordinates found:', { latitude, longitude });
      } catch (coordError) {
        console.warn('Could not get coordinates for address:', coordError.message);
      }
      

      // Check if business record exists
      const { data: existingBusiness, error: checkError } = await supabase
        .from('Businesses')
        .select('id')
        .eq('user_id', activeUser.id)
        .maybeSingle(); // Use maybeSingle instead of single to avoid error when no record exists

      if (checkError) {
        console.error('Error checking existing business:', checkError);
        alert('Error checking existing business record');
        return;
      }

      let result;
      
      const businessData = {
        store_name: storeName,
        location: address,
        latitude: latitude,
        longitude: longitude
      };
      
      if (existingBusiness) {
        console.log('Updating existing business record');
        // Update existing record
        result = await supabase
          .from('Businesses')
          .update(businessData)
          .eq('user_id', activeUser.id)
          .select();

      } else {
        console.log('Creating new business record');
        result = await supabase
          .from('Businesses')
          .insert({ 
            user_id: activeUser.id,
            ...businessData
          })
          .select();
      }

      if (result.error) {
        console.error('Error saving business:', result.error);
        alert(`Error saving business: ${result.error.message}`);
        return;
      }

      console.log('Business information saved successfully:', result.data);
      
      // Set business ID if we just created a new business
      if (!existingBusiness && result.data && result.data[0]) {
        setBusinessId(result.data[0].id);
      }
      
      if (latitude && longitude) {
        alert('Business information and coordinates saved successfully!');
      } else {
        alert('Business information saved successfully! (Coordinates could not be determined)');
      }
      
    } catch (error) {
      console.error('Unexpected error:', error);
      alert(`Unexpected error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBeer = async (newBeer) => {
    if (!businessId) {
      alert('Please save your business information first');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Beers')
        .insert({
          name: newBeer.name,
          type: newBeer.type,
          user_id: activeUser.id,
          business_id: businessId
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding beer:', error);
        alert('Error adding beer');
        return;
      }

      // Add the new beer to the local state
      setBeers([...beers, data]);
      console.log('Beer added successfully:', data);
    } catch (error) {
      console.error('Error adding beer:', error);
      alert('Error adding beer');
    }
  };

  const handleDeleteBeer = async (id) => {
    try {
      const { error } = await supabase
        .from('Beers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting beer:', error);
        alert('Error deleting beer');
        return;
      }

      // Remove the beer from local state
      setBeers(beers.filter((beer) => beer.id !== id));
      console.log('Beer deleted successfully');
    } catch (error) {
      console.error('Error deleting beer:', error);
      alert('Error deleting beer');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out');
    }
  };

  return (
    <>
      <div className="nav-buttons">
        <button 
          onClick={handleGoHome}
          className="nav-btn"
        >
          Home
        </button>
        <button 
          onClick={handleLogout}
          className="nav-btn"
        >
          Logout
        </button>
      </div>

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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        
        <button 
          onClick={handleBusinessName}
          disabled={loading}
          className="save-btn"
        >
          {loading ? 'Saving...' : 'Save Business Info'}
        </button>
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
    </>
  );
};

export default Business;
