import React from 'react'
import './sell.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
const Sell = () => {
  return (
    <section className='sell-container'>
      <div className='sell'>

        <div className='sell-form'>
          <h1>Sell Property</h1>
          
          <div>
            <form action='' method='get' className='form-details'>

            <div className=' sell-address'>
              <h3>Step 1</h3>
              <h5>Enter Details</h5>
              <input className='type' type='number' placeholder='Price'></input>
              <input className='area' type='text' placeholder='Area'></input>
              <label for="files">Select file</label>
              <input className='image' id='files' type='file' placeholder='Property Image'></input>
              <input className='type' type='text' placeholder='Property Type'></input>
              <input className='bed-count' type='number' placeholder='Bedroom Count'></input>
              <textarea className='desc' placeholder='Description'></textarea>
            </div>

            <div className='sell-details'>
              <h3>Step 2</h3>
              <h5>Enter Address</h5>
              <input className='address' type='text' placeholder='Complete Address'></input>
            </div>

            <button type='submit' className='form-submit'>
              Next
              <span className='submit-icon'><FontAwesomeIcon icon={faGreaterThan} /></span>
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
