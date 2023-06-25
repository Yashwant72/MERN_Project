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
            {props.bed}
          </div>
          <div className="listItem-tub">
            <img src={tub} alt="tub" />
            {props.tub}
          </div>
          <div className="listItem-area">
            <img src={area} alt="area" />
            {props.area}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
