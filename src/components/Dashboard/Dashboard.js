import React, { useState, useEffect, useContext } from 'react'
import buildingData from '../../assets/dummyData//buildingData';

import './dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';

import CustomCarousel from '../Carousel/CustomCarousel';

import { SignInContext } from '../../context/SignInContext';
import { TokenContext } from "../../context/TokenContext";
import axios from 'axios';

const Dashboard = () => {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(SignInContext);

  useEffect(() => {
    const getUserBookmarks = async () => {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.get(
        `/api/user/bookmarks`,
        config
      );
      console.log(data);
    }

    getUserBookmarks();
  }, [])

  //TODO change to props
  const keyword = "";
  const filteredBuildingData = buildingData.filter((item) => item.address.toLowerCase().includes(keyword.toLowerCase())
  );
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

        <div className='dash-body'>

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
            <CustomCarousel forMap={false}/>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Dashboard
