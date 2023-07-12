import './App.css';
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Nav from './components/NavBar/Nav';
import Buy from './containers/buying/Buy';
import Landing from './components/LandingPage/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes, useHistory, useNavigate } from 'react-router-dom';
import Home from './containers/home/Home';
import Sell from './components/Sell/Sell';
import About from './components/Contact/About';
import { Backdrop } from '@mui/material';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import { SignInProvider } from './context/SignInContext';
import { TokenProvider } from './context/TokenContext';
function App() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showSignUpBackdrop, setshowSignUpBackdrop] = useState(false)
  const [InitialSearch, setInitialSearch] = useState("")

  
  
  const handleSearch = (e) => {
    setInitialSearch(e);
    navigate('/buy');
  }
  console.log("🚀 ~ file: App.js:23 ~ App ~ InitialSearch:", InitialSearch);

  const handleSignIn = () => {
    setShowBackdrop(true);
  };

  const handleSignUp = () => {
    setshowSignUpBackdrop(true);
  };


  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setShowBackdrop(false);
    setshowSignUpBackdrop(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  return (
    <div className="app">
      <TokenProvider>
        <SignInProvider>
          {/* <BrowserRouter > */}

          <Nav
            handleSignIn={handleSignIn}
            handleSignUp={handleSignUp} />
          <div style={{ marginTop: '80px', width: '100%' }}>
            <Routes>
              <Route
                path="/"
                element={<Landing handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleSearch={handleSearch} SearchText={InitialSearch} />}
              />
              <Route
                path="/home"
                element={<Home handleSearch={handleSearch} SearchText={InitialSearch} />}
              />
              <Route
                path="/sell"
                element={<Sell />}
              />
              <Route
                path="/buy"
                element={<Buy SearchText={InitialSearch} />}
              />
              <Route
                path="/about"
                element={<About />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
            </Routes>
          </div>
          {showBackdrop && (
            <Backdrop
              style={{
                zIndex: 1000,
                transition: 'opacity 0.2s',
              }}
              open={showBackdrop}
            // onClick={handleClose}
            >
              <SignIn onClick={handleClose} />
            </Backdrop>
          )}
          {showSignUpBackdrop && (
            <Backdrop
              style={{
                zIndex: 1000,
                transition: 'opacity 0.2s',
              }}
              open={showSignUpBackdrop}
            // onClick={handleClose}
            >
              {/* <SignIn onClick={handleClose} /> */}
              <SignUp onClick={handleClose} />
            </Backdrop>
          )}

          {/* </BrowserRouter> */}
        </SignInProvider>
      </TokenProvider>

    </div >
  );
}

export default App;
