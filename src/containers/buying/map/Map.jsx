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

const Map = () => {
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
            />
          </div>
        </div>
        <div className="map-right">
          <div className="map-right-content">
            <div className="map-right-lists">
              {data.map((item, index) => (
                <SideList
                  key={index}
                  img={item.img}
                  price={item.price}
                  address={item.address}
                  bed={item.bed}
                  tub={item.tub}
                  area={item.area}
                  state={item.state}
                  listingStatus={item.listingStatus}
                  listingDate={item.listingDate}
                  propertyType={item.propertyType}
                  onClick={() => handleMarkerClick(item.address, item)}
                  openProperty={() => handleOpen(item)}
                />
              ))}
            </div>
            <Backdrop
              sx={{
                color: "var(--color-dark)",
                zIndex: "90",
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
