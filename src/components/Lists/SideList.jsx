import React from "react";
import "./sideList.css";
import bed from "../../assets/icons/bed.png";
import tub from "../../assets/icons/tub.png";
import area from "../../assets/icons/area.png";

const SideList = (props) => {
  const pricePerUnit = (props.price / props.area).toFixed(2);
  // console.log(pricePerUnit);

  const handleClick = () => {
    props.onClick(props.address); // Pass the address to the parent component's click handler
  };

  return (
    <div className="sideList-container" onClick={handleClick}>
      <div className="sideList">
        <div className="sideList-col1">
          <div className="sideList-image">
            <img src={props.img} alt="site" />
          </div>
        </div>
        <div className="sideList-col2">
          <div className="sideList-icons">
            <div className="sideList-bed">
              <div className="sideList-bed-icon">
                <img src={bed} alt="" />
              </div>
              <div className="sideList-bed-num">{props.bed}</div>
            </div>
            <div className="sideList-tub">
              <div className="sideList-tub-icon">
                <img src={tub} alt="" />
              </div>
              <div className="sideList-tub-num">{props.tub}</div>
            </div>
            <div className="sideList-area">
              <div className="sideList-area-icon">
                <img src={area} alt="" />
              </div>
              <div className="sideList-area-num">{props.area}</div>
            </div>
          </div>
          <div className="sideList-address">
            <div className="sideList-address-street">{props.address}</div>
            <div className="sideList-address-state">{props.state} </div>
          </div>
        </div>
        <div className="sideList-col3">
          <div className="sideList-price">
            <div className="sideList-price-total">${props.price}</div>
            <div className="sideList-price-unit">${pricePerUnit} unit</div>
          </div>
          <div className="sideList-type">
            <div className="sideList-type-name">{props.propertyType}</div>
            <div className="sideList-type-info">Property Type</div>
          </div>
        </div>
        <div className="sideList-col4">
          <div className="sideList-date">
            <div className="sideList-date-main">{props.listingDate}</div>
            <div className="sideList-date-info">Listing Date</div>
          </div>
          <div className="sideList-status">
            <div className="sideList-status-main">{props.listingStatus}</div>
            <div className="sideList-status-info">Listing status</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideList;
