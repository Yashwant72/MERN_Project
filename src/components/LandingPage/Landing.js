import React from 'react'
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './landing.css';

import image from '../../assets/images/landingImg.jpg';
const Landing = () => {
  return (
    <section className='landing-page' id='#home' style={{ backgroundImage: `url(${image})` }}>
      <div className='search-card'>

        <div className='card-heading'>
          <h1>Discover Your Dream Home: Where Possibilities Meet Perfection</h1>
          <h4>Explore a wide range of properties and find your ideal haven</h4>
        </div>

        <div className='card-searchBox'>
          <input type='search' className='search-box' placeholder='Search Properties' />
          <span className='search-icon'><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></span>
        </div>

        <div className='card-button'>
          <button className='create-button'>Create An Account </button>
          <span className='create-icon'><FontAwesomeIcon icon={faArrowRight} size="lg" /></span>
        </div>
        <div className='card-login'>
          <p>Already Have an Account?</p><a href="#signin">Sign In</a>
        </div>
      </div>
    </section>
  )
}
export default Landing
