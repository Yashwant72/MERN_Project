import React from "react";
import "./buy.css";
import { useState } from "react";
import { useEffect } from "react";
import List from "./list/List";
import Map from "./map/Map";
import Gallery from "./gallery/Gallery";
// import Gallery from "../../components/Gallery";

import filter from "../../assets/icons/filter.png";
const Buy = () => {
  const [searchText, setSearchText] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showGallery, setShowGallery] = useState(true);

  useEffect(() => {
    let timer;

    if (searchText && !isFormSubmitted) {
      timer = setTimeout(() => {
        handleSubmit();
      }, 2000);
      // Adjust the delay here (in milliseconds)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, isFormSubmitted]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setIsFormSubmitted(false);
  };

  const handleSubmit = () => {
    if (searchText) {
      setIsFormSubmitted(true);
      // Perform your submit logic here
      console.log("Submitted:", searchText);
    }
  };

  const handleButtonClick = (buttonName) => {
    setShowList(buttonName === "list");
    setShowMap(buttonName === "map");
    setShowGallery(buttonName === "gallery");
  };

  return (
    <div className="buy-container">
      <div className="buy">
        <div className="buy-input">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
        </div>
        <div className="buy-options">
          <div className="buy-option-view">
            <button
              className={showList ? "button-active" : ""}
              onClick={() => handleButtonClick("list")}
            >
              List
            </button>
            <button
              className={showMap ? "button-active" : ""}
              onClick={() => handleButtonClick("map")}
            >
              Map
            </button>
            <button
              className={showGallery ? "button-active" : ""}
              onClick={() => handleButtonClick("gallery")}
            >
              Gallery
            </button>
          </div>
          <div className="buy-filters">
            <button>
              <img src={filter} alt="filter" />
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="buy-options-container">
        {showList && <List />}
        {showMap && <Map />}
        {showGallery && <Gallery />}
      </div>
    </div>
  );
};

export default Buy;
