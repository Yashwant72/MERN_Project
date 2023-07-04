import React, { useEffect, useState } from "react";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images/landingBgAlt.png";
// import image from "../../assets/images/landingImg.jpg";
import data from "../../assets/dummyData/data";
import CustomMap from "../../components/Maps/CustomMap";
import Gallery from "../buying/gallery/Gallery";
import axios from "axios";

// TODO handle search text

const Home = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("Enter an address");
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setAddress(marker);
    setSelectedMarker(marker);
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

  return (
    <div className="home-container">
      <div className="home">
        <div
          className="home-section1"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="home-search">
            <div className="search-card">
              <div className="card-heading">
                <h1>Easiest Way to find your dream place</h1>
                <h4>
                  Explore a wide range of properties and find your ideal haven
                </h4>
              </div>

              <div className="card-searchBox">
                <input
                  type="search"
                  className="search-box"
                  placeholder="Search Properties"
                />
                {/* search button */}
                <button className="search-button">
                  <span className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  </span>
                </button>
              </div>

              <div className="home-stats">
                <div className="home-stats-info1">
                  <div className="home-stats-info1-content">
                    <h3>200</h3>
                    <p>Awards wining</p>
                  </div>
                </div>
                <div className="home-stats-info2">
                  <div className="home-stats-info2-content">
                    <h3>200</h3>
                    <p>Awards wining</p>
                  </div>
                </div>
                <div className="home-stats-info3">
                  <div className="home-stats-info3-content">
                    <h3>200</h3>
                    <p>Awards wining</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-section2">
          <div className="home-section2-cards">
            <Gallery keyword={""} onClick={handleMarkerClick} data={data} />
          </div>
          <div className="home-section2-map">
            <CustomMap selectedMarker={selectedMarker} popupStyle={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
