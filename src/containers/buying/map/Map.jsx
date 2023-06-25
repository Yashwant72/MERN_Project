import React from "react";
import "./map.css";
import SideList from "../../../components/SideList";
import buildingData from ".././../../assets/dummyData/buildingData";
import CustomMap from "../../../components/CustomMap";

const Map = () => {
  return (
    <div className="map-container">
      <div className="map">
        <div className="map-left">
          <CustomMap />
        </div>
        <div className="map-right">
          <div className="map-right-content">
            <div className="map-right-lists">
              {buildingData.map((item, index) => (
                <SideList
                  key={index}
                  img={item.img}
                  price={item.price}
                  address={item.address}
                  bed={item.bed}
                  tub={item.tub}
                  area={item.area}
                  state={item.state}
                  listingStatus={item.listingStatus}
                  listingDate={item.listingDate}
                  propertyType={item.propertyType}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
