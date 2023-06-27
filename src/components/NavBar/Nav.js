import React from 'react';
import './nav.css';


const Nav = (props) => {
  const  log=  props.auth;
  
  return (
    <nav class="navbar navbar-expand-lg header">
    <div class="container-fluid">
    <a class="navbar-brand brand ms-5" href="#">UrbanNest</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
      <div class="navbar-nav" >
        <a class="nav-link me-4" aria-current="page" href="#about">About</a>
        <a class="nav-link mx-4" aria-current="page" href="#buy">Buy</a>
        <a class="nav-link mx-4" aria-current="page" href="#sell">Sell</a>
        <a class="nav-link mx-4" aria-current="page" href="#contact">Contact</a>
      </div>
    </div>
    <div>
        <buttons className='btn border-3 bg-primary btn-sm px-3 ms-5 text-white'>Sign Up</buttons>
        <buttons className='border-primary btn border-3 bg-light btn-sm px-3 mx-5 text-primary'>Sign In</buttons>
    </div>
  </div>
</nav>
  )
}

export default Nav
