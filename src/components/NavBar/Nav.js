import React, { useState } from 'react';
import './nav.css';
import user from '../../assets/images/user.png'
import dropDown from '../../assets/icons/dropDown.png'
const Nav = (props) => {
  const isLoggedIn = props.auth;
  console.log(isLoggedIn)


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
    <nav class="navbar navbar-expand-lg header w-100">
      <div class="container-fluid w-100">
        <a class="navbar-brand brand ms-5" href="#">UrbanNest</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        {isLoggedIn && (
          <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
            <div class="navbar-nav" >
              <a class="nav-link me-4" aria-current="page" href="#about">About</a>
              <a class="nav-link mx-4" aria-current="page" href="#buy">Buy</a>
              <a class="nav-link mx-4" aria-current="page" href="#sell">Sell</a>
              <a class="nav-link mx-4" aria-current="page" href="#contact">Contact</a>
            </div>
          </div>
        )}


        {isLoggedIn ? (
          <div className='user'>
            <div className='username'>
              John doe
            </div>
            <div className='user-image'>
              <img src={user} alt='image' />
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
            <buttons className='btn border-3 bg-primary btn-sm px-3 ms-5 text-white'>Sign Up</buttons>
            <buttons
              onClick={props.handleSignIn}
              className='border-primary btn border-3 bg-light btn-sm px-3 mx-5 text-primary'>Sign In</buttons>
          </div>
        )}



      </div>
    </nav>
  )
}

export default Nav
