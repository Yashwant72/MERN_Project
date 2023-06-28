import './App.css';
import CustomMap from './components/CustomMap';
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Nav from './components/NavBar/Nav';
import Buy from './containers/buying/Buy';
import Landing from './components/LandingPage/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [authState, setAuthState] = useState(false);

  return (
    <div className="app">
      <BrowserRouter >
        <Nav auth={authState} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
