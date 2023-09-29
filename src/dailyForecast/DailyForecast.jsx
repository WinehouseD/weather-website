import React from "react";
import "./DailyForecast.css";

const DailyForecast = ({}) => {
  if (!hourlyForecast) {
    return null;
  }

  return (
    <div className="daily-forecast">
      <h1 className="titleDaily">5-Day Forecast</h1>
      <hr />
      {hourlyForecast.map((item, idx) => (
        <div className="dayFirst" key={idx}>
          <div className="name">{item.day}</div>
          <img
            className="iconDaily"
            src={`icons/${item.weatherIcon}.png`}
            alt="weather"
          />
          <div className="min">{item.minTemp}°C</div>
          <img className="min-max" src="icons/arrow.png" alt="min-max" />
          <div className="max">{item.maxTemp}°C</div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
