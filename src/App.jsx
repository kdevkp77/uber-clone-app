import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

function App() {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const calculateRoute = async () => {
    if (!originRef.current.value || !destinationRef.current.value) return;

    const directionsService = new window.google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
    setDistance(results.routes[0].legs[0].distance.text);
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <Autocomplete>
            <input
              type='text'
              placeholder='Pickup Location'
              ref={originRef}
              className='input'
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type='text'
              placeholder='Destination'
              ref={destinationRef}
              className='input'
            />
          </Autocomplete>
          <button onClick={calculateRoute} className='btn'>
            Calculate
          </button>
        </div>

        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      {distance && <div className='info'>Distance: {distance}</div>}
    </div>
  );
}

export default App;
