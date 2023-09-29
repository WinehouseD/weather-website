import { useState, useEffect } from "react";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary ";
import Loading from "./Loading";
import Search from "./Search/Search";
import Geolocation from "./Geolocation";
import CurrentWeather from "./currentWeather/CurrentWeather";
import HourlyForecast from "./hourlyForecast/HourlyForecast";
import { WEATHER_KEY, WEATHER_URL } from "./servises/api";
// import DailyForecast from "./dailyForecast/DailyForecast";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [town, setTown] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  const fetchCurrentWeather = () => {
    const url = `${WEATHER_URL}/weather?q=${town}&units=metric&appid=${WEATHER_KEY}`;

    axios
      .get(url)
      .then((response) => {
        setCurrentWeather(response.data);
        localStorage.setItem("currentWeather", JSON.stringify(response.data));
      })
      .catch((error) => console.log("Error:", error));
  };

  const fetchHourlyForecast = () => {
    const url2 = `${WEATHER_URL}/forecast?q=${town}&appid=${WEATHER_KEY}&units=metric`;

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
    setLoadingLocation(false);
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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <img className="logo" src="icons/logo.png" alt="logo"></img>
            <Search town={town} setTown={setTown} handleSearch={handleSearch} />
            <Geolocation onWeatherData={handleLocationWeather} />
            <HourlyForecast hourlyForecast={hourlyForecast} />
            <CurrentWeather currentWeather={currentWeather} />
            {/* <DailyForecast dailyForecast={hourlyForecast} /> */}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
