// import React, { useEffect, useState } from "react";

// const GeocodingExample = () => {
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLongitude] = useState(null);
//     const [address, setAddress] = useState("Enter an address");

//     // useEffect(() => {
//     //     const geocodeAddress = async () => {
//     //         const encodedAddress = encodeURIComponent(address);
//     //         const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;

//     //         try {
//     //             const response = await fetch(apiUrl);
//     //             const data = await response.json();

//     //             if (data.length > 0) {
//     //                 const { lat, lon } = data[0];
//     //                 setLatitude(lat);
//     //                 setLongitude(lon);
//     //             }
//     //         } catch (error) {
//     //             console.error("Error geocoding address:", error);
//     //         }
//     //     };

//     //     geocodeAddress();
//     // }, [address]);

//     const handleAddressChange = (e) => {
//         setAddress(e.target.value);
//     };

//     return (
//         <div>
//             <input type="text" value={address} onChange={handleAddressChange} />
//             <p>Latitude: {latitude}</p>
//             <p>Longitude: {longitude}</p>
//         </div>
//     );
// };

// export default GeocodingExample;


import React, { useState } from 'react';
import axios from 'axios';

const GeocodingForm = () => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleGeocode = async () => {
        try {
            const response = await axios.get(
                `https://us1.locationiq.com/v1/search.php?key=pk.d8dedc86f19bc2a82a11faa671cb3ebc&q=${encodeURIComponent(
                    address
                )}&format=json`
            );
            const { lat, lon } = response.data[0];
            setCoordinates({ latitude: lat, longitude: lon });
        } catch (error) {
            console.error('Error geocoding address:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter an address"
            />
            <button onClick={handleGeocode}>Geocode</button>
            {coordinates && (
                <p>
                    Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
                </p>
            )}
        </div>
    );
};

export default GeocodingForm;
