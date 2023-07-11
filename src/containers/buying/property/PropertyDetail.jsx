import { useContext, useState, useEffect } from "react";
import "./propertyDetail.css";
import axios from "axios";
import tub from "../../../assets/icons/tub.png";
import bed from "../../../assets/icons/bed.png";
import area from "../../../assets/icons/area.png";
import location from "../../../assets/icons/location.png";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TokenContext } from "../../../context/TokenContext";
import { Alert, Button, Slide, Snackbar } from "@mui/material";
import { SignInContext } from "../../../context/SignInContext";
// TODO add links for property images

const PropertyDetail = ({
  building,
  deleteEnable,
  updateEnable,
  closeOnDelete,
  propertyDeleted,
  propertyUpdated,
}) => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(SignInContext);

  // console.log("🚀 ~ file: PropertyDetail.jsx:26 ~ user:", user);

  console.log("🚀 ~ file: PropertyDetail.jsx:24 ~ token:", token);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  console.log(
    "🚀 ~ file: PropertyDetail.jsx:14 ~ PropertyDetail ~ building:",
    building._id
  );

  // useEffect(() => {
  //   console.log(token);
  //   console.log(building);
  // });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };
  const handleDeleteProperty = async () => {
    try {
      const response = await axios.delete(`/api/property/${building._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
        },
      });
      console.log(response.data.msg);
      setSnackbarSeverity("success");
      setSnackbarMessage("Delete successful");
      setOpenSnackbar(true);
      setTimeout(() => {
        closeOnDelete();
        propertyDeleted();
      }, 2000);
      // closeOnDelete();
      // Property Deleted
    } catch (error) {
      console.error("Error deleting property:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error in deleting");
      setOpenSnackbar(true);
      // Handle error case
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  //** Update form field / data */
  const [openDialog, setopenDialog] = useState(false);

  const handleOpen = () => {
    setopenDialog(true);
  };

  const handleClose = () => {
    setopenDialog(false);
  };

  const [propertyData, setPropertyData] = useState({
    price: building.price,
    completeAddress: building.address,
    area: building.area,
    image: building.images,
    propertyType: building.type,
    bedroomCount: building.bedrooms,
    bathroomCount: building.bathrooms,
    facility: building.facilities,
    description: building.price,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setPropertyData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  // console.log(propertyData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const propertyDataJSON = {
        // currentOwner: token,
        price: propertyData.price,
        address: propertyData.completeAddress,
        bedrooms: propertyData.bedroomCount,
        bathrooms: propertyData.bathroomCount,
        area: propertyData.area,
        images: "https://source.unsplash.com/featured/?house&sig=1",
        type: propertyData.propertyType,
        facilities: propertyData.facility,
        description: propertyData.description,
      };

      console.log(
        "🚀 ~ file: PropertyDetail.jsx:134 ~ handleUpdateProperty ~ propertyDataJSON:",
        propertyDataJSON
      );

      const response = await axios.put(
        `/api/property/${building._id}`,
        propertyDataJSON,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setSnackbarMessage("Updated successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        handleClose();
        propertyUpdated();
      }, 3000);
    } catch (error) {
      console.error("Error updating property:", error);

      // console.log(
      //   "🚀 ~ file: PropertyDetail.jsx:165 ~ handleSubmit ~ error.response.data:",
      //   error.response.data
      // );

      setSnackbarMessage(error.response.data);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleAddBookmark = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(
      `/api/user/bookmarks/${building._id}`,
      null,
      config
    );
    console.log(data.message);
  };

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
                <div className="property-content-buttons">
                  {deleteEnable && (
                    <div className="property-delete">
                      <IconButton
                        aria-label="read"
                        sx={{
                          color: "var(--color-light)",
                          width: "40px",
                          height: "40px",
                          margin: "10px",
                          opacity: 1,
                          backgroundColor: "var(--color-dark) !important",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor: "red !important",
                            color: "var(--color-dark) !important",
                          },
                        }}
                        // onClick={() => {
                        //   console.log("Delete");
                        // }}
                        onClick={handleDeleteProperty}
                      >
                        <DeleteIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </div>
                  )}

                  {updateEnable && (
                    <div className="property-update">
                      <IconButton
                        aria-label="read"
                        sx={{
                          color: "var(--color-light)",
                          width: "40px",
                          height: "40px",
                          margin: "10px",
                          opacity: 1,
                          backgroundColor: "var(--color-dark) !important",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor:
                              "var(--color-contrast)  !important",
                            color: "var(--color-light) !important",
                          },
                        }}
                        onClick={() => {
                          console.log("update");
                          handleOpen();
                        }}
                      >
                        <EditIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </div>
                  )}
                </div>
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
                  <button
                    className="property-content-card-btn"
                    onClick={handleAddBookmark}
                  >
                    Add to list
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        onClose={handleClose}
        open={openDialog}
        maxWidth={"xl"}
        fullWidth
        sx={{
          // display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "20px !important",
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "var(--font-family)",
            fontSize: "36px",
            color: "var(--color-light)",
            backgroundColor: "var(--color-dark)",
          }}
        >
          Update Property
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "20px 40px",
            zIndex: "100 !important",
          }}
        >
          <div>
            <div className="sell">
              <div className="sell-form">
                {/* <h1>Update Property</h1> */}

                <div>
                  <form onSubmit={handleSubmit} className="form-details">
                    <div className="sell-address">
                      <h3>Step 1</h3>
                      <h5>Enter Details</h5>
                      <input
                        className="type"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={propertyData.price}
                        onChange={handleChange}
                      />
                      <input
                        className="area"
                        type="text"
                        name="area"
                        placeholder="Area"
                        value={propertyData.area}
                        onChange={handleChange}
                      />
                      <label htmlFor="files">Select file</label>
                      <input
                        className="image"
                        id="files"
                        type="file"
                        name="image"
                        onChange={handleChange}
                      />
                      <input
                        className="type"
                        type="text"
                        name="propertyType"
                        placeholder="Property Type"
                        value={propertyData.propertyType}
                        onChange={handleChange}
                      />
                      <input
                        className="bed-count"
                        type="number"
                        name="bedroomCount"
                        placeholder="Bedroom Count"
                        value={propertyData.bedroomCount}
                        onChange={handleChange}
                      />
                      <input
                        className="bath-count"
                        type="number"
                        name="bathroomCount"
                        placeholder="Bathroom Count"
                        value={propertyData.bathroomCount}
                        onChange={handleChange}
                      />
                      <input
                        className="type"
                        type="text"
                        name="facility"
                        placeholder="Facility"
                        value={propertyData.facility}
                        onChange={handleChange}
                      />
                      <textarea
                        className="desc"
                        name="description"
                        placeholder="Description"
                        value={propertyData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="sell-details">
                      <h3>Step 2</h3>
                      <h5>Enter Address</h5>
                      <input
                        className="address"
                        type="text"
                        name="completeAddress"
                        placeholder="Complete Address"
                        value={propertyData.completeAddress}
                        onChange={handleChange}
                      />
                      <div className="sell-btns">
                        <button
                          onClick={handleClose}
                          className="form-submit cancel"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="form-submit">
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="sell-image"></div>
            </div>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              TransitionComponent={Slide}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{
                position: "fixed",
                zIndex: "9999 !important", // Set the desired z-index value
              }}
            >
              <Alert
                severity={snackbarSeverity}
                sx={{
                  width: "100%",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          position: "fixed",
          zIndex: "9999 !important", // Set the desired z-index value
        }}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PropertyDetail;
