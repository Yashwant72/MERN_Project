import React from 'react'
import axios from 'axios';
import { useContext, useState } from 'react';
import { TokenContext } from '../../context/TokenContext';
import './sell.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
const Sell = () => {
  const { token } = useContext(TokenContext);
  const [propertyData, setPropertyData] = useState({
    price: '',
    completeAddress: '',
    area: '',
    image: '',
    propertyType: '',
    bedroomCount: '',
    bathroomCount:'',
    facility : '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setPropertyData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };
    console.log(propertyData)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const propertyDataJSON = {
        currentOwner: token,
        price: propertyData.price,
        address: propertyData.completeAddress,
        bedrooms: propertyData.bedroomCount,
        bathrooms: propertyData.bathroomCount,
        area: propertyData.area,
        images: 'demo image',
        type: propertyData.propertyType,
        facilities: propertyData.facility,
        description: propertyData.description,
      };
      console.log(token);
      console.log("my data")
      console.log(propertyDataJSON);
      const response = await axios.post('/api/property', propertyDataJSON, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      // Handle the response from the API if needed
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  return (
    <section className='sell-container'>
      <div className='sell'>

        <div className='sell-form'>
          <h1>Sell Property</h1>
          
          <div>
          <form onSubmit={handleSubmit} className='form-details'>
              <div className='sell-address'>
                <h3>Step 1</h3>
                <h5>Enter Details</h5>
                <input
                  className='type'
                  type='number'
                  name='price'
                  placeholder='Price'
                  value={propertyData.price}
                  onChange={handleChange}
                />
                <input
                  className='area'
                  type='text'
                  name='area'
                  placeholder='Area'
                  value={propertyData.area}
                  onChange={handleChange}
                />
                <label htmlFor='files'>Select file</label>
                <input
                  className='image'
                  id='files'
                  type='file'
                  name='image'
                  onChange={handleChange}
                />
                <input
                  className='type'
                  type='text'
                  name='propertyType'
                  placeholder='Property Type'
                  value={propertyData.propertyType}
                  onChange={handleChange}
                />
                <input
                  className='bed-count'
                  type='number'
                  name='bedroomCount'
                  placeholder='Bedroom Count'
                  value={propertyData.bedroomCount}
                  onChange={handleChange}
                />
                <input
                  className='bath-count'
                  type='number'
                  name='bathroomCount'
                  placeholder='Bathroom Count'
                  value={propertyData.bathroomCount}
                  onChange={handleChange}
                />
                <input
                  className='type'
                  type='text'
                  name='facility'
                  placeholder='Facility'
                  value={propertyData.facility}
                  onChange={handleChange}
                />
                <textarea
                  className='desc'
                  name='description'
                  placeholder='Description'
                  value={propertyData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className='sell-details'>
                <h3>Step 2</h3>
                <h5>Enter Address</h5>
                <input
                  className='address'
                  type='text'
                  name='completeAddress'
                  placeholder='Complete Address'
                  value={propertyData.completeAddress}
                  onChange={handleChange}
                />
              </div>

              <button type='submit' className='form-submit'>
                Next
                <span className='submit-icon'>
                  <FontAwesomeIcon icon={faGreaterThan} />
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className='sell-image'>
          
        </div>

      </div>
    </section>
  )
}

export default Sell
