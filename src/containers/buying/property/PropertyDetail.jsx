import React from "react";
import "./propertyDetail.css";
import tub from "../../../assets/icons/tub.png";
import bed from "../../../assets/icons/bed.png";
import area from "../../../assets/icons/area.png";
import location from "../../../assets/icons/location.png";
import { Rating } from "@mui/material";

// TODO add links for property images

const PropertyDetail = () => {
  return (
    <div className="property-container">
      <div className="property">
        <div className="property-image">
          <img
            src="https://source.unsplash.com/featured/1920x650/?house_Interior&sig=1"
            alt="img5"
          />
        </div>
        <div className="property-content">
          <div className="property-content-details">
            <div className="property-content-details-header">
              <div className="property-content-details-header-title">
                Cozy apartment for rent
              </div>
              <div className="property-content-details-header-rating">
                3.5
                <Rating
                  name="read-only"
                  value={3.5}
                  precision={0.5}
                  readOnly
                  size="large"
                  className="custom-rating"
                />
              </div>
            </div>
            <div className="property-content-details-body">
              <div className="property-content-details-address">
                <img src={location} alt="" />
                Lorem, ipsum dolor sit amet consectetur adipisicing
                elit.Accusamus eos molestias
              </div>
            </div>
            <div className="property-content-details-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              modi tempore reiciendis commodi non dolores corrupti in vitae quam
              cum. Odio nihil commodi asperiores omnis reiciendis adipisci
              tenetur id soluta! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nobis minus excepturi, illo, quis, natus hic
              eligendi officia ab molestiae fugit eveniet velit pariatur
              sapiente eaque amet dicta labore! Iusto, distinctio?
            </div>
            <div className="property-content-details-images">
              <img
                src="https://source.unsplash.com/featured/250x150/?house_Interior&sig=1"
                alt="img1"
              />
              <img
                src="https://source.unsplash.com/featured/250x150/?house_Interior&sig=2"
                alt="img2"
              />
              <img
                src="https://source.unsplash.com/featured/250x150/?house_Interior&sig=3"
                alt="img3"
              />
              <img
                src="https://source.unsplash.com/featured/250x150/?house_Interior&sig=4"
                alt="img4"
              />
            </div>
          </div>
          <div className="property-content-card">
            <div className="property-content-card-info">Brief Information</div>
            <div className="property-content-card-owner">
              Owner: Real estate agency
            </div>
            <div className="property-content-card-icons">
              <div className="property-content-card-bed">
                <img src={bed} alt="bed" />
                {/* {item.bed} */}1
              </div>

              <div className="property-content-card-tub">
                <img src={tub} alt="tub" />
                {/* {item.tub} */}2
              </div>
              <div className="property-content-card-area">
                <img src={area} alt="area" />
                {/* {item.area}m2 */}1200m2
              </div>
            </div>
            <div className="property-content-card-numbers">
              <div className="property-content-card-price">
                <div className="property-content-card-price-title">Price:</div>
                <div className="property-content-card-price-data">
                  $234000.00
                </div>
              </div>
              <div className="property-content-card-date">
                <div className="property-content-card-date-title">Date:</div>
                <div className="property-content-card-date-data">
                  12/07/2023
                </div>
              </div>
            </div>
            <div className="property-content-card-buttons">
              <button className="property-content-card-btn">
                Show contacts
              </button>
              <button className="property-content-card-btn">Add to list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
