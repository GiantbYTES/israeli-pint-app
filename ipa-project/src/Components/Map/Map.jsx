import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
export default function Map() {
  return (
    <div id="map">
      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[32.0853, 34.7818]}>
          <Popup>Sample Store</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
