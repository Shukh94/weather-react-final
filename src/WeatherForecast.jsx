/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import AnimateIcon from "./AnimateIcon";

function WeatherForecast({ coordinates }) {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coordinates) {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const { lat, lon } = coordinates;
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      console.log("API URL:", apiUrl); 
      console.log("Coordinates:", coordinates); 

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("API Response:", response.data); 
          const dailyForecast = extractDailyForecast(response.data.list);
          setForecast(dailyForecast);
        })
        .catch((error) => {
          console.error("There was an error fetching the forecast data:", error); 
          setError(error);
        });
    }
  }, [coordinates]);

  function extractDailyForecast(data) {
    const dailyData = {};

    // Loop through each forecast entry (every 3 hours)
    data.forEach((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      const day = forecastDate.toLocaleDateString("en-US", { weekday: "short" });

      // Initialize the day's entry if it doesn't exist
      if (!dailyData[day]) {
        dailyData[day] = {
          maxTemp: forecast.main.temp,
          minTemp: forecast.main.temp,
          icon: forecast.weather[0].icon,
        };
      } else {
        // Update max and min temperatures for that day
        dailyData[day].maxTemp = Math.max(dailyData[day].maxTemp, forecast.main.temp);
        dailyData[day].minTemp = Math.min(dailyData[day].minTemp, forecast.main.temp);
      }
    });

    // Convert dailyData object to an array for easier rendering and return the first 7 days
    return Object.keys(dailyData).slice(0, 8).map((day) => ({
      day,
      maxTemp: dailyData[day].maxTemp,
      minTemp: dailyData[day].minTemp,
      icon: dailyData[day].icon,
    }));
  }

  if (error) {
    return <div>Error loading forecast: {error.message}</div>;
  }

  if (forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map((day, index) => (
            <div className="col" key={index}>
              <div className="WeatherForecast-day">
                {day.day}
              </div>
              <AnimateIcon code={day.icon} size={36} />
              <div className="WeatherForecast-temp">
                <span className="WeatherForecast-temp-max">
                  {Math.round(day.maxTemp)}°
                </span>
                <span className="WeatherForecast-temp-min">
                  {Math.round(day.minTemp)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading forecast...</div>;
  }
}

export default WeatherForecast;
