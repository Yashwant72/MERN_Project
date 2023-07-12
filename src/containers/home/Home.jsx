import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images/landingBgAlt.png";
// import image from "../../assets/images/landingImg.jpg";
// import data from "../../assets/dummyData/data";
import data from "../../assets/dummyData/data";
import CustomMap from "../../components/Maps/CustomMap";
import Gallery from "../buying/gallery/Gallery";
import axios from "axios";
import { TokenContext } from "../../context/TokenContext";

// TODO handle search text

const Home = (props) => {
  const { token, setToken } = useContext(TokenContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    props.handleSearch(searchValue);
    // console.log("🚀 ~ file: Landing.js:18 ~ Landing ~ searchValue:", searchValue);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  // ** Fetching data
  const [Data, setData] = useState([]);

  console.log("🚀 ~ file: Home.jsx:23 ~ Home ~ imported data:", data);

  console.log("🚀 ~ file: Buy.jsx:61 ~ Buy ~ buildingData:", Data);

  const fetchData = () => {
    axios
      .get("/api/property/getAll")
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("Enter an address");

  console.log("🚀 ~ file: Home.jsx:44 ~ Home ~ address:", address);

  const [selectedMarker, setSelectedMarker] = useState(
    " Gateway of India, Mumbai, Maharashtra, India"
  );

  console.log(
    "🚀 ~ file: Home.jsx:48 ~ Home ~ selectedMarker:",
    selectedMarker
  );

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

  const [propertyData, setPropertyData] = useState([]);

  // console.log("🚀 ~ file: Home.jsx:87 ~ Home ~ propertyData:", propertyData);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const apiKey = "pk.d8dedc86f19bc2a82a11faa671cb3ebc"; // Replace with your LocationIQ API key
        const results = [];

        for (let i = 0; i < Data.length; i++) {
          const item = Data[i];

          // console.log("🚀 ~ file: Home.jsx:99 ~ fetchCoordinates ~ item:", item);

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
  }, [Data]);

  return (
    <div className="home-container">
      <div className="home">
        <div
          className="home-section1"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="home-search">
            <div className="search-card">
              <div className="home-card-heading">
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
                  value={searchValue}
                  onChange={handleChange}
                />
                {/* search button */}
                <button className="search-button" onClick={handleSearch}>
                  <span className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  </span>
                </button>
              </div>

              <div className="home-stats">
                <div className="home-stats-info1">
                  <div className="home-stats-info1-content">
                    <h3>200+</h3>
                    <p>Awards</p>
                  </div>
                </div>
                <div className="home-stats-info2">
                  <div className="home-stats-info2-content">
                    <h3>300+</h3>
                    <p>Locations</p>
                  </div>
                </div>
                <div className="home-stats-info3">
                  <div className="home-stats-info3-content">
                    <h3>500+</h3>
                    <p>Properties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-section2">
          <div className="home-section2-cards">
            <Gallery
              keyword={""}
              onClick={handleMarkerClick}
              data={Data}
              map={true}
            />
          </div>
          <div className="home-section2-map">
            <CustomMap
              selectedMarker={selectedMarker}
              popupStyle={true}
              tooltipDirection={"top"}
              data={propertyData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
