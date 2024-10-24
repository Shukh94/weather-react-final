/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

function Weather({ defaultCity }) {
  const [city, setCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });

  useEffect(() => {
    search(); // Automatically search when the component is mounted
  }, []);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      feels: response.data.main.feels_like,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
    });
  }

  function search() {
    const apiKey = "7746bdeabca928cfedcad71e52fd9d66";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
              <a
          href="https://www.shakilashukla.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logo_2.png" className="logo" alt="ShakilaShukla Logo" />
        </a>
        <form onSubmit={handleSubmit}>
          <div className="row mt-3">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control search-input"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
        <footer>
          This project was coded by{" "}
          <a
            href="https://www.shakilashukla.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shakila Shukla
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/Shukh94/weather-react-app-final-p1"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://weather-app-master-1-shukla.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    return <div>Loading weather data...</div>;
  }
}

export default Weather;
