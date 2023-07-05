import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import "./customCarousel.css";
import buildingData from "../../assets/dummyData/buildingData";
import PropertyCard from "../Cards/PropertyCard";
import { Backdrop } from "@mui/material";
import PropertyDetail from "../../containers/buying/property/PropertyDetail";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const CustomCarousel = (props) => {
  //TODO add propsp
  const keyword = "";
  const filteredBuildingData = buildingData.filter((item) =>
    item.address.toLowerCase().includes(keyword.toLowerCase())
  );

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

  console.log(selectedProperty);
  const forMap = props.map;

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="swiper-button-prev"></div>

        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop={true}
          effect="slide" // Set the desired transition effect
          speed={1000} // Set the speed of the transition
          onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {filteredBuildingData.map((building, index) => (
            <SwiperSlide key={index}>
              <PropertyCard
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
            </SwiperSlide>
          ))}
        </Swiper>
        <Backdrop
          sx={{
            // backgroundColor: "rgba(var(--color-dark-subtle), 0.9)",
            color: "var(--color-dark)",
            zIndex: "90",
            display: "flex",
            height: "100%",
            width: "100%,",
          }}
          open={openBackdrop}
          onMouseDown={handleClose}
        >
          <div className="buy-backdrop" ref={backdropRef}>
            {selectedProperty && <PropertyDetail building={selectedProperty} />}
          </div>
        </Backdrop>
        <div className="swiper-button-next"></div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default CustomCarousel;
