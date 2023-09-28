import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search/Search";
import Geolocation from "./Geolocation";
import CurrentWeather from "./currentWeather/CurrentWeather";
import HourlyForecast from "./hourlyForecast/HourlyForecast";
import ErrorBoundary from "./ErrorBoundary ";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [town, setTown] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const key = "59265a5cb4f663b8cf3898b2c0a2c2df";

  const fetchCurrentWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

    axios
      .get(url)
      .then((response) => {
        setCurrentWeather(response.data);
        localStorage.setItem("currentWeather", JSON.stringify(response.data));
      })
      .catch((error) => console.log("Error:", error));
  };

  const fetchHourlyForecast = () => {
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=${key}&units=metric`;

    axios
      .get(url2)
      .then((response) => {
        setHourlyForecast(response.data.list);
        localStorage.setItem(
          "hourlyForecast",
          JSON.stringify(response.data.list)
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    const storedCurrentWeather = JSON.parse(
      localStorage.getItem("currentWeather")
    );
    if (storedCurrentWeather) {
      setCurrentWeather(storedCurrentWeather);
    }

    const storedHourlyForecast = JSON.parse(
      localStorage.getItem("hourlyForecast")
    );
    if (storedHourlyForecast) {
      setHourlyForecast(storedHourlyForecast);
    }
  }, []);

  const handleSearch = () => {
    fetchCurrentWeather();
    fetchHourlyForecast();
    setTown("");
  };

  const handleLocationWeather = (currentData, hourlyData) => {
    setCurrentWeather(currentData);
    setHourlyForecast(hourlyData.list);
    localStorage.setItem("currentWeather", JSON.stringify(currentData));
    localStorage.setItem("hourlyForecast", JSON.stringify(hourlyData.list));
  };

  useEffect(() => {
    if (loadingLocation) {
      Geolocation.getWeatherData(handleLocationWeather);
    }
  }, [loadingLocation]);

  useEffect(() => {
    const storedCurrentWeather = JSON.parse(
      localStorage.getItem("currentWeather")
    );
    if (storedCurrentWeather) {
      setCurrentWeather(storedCurrentWeather);
    }

    const storedHourlyForecast = JSON.parse(
      localStorage.getItem("hourlyForecast")
    );
    if (storedHourlyForecast) {
      setHourlyForecast(storedHourlyForecast);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <Search town={town} setTown={setTown} handleSearch={handleSearch} />
        <Geolocation onWeatherData={handleLocationWeather} />
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <CurrentWeather currentWeather={currentWeather} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
