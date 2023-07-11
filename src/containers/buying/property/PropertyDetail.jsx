import { useContext, useEffect } from "react";
import "./propertyDetail.css";
import axios from "axios";
import tub from "../../../assets/icons/tub.png";
import bed from "../../../assets/icons/bed.png";
import area from "../../../assets/icons/area.png";
import location from "../../../assets/icons/location.png";
import { Rating } from "@mui/material";
import { TokenContext } from "../../../context/TokenContext";

// TODO add links for property images

const PropertyDetail = ({ building }) => {
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    console.log(token);
    console.log(building)
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };

  const handleAddBookmark = async () => {
    const config = { headers: { "Authorization": `Bearer ${token}` } }

    const { data } = await axios.post(`/api/user/bookmarks/${building._id}`, null, config);
    console.log(data.message);
  }

  return (
    <div className="property-container">
      <div className="property">
        <div className="property-image">
          <img src={building.images} alt="img5" />
        </div>
        <div className="property-content">
          <div className="property-content-details">
            <div className="property-content-details-header">
              <div className="property-content-details-header-title">
                Cozy apartment
              </div>
              <div className="property-content-details-header-rating">
                {building.rating}
                <Rating
                  name="read-only"
                  value={building.rating}
                  precision={0.5}
                  readOnly
                  size="medium"
                  className="custom-rating"
                />
              </div>
            </div>
            <div className="property-content-details-body">
              <div className="property-content-details-address">
                <img src={location} alt="" />
                {building.address}
                {/* {building.a} */}
              </div>
            </div>
            <div className="property-content-details-description">
              {building.description}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              modi tempore reiciendis commodi non dolores corrupti in vitae quam
              cum.
            </div>
            <div className="property-content-bottom">
              <div className="property-content-details-images">
                <img
                  src="https://source.unsplash.com/featured/200x200/?house_Interior&sig=1"
                  alt="img1"
                />
                <img
                  src="https://source.unsplash.com/featured/200x200/?house_Interior&sig=2"
                  alt="img2"
                />
                <img
                  src="https://source.unsplash.com/featured/200x200/?house_Interior&sig=3"
                  alt="img3"
                />
                <img
                  src="https://source.unsplash.com/featured/200x200/?house_Interior&sig=4"
                  alt="img4"
                />
              </div>
              <div className="property-content-card">
                <div className="property-content-card-info">
                  Brief Information
                </div>
                <div className="property-content-card-owner">
                  <span style={{ fontWeight: "bold" }}>Owner:</span>
                  {building.currentOwner.fullName}
                </div>
                <div className="property-content-card-facilites">
                  <span style={{ fontWeight: "bold" }}>Facilites:</span> <br />
                  {building.facilities}
                </div>
                <div className="property-content-card-icons">
                  <div className="property-content-card-bed">
                    <img src={bed} alt="bed" />
                    {building.bedrooms}
                  </div>

                  <div className="property-content-card-tub">
                    <img src={tub} alt="tub" />
                    {building.bathrooms}
                  </div>
                  <div className="property-content-card-area">
                    <img src={area} alt="area" />
                    {building.area}m2
                  </div>
                </div>
                <div className="property-content-card-numbers">
                  <div className="property-content-card-price">
                    <div className="property-content-card-price-title">
                      Price:
                    </div>
                    <div className="property-content-card-price-data">
                      $ {building.price}
                    </div>
                  </div>
                  <div className="property-content-card-date">
                    <div className="property-content-card-date-title">
                      Date:
                    </div>
                    <div className="property-content-card-date-data">
                      {/* {building.updatedAt} */}
                      {formatDate(building.updatedAt)}
                    </div>
                  </div>
                </div>
                <div className="property-content-card-buttons">
                  <button className="property-content-card-btn">
                    Show contacts
                  </button>
                  <button className="property-content-card-btn" onClick={handleAddBookmark}>
                    Add to list
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
