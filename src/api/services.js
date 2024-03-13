import axios from "axios";

export const fetchCurrentWeather = (town, setCurrentWeather) => {
  const url = `${process.env.REACT_APP_WEATHER_URL}/weather?q=${town}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;

  axios
    .get(url)
    .then((response) => {
      setCurrentWeather(response.data);
      localStorage.setItem("currentWeather", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("Error:", error);
      alert("The entered city does not exist.");
    });
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
