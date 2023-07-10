import React, { useContext } from "react";
import "./buy.css";
import { useState } from "react";
import { useEffect } from "react";
import List from "./list/List";
import Map from "./map/Map";
import Gallery from "./gallery/Gallery";
import buildingData from "../../assets/dummyData/buildingData";
// import Gallery from "../../components/Gallery";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import filter from "../../assets/icons/filter.png";
import PropertyDetail from "./property/PropertyDetail";
import { Button, Menu, MenuItem } from "@mui/material";
import { TokenContext } from "../../context/TokenContext";
import { SignInContext } from "../../context/SignInContext";
import axios from "axios";

const Buy = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(SignInContext);

  // console.log("🚀 ~ file: Buy.jsx:31 ~ Buy ~ user:", user);

  // useEffect(() => {
  //   console.log("🚀 ~ file: Buy.jsx:29 ~ Buy ~ token:", token);
  // }, [token]);

  // const config;

  const [searchText, setSearchText] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
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

  // ** Fetching data
  const [Data, setData] = useState([]);

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

  // ** Button styles

  const handleButtonClick = (buttonName) => {
    setShowList(buttonName === "list");
    setShowMap(buttonName === "map");
    setShowGallery(buttonName === "gallery");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionClose = () => {
    setAnchorEl(null);
  };
  // TODO set default to Map
  const [selectedOption, setSelectedOption] = useState("List");

  console.log("🚀 ~ file: Buy.jsx:86 ~ Buy ~ selectedOption:", selectedOption);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Update the view based on the selected option
    if (option === "List") {
      setShowList(true);
      setShowMap(false);
      setShowGallery(false);
    } else if (option === "Map") {
      setShowList(false);
      setShowMap(true);
      setShowGallery(false);
    } else if (option === "Gallery") {
      setShowList(false);
      setShowMap(false);
      setShowGallery(true);
    }
    handleOptionClose();
  };

  return (
    <div className="buy-container">
      <div className="buy">
        <div className="buy-input">
          {/* <button onClick={fetchData}>Fetch</button> */}
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
        </div>
        <div className="buy-options">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              height: "40px",
              width: "100px",

              borderRadius: "5px",
              backgroundColor: "var(--color-light)",
              border: "0.5px solid var(--color-dark-subtle)",
              color: "var(--color-subtle)",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "var(--font-family)",
              fontWeight: "normal",
              "&:hover": {
                borderColor: "var(--color-contrast)",
                color: "var(--color-contrast)",
              },
            }}
            className={open ? "button-active" : ""}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectedOption}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleOptionClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => handleOptionClick("List")}
              sx={{
                height: "40px",
                width: "100px",
                backgroundColor: "var(--color-light)",
                border: "0",
                color: "var(--color-subtle)",
                textTransform: "none",
                fontSize: "16px",
                fontFamily: "var(--font-family)",
                fontWeight: "normal",
                "&:hover": {
                  borderColor: "var(--color-contrast)",
                  color: "var(--color-contrast)",
                },
              }}
            >
              List
            </MenuItem>
            <MenuItem
              onClick={() => handleOptionClick("Map")}
              sx={{
                height: "40px",
                minWidth: "100px",
                backgroundColor: "var(--color-light)",
                border: "0",
                color: "var(--color-subtle)",
                textTransform: "none",
                fontSize: "16px",
                fontFamily: "var(--font-family)",
                fontWeight: "normal",
                "&:hover": {
                  borderColor: "var(--color-contrast)",
                  color: "var(--color-contrast)",
                },
              }}
            >
              Map
            </MenuItem>
            <MenuItem
              onClick={() => handleOptionClick("Gallery")}
              sx={{
                height: "40px",
                width: "100px",
                backgroundColor: "var(--color-light)",
                border: "0",
                color: "var(--color-subtle)",
                textTransform: "none",
                fontSize: "16px",
                fontFamily: "var(--font-family)",
                fontWeight: "normal",
                "&:hover": {
                  borderColor: "var(--color-contrast)",
                  color: "var(--color-contrast)",
                },
              }}
            >
              Gallery
            </MenuItem>
          </Menu>
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
            data={Data}
            map={false}
            onClick={handleOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Buy;
