import React from "react";
import "./PropertyCard.css";
import tub from "../../assets/icons/tub.png";
import bed from "../../assets/icons/bed.png";
import area from "../../assets/icons/area.png";
const PropertyCard = (props) => {
  const handleClick = () => {
    props.onClick(props.address); // Pass the address to the parent component's click handler
  };

  return (
    <div className="card-container">
      <div className="card" onClick={handleClick}>
        <div className="card-media">
          <img src={props.img} alt="Building" width="250px" height="150px" />
        </div>
        <div className="card-content">
          <div className="card-text">
            <div className="card-text-heading">${props.price}</div>

            <div className="card-text-address">{props.address}</div>
          </div>
          <div className="card-footer">
            <div className="card-footer-bed">
              <img src={bed} alt="bed" />
              {props.bed}
            </div>
            <div className="card-footer-tub">
              <img src={tub} alt="bed" />
              {props.tub}
            </div>
            <div className="card-footer-area">
              <img src={area} alt="bed" />
              {props.area}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
