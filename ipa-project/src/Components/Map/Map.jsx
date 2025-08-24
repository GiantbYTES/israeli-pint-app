import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

export default function Map({ businesses, beers }) {
  return (
    <MapContainer
      center={[32.0853, 34.7818]}
      zoom={13}
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {businesses
        .filter(
          (busi) =>
            typeof busi.latitude === "number" &&
            typeof busi.longitude === "number" &&
            !isNaN(busi.latitude) &&
            !isNaN(busi.longitude)
        )
        .map((busi) => {
          // Find beers available at this business
          const availableBeers = beers.filter(
            (beer) => beer.business_id === busi.id
          );
          return (
            <Marker key={busi.id} position={[busi.latitude, busi.longitude]}>
              <Popup maxWidth={300} minWidth={200}>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    marginBottom: 8,
                  }}
                >
                  {busi.store_name}
                </div>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ color: "#888" }}>Owner: </span>
                  {busi.username}
                </div>
                <div>
                  <span style={{ color: "#888" }}>Available Beers:</span>
                  <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                    {availableBeers.length > 0 ? (
                      availableBeers.map((beer) => (
                        <li key={beer.id}>
                          <strong>{beer.name}</strong>{" "}
                          <span style={{ color: "#666" }}>({beer.type})</span>
                        </li>
                      ))
                    ) : (
                      <li style={{ color: "#aaa" }}>No beers listed</li>
                    )}
                  </ul>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
