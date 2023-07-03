import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import buildingData from "../../assets/dummyData/buildingData";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { icon as leafletIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../../assets/icons/marker.png";
import data from "../../assets/dummyData/data";

const CustomMap = ({ selectedMarker }) => {
  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
  });

  // to get initial user location ---------------->
  // TODO make a new custom sidelist popup component
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setCoordinates({ latitude: 20.5937, longitude: 78.9629 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCoordinates({ latitude: 20.5937, longitude: 78.9629 });
    }
  };

  // sets marker to the initial location -------------->
  useEffect(() => {
    getUserLocation();
  }, []);

  // this to get the coordinates from the select address -----------> (Assumed that data has coordinates with address)

  // use this when we deploy for dynamic coordiante generation-------------->

  // const [coordinates, setCoordinates] = useState([]);

  // useEffect(() => {
  //   const fetchCoordinates = async () => {
  //     try {
  //       const apiKey = "pk.d8dedc86f19bc2a82a11faa671cb3ebc"; // Replace with your LocationIQ API key
  //       const results = [];

  //       for (let i = 0; i < buildingData.length; i++) {
  //         const item = buildingData[i];
  //         const encodedAddress = encodeURIComponent(item.address);
  //         const apiUrl = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodedAddress}&format=json`;

  //         await new Promise((resolve) => setTimeout(resolve, 1000)); // Constant delay of 0.5 seconds

  //         const response = await axios.get(apiUrl);
  //         const { lat, lon } = response.data[0];
  //         results.push({ ...item, lat, lon });
  //       }

  //       setCoordinates(results);
  //       console.log(results); // Print the coordinates array
  //     } catch (error) {
  //       console.error("Error fetching coordinates:", error);
  //     }
  //   };

  //   fetchCoordinates();
  // }, []);
  const getCoordinates = () => {
    const marker = data.find((item) => item.address === selectedMarker);
    if (marker) {
      const { lat, lon } = marker;
      return { latitude: lat, longitude: lon };
    }
    return null;
  };

  // update marker on each change or address
  useEffect(() => {
    const updatedCoordinates = getCoordinates();
    if (updatedCoordinates) {
      setCoordinates(updatedCoordinates);
    } else {
      setCoordinates({ latitude: 20.5937, longitude: 78.9629 });
    }
  }, [selectedMarker]);

  // to flyto a new marker on change of address ------------------------->
  const CustomMarker = ({ item }) => {
    const map = useMap();

    useEffect(() => {
      if (coordinates.latitude && coordinates.longitude) {
        map.flyTo([coordinates.latitude, coordinates.longitude], 14, {
          duration: 2,
        });
      }
    }, [item.lat, item.lon, map]);

    return (
      <Marker
        position={[item.lat, item.lon]}
        icon={leafletIcon({
          iconUrl: MarkerIcon,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -32],
        })}
      >
        <Popup>
          item
          <p>Address: {item.address}</p>
          <p>Latitude: {item.lat}</p>
          <p>Longitude: {item.lon}</p>
        </Popup>
      </Marker>
    );
  };

  // map customization ------------------------------------------->

  const mapOptions = {
    attributionControl: false,
    scrollWheelZoom: false,
  };

  return (
    <MapContainer
      center={[coordinates.latitude, coordinates.longitude]}
      zoom={10}
      style={{ width: "100%", height: "750px" }}
      {...mapOptions}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={false}
      />

      {/* inly for first render  */}
      {coordinates.latitude && coordinates.longitude && (
        <Marker
          position={[coordinates.latitude, coordinates.longitude]}
          icon={leafletIcon({
            iconUrl: MarkerIcon,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -32],
          })}
        >
          <Popup>
            Your Location
            <p>Latitude: {coordinates.latitude}</p>
            <p>Longitude: {coordinates.longitude}</p>
          </Popup>
        </Marker>
      )}

      {/* map the data array with custom marker to flyto eachother */}
      {data.map((item, index) => (
        <CustomMarker key={index} item={item} />
      ))}
    </MapContainer>
  );
};

export default CustomMap;
