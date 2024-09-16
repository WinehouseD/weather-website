import { useState, useEffect, useCallback } from "react";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./ErrorBoundary ";
import Loading from "./components/loader/Loading";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import HourlyForecast from "./components/hourlyForecast/HourlyForecast";
import DailyForecast from "./components/dailyForecast/DailyForecast";
import {
  fetchCurrentWeather,
  fetchHourlyForecast,
  fetchDailyForecast,
} from "./api/services";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [town, setTown] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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

  const handleSearch = useCallback((selectedTown) => {
    fetchCurrentWeather(selectedTown, setCurrentWeather);
    fetchHourlyForecast(selectedTown, setHourlyForecast);
    fetchDailyForecast(selectedTown, setDailyForecast);
    setTown("");
  }, []);

  useEffect(() => {
    if (town === "") {
      const townName = JSON.parse(localStorage.getItem("currentWeather"))?.additionalWeather.name;
      if (townName !== null && townName !== "" && townName !== undefined) {
        setTown(townName);
        setIsLoading(true);
      }
    }
  }, []);

  useEffect(() => {
    if (town !== "" && isLoading) {
      setIsLoading(false);
      handleSearch(town);
    }
  }, [town, handleSearch, isLoading]);

  const partOfDay = currentWeather?.currentWeather?.current?.is_day;

  return (
    <ErrorBoundary>
      <div className={`app ${partOfDay === 0 ? "appNight" : "appDay"}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
              <ToastContainer
               position="top-center"
               autoClose={1500}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="dark"
               />
            <img
              className="logo"
              src="icons/logo.svg"
              alt="logo"
              loading="lazy"
              />
            <Search town={town} setTown={setTown} handleSearch={handleSearch} />
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