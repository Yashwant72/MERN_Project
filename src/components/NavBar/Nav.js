import React, { useContext, useEffect, useState } from 'react';
import './nav.css';
import user from '../../assets/images/user.png'
import dropDown from '../../assets/icons/dropDown.png'
import { SignInContext } from '../../context/SignInContext';
import { imagefrombuffer } from "imagefrombuffer"; //first import 
import { Outlet, Link } from "react-router-dom";
import { Alert, Button, Slide, Snackbar } from '@mui/material';
import axios from 'axios';
import { TokenContext } from '../../context/TokenContext';

const Nav = (props) => {
  const { token, setToken } = useContext(TokenContext);

  const { user, setUser } = useContext(SignInContext);
  const [imageUrl, setImageUrl] = useState(user);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // console.log("🚀 ~ file: Nav.js:10 ~ Nav ~ user:", user);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      console.log("Nav updated");
      const base64String = btoa(String.fromCharCode(...new Uint8Array(user.avatar)));
      const imageNewUrl = `data:image/jpeg;base64,${base64String}`;
      setImageUrl(imageNewUrl);
    }
  }, [user]);



  console.log("🚀 ~ file: Nav.js:35 ~ Nav ~ isLoggedIn:", isLoggedIn);



  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(!isMenuOpen);
    handleSignOut();
    // props.handleSignOut();

    // Handle logout logic here
  };

  const handleSignOut = () => {
    axios.post('/api/user/signout', null, {
      headers: {
        Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
      },
    })
      .then((response) => {

        console.log("🚀 ~ file: Nav.js:58 ~ .then ~ response:", response);
        setIsLoggedIn(false);
        // setUser(response.data.user);
        // setToken(response.data.token);

        console.log('Sign-Out successful');
        // Cookie.set('AuthToken', response.data.token, { expires: 365 }) 
        // TODO autologin feature

        setSnackbarSeverity('success');
        setSnackbarMessage('Sign-Out successful');
        setOpenSnackbar(true);
        setTimeout(() => {
          // props.onClick();
        }, 2000);

      })
      .catch((error) => {

        console.error('Error signing in:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error signing out');
        setOpenSnackbar(true);

      });
  };


  return (
    <nav className="navbar navbar-expand-lg header w-100 navbar-container" >
      <div className="container-fluid w-100">
        <a className="navbar-brand brand ms-5" href="/">UrbanNest</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {isLoggedIn && (
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
            <div className="navbar-nav" >
              {/* <a className="nav-link me-4" aria-current="page" href="#about">About</a> */}
              {/* <a className="nav-link mx-4" aria-current="page" href="buy">Buy</a> */}
              <Link to="/home" className="nav-link mx-4" aria-current="page" >
                Home
              </Link>

              <Link to="/buy" className="nav-link mx-4" aria-current="page" >
                Buy
              </Link>

              <Link to="/sell" className="nav-link mx-4" aria-current="page" >
                Sell
              </Link>

              <Link to="/about" className="nav-link mx-4" aria-current="page" >
                About Us
              </Link>

              {/* <Link to="/about" /> */}
              {/* <a className="nav-link mx-4" aria-current="page" href="sell">Sell</a> */}
              {/* <a className="nav-link mx-4" aria-current="page" href="#contact">Contact</a> */}
            </div>
          </div>
        )}


        {isLoggedIn ? (
          <div className='user'>
            <div className='username'>
              {/* John doe */}
              {user.fullName}
            </div>
            <div className='user-image'>
              <img src={imageUrl} alt='image' />
            </div>
            <div className='user-menu'>
              <button className={`icon-button ${isMenuOpen ? 'rotate-icon' : ''}`} onClick={handleMenuToggle}>
                <img src={dropDown} alt='dropmenu' />
              </button>

              {isMenuOpen && (
                <div className='menu-content'>
                  <button className='menu-button' onClick={handleLogout}>
                    Logout
                  </button>
                  <button className='menu-button' >
                    <Link
                      to="/dashboard"
                      aria-current="page"
                      onClick={() => { setIsMenuOpen(!isMenuOpen); }}
                      style={{
                        textDecoration: 'none',
                        color: 'var(--color-dark)'
                      }}
                    >
                      Dashbard
                    </Link>
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div>
            <button
              className='btn border-3 bg-primary btn-sm px-3 ms-5 text-white' onClick={props.handleSignOut}
            >
              Sign Up
            </button>
            <button
              onClick={props.handleSignIn}
              className='border-primary btn border-3 bg-light btn-sm px-3 mx-5 text-primary'>Sign In</button>
          </div>
        )}



      </div>
    </nav>
  )
}

export default Nav
