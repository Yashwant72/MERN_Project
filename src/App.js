import './App.css';
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Nav from './components/NavBar/Nav';
import Buy from './containers/buying/Buy';
import Landing from './components/LandingPage/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/home/Home';
import Sell from './components/Sell/Sell';
import About from './components/Contact/About';
import { Backdrop } from '@mui/material';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import { SignInProvider } from './context/SignInContext';
import { TokenProvider } from './context/TokenContext';
function App() {
  const [authState, setAuthState] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleSignIn = () => {
    setShowBackdrop(true);
  };

  const handleSignOut = () => {
    setAuthState(!authState);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setShowBackdrop(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };



  return (
    <div className="app">
      <TokenProvider>
        <SignInProvider>
          <BrowserRouter >

            <Nav auth={authState}
              handleSignIn={handleSignIn}
              handleSignOut={handleSignOut} />
            <div style={{ marginTop: '80px', width: '100%' }}>
              <Routes>
                <Route path="/" element={<Landing handleSignIn={handleSignIn} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
          </BrowserRouter>
        </SignInProvider>
      </TokenProvider>

    </div >
  );
}

export default App;
