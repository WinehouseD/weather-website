import { useState, useEffect, useCallback } from "react";
import ErrorBoundary from "./ErrorBoundary ";
import Loading from "./components/loader/Loading";
import Search from "./components/Search/Search";
import Geolocation from "./Geolocation";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import HourlyForecast from "./components/hourlyForecast/HourlyForecast";
import DailyForecast from "./components/dailyForecast/DailyForecast";
import {
  fetchCurrentWeather,
  fetchHourlyForecast,
  fetchDailyForecast,
} from "./api/services";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [town, setTown] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

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

    const storedDailyForecast = JSON.parse(
      localStorage.getItem("dailyForecast")
    );
    if (storedDailyForecast) {
      setDailyForecast(storedDailyForecast);
    }
  }, []);

  const handleSearch = useCallback(() => {
    fetchCurrentWeather(town, setCurrentWeather);
    fetchHourlyForecast(town, setHourlyForecast);
    fetchDailyForecast(town, setDailyForecast);
    setTown("");
    setLoadingLocation(false);
  }, [town]);

  useEffect(() => {
    if (town === "") {
      const townName = JSON.parse(localStorage.getItem("currentWeather"))?.name;
      if (townName !== null && townName !== "" && townName !== undefined) {
        setTown(townName);
        setIsLoading(true);
      }
    }
  }, [town]);

  useEffect(() => {
    if (town !== "" && isLoading) {
      setIsLoading(false);
      localStorage.clear();
      handleSearch();
      setTown("");
    }
  }, [town, handleSearch, isLoading]);

  const handleLocationWeather = (currentData, hourlyData) => {
    setCurrentWeather(currentData);
    setHourlyForecast(hourlyData.list);
    localStorage.setItem("currentWeather", JSON.stringify(currentData));
    localStorage.setItem("hourlyForecast", JSON.stringify(hourlyData.list));
    const cityName = currentData.name;
    fetchDailyForecast(cityName);
  };

  useEffect(() => {
    if (loadingLocation) {
      Geolocation.getWeatherData(handleLocationWeather);
    }
  }, [loadingLocation]);

  const partOfDay = currentWeather?.current?.is_day;

  return (
    <ErrorBoundary>
      <div className={`app ${partOfDay === 0 ? "appNight" : "appDay"}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <img
              className="logo"
              src="icons/logo.svg"
              alt="logo"
            ></img>
            <Search town={town} setTown={setTown} handleSearch={handleSearch} />
            <Geolocation onWeatherData={handleLocationWeather} />
            {hourlyForecast.length > 0 && (
              <HourlyForecast hourlyForecast={hourlyForecast} />
            )}
              <CurrentWeather currentWeather={currentWeather} />
            <DailyForecast
              dailyForecast={dailyForecast}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
