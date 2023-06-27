import React from 'react'
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './landing.css';

// import image from '../../assets/images/landingBg.jpg';
import image from '../../assets/images/landingBgAlt.png'
const Landing = () => {
  return (
    <section className='landing-page-container' id='#home'
      style={{ backgroundImage: `url(${image})` }}>
      <div className='landing-page'>
        <div className='search-card' >
          <div className='card-heading'>
            <h1>Discover Your Dream Home: Where Possibilities Meet Perfection</h1>
            <h4>Explore a wide range of properties and find your ideal haven</h4>
          </div>

          <div className='card-searchBox'>
            <input type='search' className='search-box' placeholder='Search Properties' />
            {/* search button */}
            <button className='search-button'>

            <span className='search-icon'><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></span>
            </button>
          </div>

          <div className='card-button'>
            <button className='create-button'>
              Create an Account
              <span className='create-icon'><FontAwesomeIcon icon={faArrowRight} size="lg" /></span>
            </button>
          </div>
          <div className='card-login'>
            Already Have an Account?
            <a href="#signin">Sign In</a>
          </div>
        </div>
      </div>

    </section>
  )
}
export default Landing
