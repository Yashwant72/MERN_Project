import React, { useContext, useEffect, useState } from 'react';
import './nav.css';
import user from '../../assets/images/user.png'
import dropDown from '../../assets/icons/dropDown.png'
import { SignInContext } from '../../context/SignInContext';
import { imagefrombuffer } from "imagefrombuffer"; //first import 
import { Outlet, Link } from "react-router-dom";
const Nav = (props) => {

  const { user } = useContext(SignInContext);
  const [imageUrl, setImageUrl] = useState(user);

  // console.log("🚀 ~ file: Nav.js:10 ~ Nav ~ user:", user);
  useEffect(() => {
    setIsLoggedIn(user !== null);
    if (user) {
      console.log("Nav updated");
      const base64String = btoa(String.fromCharCode(...new Uint8Array(user.avatar)));
      const imageNewUrl = `data:image/jpeg;base64,${base64String}`;
      setImageUrl(imageNewUrl);
    }
  }, [user]);

  // const base64Image = Buffer.from(user.avatar).toString('base64');

  // Create the data URL for the image
  // const imageUrl = `data:image/jpeg;base64,${base64Image}`;



  // const isLoggedIn = props.auth;
  const [isLoggedIn, setIsLoggedIn] = useState(user !== null);
  // console.log(isLoggedIn)


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(!isMenuOpen);

    props.handleSignOut();

    // Handle logout logic here
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

              <Link to="/contact" className="nav-link mx-4" aria-current="page" >
                Contact
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
                  <button className='logout-button' onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div>
            <button className='btn border-3 bg-primary btn-sm px-3 ms-5 text-white'>Sign Up</button>
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
