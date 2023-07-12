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
              <div className='sell-address'>
                <h3>Step 1</h3>
                <h5>Enter Address</h5>
                <input className='hno' type='text' placeholder='House Number'></input>
                <input className='locality' type='text' placeholder='Locality'></input>
                <input className='city' type='text' placeholder='City'></input>
                <input className='country' type='text' placeholder='Country'></input>
                <input className='state' type='text' placeholder='State'></input>
                <input className='zcode' type='number' placeholder='Zip Code'></input>
              </div>

              <div className='sell-details'>
                <h3>Step 2</h3>
                <h5>Enter Details</h5>
                <input className='type' type='text' placeholder='Property Type'></input>
                <input className='bed-count' type='number' placeholder='Bedroom Count'></input>
                <input className='bath-count' type='number' placeholder='Bathroom Count'></input>
                <input className='area' type='text' placeholder='Area'></input>
                <textarea className='desc' placeholder='Description'></textarea>
                <button type='submit' className='form-submit'>
                  Ture
                  <span className='submit-icon'><FontAwesomeIcon icon={faGreaterThan} /></span>
                </button>
              </div>

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
