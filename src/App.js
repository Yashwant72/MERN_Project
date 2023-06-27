import './App.css';
import { useEffect } from "react";
import axios from "axios";
import CustomMap from './components/CustomMap';
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Nav from './components/NavBar/Nav';
import Buy from './containers/buying/Buy';
import Landing from './components/LandingPage/Landing';
import Dashboard from './components/Dashboard/Dashboard';


import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {
	useEffect(() => {
		const handleApiCall = async () => {
			const { data } = await axios.get("/api/hello");
			console.log(data)
		}

		handleApiCall();
	}, []);
  
  const [authState,setAuthState] =  useState(false);
  return (
      
    <div className="App">
      <BrowserRouter >
      <Nav auth={authState} />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/buy" element={<Buy/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
