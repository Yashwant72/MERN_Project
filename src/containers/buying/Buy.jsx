import React from "react";
import "./buy.css";
import { useState } from "react";
import { useEffect } from "react";
import List from "./list/List";
import Map from "./map/Map";
import Gallery from "./gallery/Gallery";
import buildingData from "../../assets/dummyData/buildingData";
// import Gallery from "../../components/Gallery";

import filter from "../../assets/icons/filter.png";
import PropertyDetail from "./property/PropertyDetail";
import { Backdrop } from "@mui/material";
const Buy = () => {
  const [searchText, setSearchText] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showGallery, setShowGallery] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const handleOpen = () => {
    setOpenBackdrop(true);
  };

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
        {showList && <List keyword={searchText} />}
        {showMap && <Map />}
        {showGallery && (
          <Gallery
            keyword={searchText}
            data={buildingData}
            map={false}
            onClick={handleOpen}
          />
        )}
        {/* {showGallery && <PropertyDetail />} */}
      </div>
      {/* <Backdrop
        sx={{
          color: "var(--color-subtle)",
          zIndex: "90",
        }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <div className="buy-backdrop">
          <PropertyDetail />
        </div>
      </Backdrop> */}
    </div>
  );
};

export default Buy;
