import { useState, useEffect } from "react";
import { WEATHER_KEY, WEATHER_URL } from "./servises/api";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary ";
import Loading from "./Loading";
import Search from "./Search/Search";
import Geolocation from "./Geolocation";
import CurrentWeather from "./currentWeather/CurrentWeather";
import HourlyForecast from "./hourlyForecast/HourlyForecast";
import DailyForecast from "./dailyForecast/DailyForecast";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [town, setTown] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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

  const fetchDailyForecast = (town) => {
    const url3 = `${WEATHER_URL}/forecast?q=${town}&appid=${WEATHER_KEY}&units=metric`;

    axios
      .get(url3)
      .then((response) => {
        const dailyData = response.data.list.filter(
          (item, index) => index % 8 === 0
        );
        setDailyForecast(dailyData);
        localStorage.setItem("dailyForecast", JSON.stringify(dailyData));
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

    const storedDailyForecast = JSON.parse(
      localStorage.getItem("dailyForecast")
    );
    if (storedDailyForecast) {
      setDailyForecast(storedDailyForecast);
    }
  }, []);

  const handleSearch = () => {
    fetchCurrentWeather();
    fetchHourlyForecast();
    fetchDailyForecast(town);
    setTown("");
    setLoadingLocation(false);
  };

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

  return (
    <ErrorBoundary>
      <div className="app">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <img className="logo" src="icons/logo.svg" alt="logo"></img>
            <Search town={town} setTown={setTown} handleSearch={handleSearch} />
            <Geolocation onWeatherData={handleLocationWeather} />
            <HourlyForecast hourlyForecast={hourlyForecast} />
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
