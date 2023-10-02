import React from "react";
import "./DailyForecast.css";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DailyForecast = ({ dailyForecast, selectedDay, setSelectedDay }) => {
  if (!dailyForecast || dailyForecast.length < 5) {
    return null;
  }

  const todayIndex = new Date().getDay();
  const tomorrowIndex = (todayIndex + 0) % 7;

  const formatDay = (date) => {
    const options = { day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const openPopup = (dayData) => {
    setSelectedDay(dayData);
  };

  const closePopup = () => {
    setSelectedDay(null);
  };

  return (
    <div className="daily-forecast">
      <h1 className="titleDaily">5-Day Forecast</h1>
      <hr />
      {dailyForecast.slice(0, 6).map((item, idx) => {
        const forecastDayIndex = (tomorrowIndex + idx) % WEEK_DAYS.length;
        const forecastDay = WEEK_DAYS[forecastDayIndex];
        const dayName = idx === 0 ? "Today" : forecastDay;
        const dayOfMonth = idx === 0 ? "" : formatDay(item.dt * 1000);

        return (
          <div
            className="forecastDaily"
            key={idx}
            onClick={() => openPopup(item)} // Open pop-up when the day element is clicked
          >
            <div className="name">
              {dayName} {dayOfMonth}
            </div>
            <img
              className="iconDaily"
              src={`icons/${item.weather[0].icon}.png`}
              alt="weather"
            />
            <div className="temps">
              {Math.round(item.main.temp)}
              <span>°C</span>
            </div>
            <div className="precipitation">
              <img
                className="precip"
                src="icons/water-drop.png"
                alt="water-drop"
              />
              {item.rain ? item.rain["3h"] : 0} mm
            </div>
          </div>
        );
      })}
      {selectedDay && (
        <div className="popup">
          <div className="popup-content">
            <img
              className="closeBtn"
              src="icons/close-button.png"
              alt="close"
              onClick={closePopup}
            />
            <div className="main-title">Day Details</div>
            <hr />
            <div className="fl">
              <p>
                Feels like: {selectedDay.main.feels_like.toFixed()}
                <span>°C</span>
              </p>
            </div>
            <div className="hum">
              <p>Humidity: {selectedDay.main.humidity}%</p>
            </div>
            <div className="ws">
              <p>Wind speed: {selectedDay.wind.speed.toFixed()} m/s</p>
            </div>
            <div className="pres">
              <p>Pressure: {selectedDay.main.pressure.toFixed()} mb</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
