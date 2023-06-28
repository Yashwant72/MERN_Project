import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import "./customCarousel.css";
import buildingData from "../../assets/dummyData/buildingData";
import PropertyCard from "../PropertyCard";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const CustomCarousel = () => {
  //TODO add propsp
  const keyword = "";
  const filteredBuildingData = buildingData.filter((item) =>
    item.address.toLowerCase().includes(keyword.toLowerCase())
  );

  

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
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next"></div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default CustomCarousel;
