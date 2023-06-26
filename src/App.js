import './App.css';
import { useEffect } from "react";
import axios from "axios";
import CustomMap from './components/CustomMap';
import Buy from './containers/buying/Buy';

function App() {
	useEffect(() => {
		const handleApiCall = async () => {
			const { data } = await axios.get("/api/hello");
			console.log(data)
		}

		handleApiCall();
	}, []);

  return (
    <div className="App">
      {/* <h1>Hello to project</h1> */}
      <Buy />
      {/* <CustomMap /> */}
    </div>
  );
}

export default App;
