import React, { useRef, useState } from "react";
import "./gallery.css";
import PropertyCard from "../../../components/Cards/PropertyCard";
import buildingData from "../../../assets/dummyData/buildingData";
import { Backdrop, Skeleton } from "@mui/material";
import PropertyDetail from "../property/PropertyDetail";

const Gallery = (props) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // console.log(
  //   "🚀 ~ file: Gallery.jsx:12 ~ Gallery ~ selectedProperty:",
  //   selectedProperty
  // );

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

  const forMap = props.map;
  const filteredBuildingData = props.data
    ? props.data.filter((item) =>
        item.address.toLowerCase().includes(props.keyword.toLowerCase())
      )
    : [];

  return (
    <div className="gallery-container">
      <div className="gallery">
        {props.data ? (
          filteredBuildingData.length === 0 ? (
            // Display skeleton if data is empty
            Array.from({ length: 15 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={300}
                height={300}
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
              />
            ))
          ) : (
            // Render PropertyCard components
            filteredBuildingData.map((building, index) => (
              <PropertyCard
                key={index}
                img={building.images}
                price={building.price}
                address={building.address}
                bed={building.bedrooms}
                tub={building.bathrooms}
                area={building.area}
                onClick={
                  forMap
                    ? () => props.onClick(building.address)
                    : () => handleOpen(building)
                }
              />
            ))
          )
        ) : (
          // Display skeleton when data is not available
          <Skeleton
            variant="rectangular"
            width={300}
            height={300}
            animation="wave"
          />
        )}
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
          {selectedProperty ? (
            <PropertyDetail building={selectedProperty} />
          ) : (
            // Display skeleton if selectedProperty is null
            <Skeleton
              variant="rectangular"
              width={600}
              height={400}
              animation="wave"
            />
          )}
        </div>
      </Backdrop>
    </div>
  );
};

export default Gallery;
