import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  console.log("location=>", location);

  const apiKey = process.env.REACT_APP_API_KEY
  console.log(apiKey);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

  const searchLocation = async (event) => {
    console.log("Event triggered:", event);  
    if (event.key === 'Enter' && location) {
      console.log("Enter key pressed with location:", location);  
      try {
        const response = await axios.get(url);
        console.log("API response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the weather data:", error);  
      }
      setLocation('');
    }
  };

  return (
    <div>
      <div className="app">
        <div className='search'>
          <input
            type='text'
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder='Enter Location'
          />
        </div>
        <div className='container'>
          <div className='top'>
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className='temp'>
              {data.main ? <h1>{((data.main.temp - 32) * 5 / 9).toFixed(2)}°C</h1> : null}
            </div>
            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>


          {data.name !== undefined &&
            <div className='bottom'>
              <div className='feels'>
                {data.main ? <p className='bold'>{data.main.feels_like}°F</p> : null}
                <img src='./assets/thermometer (1).svg' height={"60px"} width={"70px"}/>
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <img src='./assets/humidity (2).png' height={"60px"} width={"60px"} />
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
                <img src='./assets/wind (1).png'  height={"63px"} width={"60px"}/>
                <p>Wind Speed</p>
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default App
