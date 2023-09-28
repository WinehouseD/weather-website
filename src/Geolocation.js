import React, { useState } from "react";
import axios from "axios";

const Geolocation = ({ onWeatherData }) => {
  const [loading, setLoading] = useState(false);

  const fetchWeatherByLocation = async () => {
    setLoading(true);

    const key = "59265a5cb4f663b8cf3898b2c0a2c2df";

    if (navigator.geolocation) {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (position && position.coords) {
                const { longitude, latitude } = position.coords;

                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
                const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

                const currentWeatherResponse = await axios.get(
                  currentWeatherUrl
                );
                const currentWeatherData = currentWeatherResponse.data;

                const hourlyForecastResponse = await axios.get(
                  hourlyForecastUrl
                );
                const hourlyForecastData = hourlyForecastResponse.data;

                onWeatherData(currentWeatherData, hourlyForecastData);
              } else {
                console.error("Geolocation data is missing.");
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
            }
          );
        } else {
          console.error("Geolocation permission denied.");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        className="geo_icon"
        src="icons/location.png"
        onClick={fetchWeatherByLocation}
        disabled={loading}
        alt="geo_icon"
        data-toggle="tooltip"
        title="Location"
      ></img>
    </div>
  );
};

export default Geolocation;
