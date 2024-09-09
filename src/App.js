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

  const handleSearch = useCallback(() => {
    fetchCurrentWeather(town, setCurrentWeather);
    fetchHourlyForecast(town, setHourlyForecast);
    fetchDailyForecast(town, setDailyForecast);
    setTown("");
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

  const partOfDay = currentWeather?.currentWeather?.current?.is_day;

  return (
    <ErrorBoundary>
      <div className={`app ${partOfDay === 1 ? "appDay" : "appNight"}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
              <ToastContainer
               position="top-center"
               autoClose={2000}
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
