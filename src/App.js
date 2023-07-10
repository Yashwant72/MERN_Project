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

function App() {
  const [authState, setAuthState] = useState(false);
  const handleSignIn = () => {
    setAuthState(true);
  };

  const handleSignOut = () => {
    setAuthState(!authState);
  };

  return (
    <div className="app">
      <BrowserRouter >
        <Nav auth={authState} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />

        <div style={{ marginTop: '80px', width: '100%' }}>

          <Routes>
            <Route path="/" element={<Landing handleSignIn={handleSignIn} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
