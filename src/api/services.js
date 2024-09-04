import axios from 'axios';

export const fetchCurrentWeather = async (town, setCurrentWeather) => {
  const currentWeatherUrl = `${process.env.REACT_APP_CURRENT_WEATHER_URL}/current.json?key=${process.env.REACT_APP_CURRENT_WEATHER_KEY}&q=${town}&aqi=yes`;
  const additionalWeatherUrl  = `${process.env.REACT_APP_WEATHER_URL}/weather?q=${town}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;

  try {
    const [currentWeatherResponse, additionalWeatherResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(additionalWeatherUrl)
    ]);

    const combinedData = {
      currentWeather: currentWeatherResponse.data,
      additionalWeather: additionalWeatherResponse.data,
    };

    setCurrentWeather(combinedData);
    localStorage.setItem("currentWeather", JSON.stringify(combinedData));
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("The entered city does not exist or there was an error fetching the data.");
  }
};

export const fetchHourlyForecast = (town, setHourlyForecast) => {
  const url3 = `${process.env.REACT_APP_WEATHER_URL}/forecast?q=${town}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric&lang=en`;

  axios
    .get(url3)
    .then((response) => {
      setHourlyForecast(response.data.list);
      localStorage.setItem(
        "hourlyForecast",
        JSON.stringify(response.data.list)
      );
    })
    .catch((error) => console.error("Error:", error));
};

export const fetchDailyForecast = (town, setDailyForecast) => {
  const url2 = `${process.env.REACT_APP_WEATHER_URL}/forecast?q=${town}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`;
  axios
    .get(url2)
    .then((response) => {
      const dailyData = response.data.list.filter(
        (item, index) => index % 8 === 0
      );
      setDailyForecast(dailyData);
      localStorage.setItem("dailyForecast", JSON.stringify(dailyData));
    })
    .catch((error) => console.error("Error:", error));
};
