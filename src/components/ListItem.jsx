import React from "react";
import "./item.css";
import area from "../assets/icons/area.png";
import bed from "../assets/icons/bed.png";
import tub from "../assets/icons/tub.png";
const ListItem = (props) => {
  return (
    <div className="listItem-container">
      <div className="listItem">
        <div className="listItem-image">
          <img src={props.img} alt="image" />
        </div>
        <div className="listItem-price">{props.price}</div>
        <div className="listItem-address">{props.address}</div>
        <div className="listItem-icons">
          <div className="listItem-beds">
            <img src={bed} alt="bed" />
            <div className="listItem-text">{props.bed}</div>
          </div>
          <div className="listItem-tub">
            <img src={tub} alt="tub" />
            <div className="listItem-text">{props.tub}</div>
          </div>
          <div className="listItem-area">
            <img src={area} alt="area" />
            <div className="listItem-text">{props.area}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
