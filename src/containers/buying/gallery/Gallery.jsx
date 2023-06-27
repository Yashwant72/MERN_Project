import React from "react";
import "./gallery.css";
import PropertyCard from "../../../components/PropertyCard";
import buildingData from "../../../assets/dummyData/buildingData";

// console.log(buildingData);

const Gallery = (props) => {
  const filteredBuildingData = buildingData.filter((item) =>
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
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
