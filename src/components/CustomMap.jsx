import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon as leafletIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../assets/icons/arrowDown.png";

const CustomMap = () => {
  const mapOptions = {
    attributionControl: false, // Disable attribution control
    scrollWheelZoom: false, // Disable zooming on scroll
  };

  const position = [12.96857, 79.14032]; // Coordinates for the marker position
  const customMarkerIcon = leafletIcon({
    iconUrl: MarkerIcon,
    iconSize: [20, 30], // Adjust the size of the icon
    iconAnchor: [10, 30], // Adjust the position of the icon anchor
    popupAnchor: [0, -32], // Adjust the position of the popup anchor
  });
  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ width: "100%", height: "750px" }}
      {...mapOptions}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={false}
      />
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CustomMap;


