import React, { useContext, useState, useEffect } from 'react';
import buildingData from '../../assets/dummyData/buildingData';

import './dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomCarousel from '../Carousel/CustomCarousel';
import axios from 'axios';
import Gallery from '../../containers/buying/gallery/Gallery';
import data from '../../assets/dummyData/data';
import { SignInContext } from '../../context/SignInContext';
import { TokenContext } from '../../context/TokenContext';

const Dashboard = () => {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(SignInContext);
  const [Bookmarks, setBookmarks] = useState([]);
  const [active, setActive] = useState(1);

  const handleWasDeleted = () => {
    setWasDeleted(true);
  };

  const handleWasUpdated = () => {
    setWasUpdated(true);
  };

  useEffect(() => {
    const getUserBookmarks = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get('/api/user/bookmarks', config);
        setBookmarks(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserBookmarks();
  }, []);

  const [openBackdrop, setOpenBackdrop] = useState(true);
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const handleOpen = () => {
    setOpenBackdrop(true);
  };

  const [Data, setData] = useState([]);
  const [WasDeleted, setWasDeleted] = useState(false);
  const [WasUpdated, setWasUpdated] = useState(false);

  const fetchData = () => {
    axios
      .get('/api/property/getAll')
      .then((response) => {
        const fetchedData = response.data;
        const filteredData = fetchedData.filter(
          (item) => item.currentOwner._id === user._id
        );
        setData(filteredData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchData();
    if (WasDeleted) {
      console.log('Refetching as property deleted');
      setWasDeleted(false);
    }
    if (WasUpdated) {
      console.log('Refetching as property updated');
      setWasUpdated(false);
    }
  }, [WasDeleted, WasUpdated]);

  const handleClick = (e) => {
    setActive(e);
  };

  return (
    <section className='dashboard-container'>
      <div className='dashboard'>
        <div className='dash-header'>
          <h1>DashBoard</h1>
        </div>
        <hr className='dashed-line'></hr>
        <div className='dash-body'>
          <div className='dash-buttons'>
            <button
              className={active === 1 ? 'bookmark-button-click' : 'bookmark-button'}
              onClick={() => {
                handleClick(1);
              }}
            >
              Property To Sell
              <span className='dash-icon'>
                <FontAwesomeIcon icon={faSackDollar} />
              </span>
            </button>
            <button
              className={active === 2 ? 'bookmark-button-click' : 'bookmark-button'}
              onClick={() => {
                handleClick(2);
              }}
            >
              Bookmarks
              <span className='dash-icon'>
                <FontAwesomeIcon icon={faBookmark} />
              </span>
            </button>
          </div>
          <div className='dash-gallery'>

            {active === 1 && (
              <Gallery
                keyword=''
                data={Data}
                map={false}
                onClick={handleOpen}
                delete={true}
                update={true}
                wasDeleted={handleWasDeleted}
                wasUpdated={handleWasUpdated}
              />
            )}
          </div>
          <div className='dash-bookmarks'>

            {active === 2 && (
              <Gallery
                keyword=''
                data={Bookmarks}
                map={false}
                onClick={handleOpen}
                delete={true}
                update={true}
                wasDeleted={handleWasDeleted}
                wasUpdated={handleWasUpdated}
              />
            )}
          </div>

          <div className='dash-carousel'>
            <CustomCarousel forMap={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
