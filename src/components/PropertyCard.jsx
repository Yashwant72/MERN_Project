import React from "react";
import "./propertyCard.css";
import tub from "../assets/icons/tub.png";
import bed from "../assets/icons/bed.png";
import area from "../assets/icons/area.png";
const PropteryCard = () => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-media">
          <img
            src="https://source.unsplash.com/featured/?building"
            alt="Building"
            width="250px"
            height="150px"
          />
        </div>
        <div className="card-text">
          <div className="card-text-heading">$95000.99</div>
          
          <div className="card-text-address">3517 W. Gray St. Utica, 
Pennsylvania 57867</div>
        </div>
        <div className="card-footer">
          <div className="card-footer-bed">bed</div>
          <div className="card-footer-tub">tub</div>
          <div className="card-footer-area">area</div>
        </div>
      </div>
    </div>
  );
};

export default PropteryCard;
