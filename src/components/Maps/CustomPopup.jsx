import React from "react";
import "./customPopup.css";
import tub from "../../assets/icons/tub.png";
import bed from "../../assets/icons/bed.png";
import area from "../../assets/icons/area.png";

const CustomPopup = ({ item }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-image">
          <img src={item.img} />
        </div>
        <div className="popup-content">
          <div className="popup-content-price">{item.price}</div>
          <div className="popup-content-address">{item.address}</div>
          <div className="popup-content-icons">
            <div className="popup-content-bed">
              <img src={bed} alt="bed" />
              {item.bed}
            </div>

            <div className="popup-content-tub">
              <img src={tub} alt="tub" />
              {item.tub}
            </div>
            <div className="popup-content-area">
              <img src={area} alt="area" />
              {item.area}m2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
