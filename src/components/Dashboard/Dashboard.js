import React, { useState } from 'react'
import PropertyCard from '../PropertyCard'
import buildingData from '../../assets/dummyData//buildingData';

import './dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // const filteredBuildingData = buildingData.filter((item) =>item.address.toLowerCase().includes(props.keyword.toLowerCase())
  // );
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    setActive(e);
  }
  return (
    <section className='dashboard-container'>

      <div className='dashboard'>
        <div className='dash-header'>
          <h1>DashBoard</h1>
        </div>

        <hr class="dashed-line"></hr>

        <div className='dash-buttons'>
          <button className={active == 1 ? "bookmark-button-click" : "bookmark-button"} onClick={() => { handleClick(1) }}>
            Bookmarked
            <span className='dash-icon'><FontAwesomeIcon icon={faBookmark} /></span></button>

          <button className={active == 2 ? "bookmark-button-click" : "bookmark-button"} onClick={() => { handleClick(2) }}>
            Recently Viewed
            <span className='dash-icon'><FontAwesomeIcon icon={faClock} /></span></button>

          <button className={active == 3 ? "bookmark-button-click" : "bookmark-button"} onClick={() => { handleClick(3) }}>
            Selling
            <span className='dash-icon'><FontAwesomeIcon icon={faSackDollar} /></span></button>
        </div>

        <div className='dash-carousel'>
          {/* Carousel part comes here */}
          {/* swiper and slick both libraries are already installed */}
        </div>
        
      </div>
    </section>
  )
}

export default Dashboard
