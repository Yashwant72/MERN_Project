import React, { useEffect, useRef, useState } from "react";
import "./map.css";
import SideList from "../../../components/Lists/SideList";
// import buildingData from ".././../../assets/dummyData/buildingData";
import data from "../../../assets/dummyData/data";
// import GeocodingExample from "../../../components/GeocodingExample";
import axios from "axios";
import CustomMap from "../../../components/Maps/CustomMap";
import { Backdrop } from "@mui/material";
import PropertyDetail from "../property/PropertyDetail";

const Map = ({ data }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("Enter an address");
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setAddress(marker);
    setSelectedMarker(marker);
    // handleOpen(item);
  };

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/search.php?key=pk.d8dedc86f19bc2a82a11faa671cb3ebc&q=${encodeURIComponent(
            address
          )}&format=json`
        );
        const data = response.data;

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setLatitude(lat);
          setLongitude(lon);
          console.log("Latitude:", lat);
          console.log("Longitude:", lon);
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
      }
    };

    geocodeAddress();
  }, [address]);

  //** Fetch coords for db */
  const [propertyData, setPropertyData] = useState([]);

  console.log("🚀 ~ file: Home.jsx:87 ~ Home ~ propertyData:", propertyData);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const apiKey = "pk.d8dedc86f19bc2a82a11faa671cb3ebc"; // Replace with your LocationIQ API key
        const results = [];

        for (let i = 0; i < data.length; i++) {
          const item = data[i];

          console.log(
            "🚀 ~ file: Home.jsx:99 ~ fetchCoordinates ~ item:",
            item
          );

          const encodedAddress = encodeURIComponent(item.address);
          const apiUrl = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodedAddress}&format=json`;

          await new Promise((resolve) => setTimeout(resolve, 1000)); // Constant delay of 1 second

          const response = await axios.get(apiUrl);
          const { lat, lon } = response.data[0];
          results.push({ ...item, lat, lon });
        }

        setPropertyData(results);
        console.log(results); // Print the updated property data with coordinates
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [data]);

  // const handleAddressChange = (e) => {
  //   setAddress(e.target.value);
  // };
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const backdropRef = useRef(null);
  const handleClose = (event) => {
    if (backdropRef.current && !backdropRef.current.contains(event.target)) {
      setOpenBackdrop(false);
    }
  };
  const handleOpen = (property) => {
    if (property) {
      setSelectedProperty(property);
      setOpenBackdrop(true);
    }
  };

  return (
    <div className="map-container">
      <div className="map">
        <div className="map-left">
          <div className="map-left-content">
            <CustomMap
              selectedMarker={selectedMarker}
              tooltipDirection={"left"}
              data={propertyData}
            />
          </div>
        </div>
        <div className="map-right">
          <div className="map-right-content">
            <div className="map-right-lists">
              {data.map((item, index) => (
                <SideList
                  key={index}
                  img={item.images}
                  price={item.price}
                  address={item.address}
                  bed={item.bedrooms}
                  tub={item.bathrooms}
                  area={item.area}
                  state={item.state}
                  // listingStatus={item.listingStatus}
                  listingDate={item.updatedAt}
                  propertyType={item.type}
                  onClick={() => handleMarkerClick(item.address, item)}
                  openProperty={() => handleOpen(item)}
                />
              ))}
            </div>
            <Backdrop
              sx={{
                color: "var(--color-dark)",
                zIndex: "10000 !important",
              }}
              open={openBackdrop}
              onClick={handleClose}
            >
              <div className="buy-backdrop" ref={backdropRef}>
                {selectedProperty && (
                  <PropertyDetail building={selectedProperty} />
                )}
              </div>
            </Backdrop>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
