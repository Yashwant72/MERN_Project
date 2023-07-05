import React, { useRef, useState } from "react";
import "./gallery.css";
import PropertyCard from "../../../components/Cards/PropertyCard";
import buildingData from "../../../assets/dummyData/buildingData";
import { Backdrop } from "@mui/material";
import PropertyDetail from "../property/PropertyDetail";

// console.log(buildingData);

const Gallery = (props) => {
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

  // console.log(selectedProperty);

  const forMap = props.map;
  const filteredBuildingData = props.data.filter((item) =>
    item.address.toLowerCase().includes(props.keyword.toLowerCase())
  );
  return (
    <div className="gallery-container">
      <div className="gallery">
        {filteredBuildingData.map((building, index) => (
          <PropertyCard
            key={index}
            img={building.img}
            price={building.price}
            address={building.address}
            bed={building.bed}
            tub={building.tub}
            area={building.area}
            onClick={
              forMap
                ? () => props.onClick(building.address)
                : () => handleOpen(building)
            }
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
          {selectedProperty && <PropertyDetail building={selectedProperty} />}
        </div>
      </Backdrop>
    </div>
  );
};

export default Gallery;
