import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [state, setState] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeLocations = (loc) => (e) => {
    setState({ ...state, [loc]: e.target.value });
  };

  const getDataWeather = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await axios.post('http://ml.cakeplabs.com:1887/locations', {
        city: state.city,
        country: state.country,
      });

      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <p>Weather Information App 😎</p>
        <form style={{ width: '50%', marginBottom: '2em' }} onSubmit={getDataWeather}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em', textAlign: 'left' }}>
            <label htmlFor="city" style={{ width: '10rem', marginBottom: '.5em' }}>
              City
            </label>
            <label style={{ marginRight: '6px' }}>:</label>
            <input
              type="text"
              onChange={handleChangeLocations('city')}
              style={{ padding: '.5em 1em', borderRadius: '.5em', border: '1px solid #333' }}
            />
          </div>

          <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="country" style={{ width: '10rem' }}>
              Country
            </label>
            <label style={{ marginRight: '6px' }}>:</label>
            <input
              type="text"
              onChange={handleChangeLocations('country')}
              style={{ padding: '.5em 1em', borderRadius: '.5em', border: '1px solid #333' }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '2em',
              padding: '.5em 1em',
              fontSize: '1rem',
              backgroundColor: '#333',
              borderRadius: '.5em',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Get weather data!
          </button>
        </form>

        {!loading ? (
          data.length > 0 || data ? (
            <>
              <h3>Current Weather Information</h3>
              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>City </h6>
                <h6>: {data.name}</h6>
              </div>
              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Country</h6>
                <h6>: {data.sys.country}</h6>
              </div>
              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Weather</h6>
                <h6>: {data.weather[0].main}</h6>
              </div>
              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Description</h6>
                <h6>: {data.weather[0].description.replace(/(^|\s)[A-Za-zÀ-ÖØ-öø-ÿ]/g, (c) => c.toUpperCase())}</h6>
              </div>

              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Temperature</h6>
                <h6>: {Math.round(data.main.temp - 273.15)}℃</h6>
              </div>

              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Feels Like</h6>
                <h6>: {Math.round(data.main.feels_like - 273.15)}℃</h6>
              </div>

              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Humidity</h6>
                <h6>: {data.main.humidity}%</h6>
              </div>

              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Wind Speed</h6>
                <h6>: {data.wind.speed}</h6>
              </div>

              <div style={{ width: '50%', display: 'flex', textAlign: 'left' }}>
                <h6 style={{ width: '160px' }}>Wind Degree</h6>
                <h6>: {data.wind.deg}°</h6>
              </div>
            </>
          ) : (
            <div>Search for a city!</div>
          )
        ) : (
          <div>Wait a sec...</div>
        )}
      </header>
    </div>
  );
}

export default App;
