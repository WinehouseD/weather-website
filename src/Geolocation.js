import React, { useState } from "react";
import axios from "axios";
import { WEATHER_KEY, WEATHER_URL } from "./services/api";

const Geolocation = ({ onWeatherData }) => {
  const [loading, setLoading] = useState(false);

  const fetchWeatherByLocation = async () => {
    setLoading(true);

    if (navigator.geolocation) {
      try {
        const userPermission = window.confirm(
          "This app would like to use your location. Allow access?"
        );

        if (userPermission) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (position && position.coords) {
                const { longitude, latitude } = position.coords;

                const currentWeatherUrl = `${WEATHER_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_KEY}`;
                const hourlyForecastUrl = `${WEATHER_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_KEY}`;

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
              alert(
                "Please allow location access in your browser settings and try again."
              );
            }
          );
        } else {
          console.error("Geolocation permission denied by user.");
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
        src="icons/location.svg"
        onClick={fetchWeatherByLocation}
        disabled={loading}
        alt="geo_icon"
        data-toggle="tooltip"
        title="Click to get weather by location"
      ></img>
    </div>
  );
};

export default Geolocation;
