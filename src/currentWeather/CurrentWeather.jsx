import React from "react";
import moment from "moment";
import "./CurrentWeather.css";

const CurrentWeather = ({ currentWeather }) => {
  if (!currentWeather) {
    return null;
  }

  const { main, weather, name, dt, wind, sys } = currentWeather;
  const temperature = main.temp.toFixed();
  const description = weather[0].main;
  const cityName = name;
  const countryName = sys.country;
  const date = moment.unix(dt).format("ddd Do (MMM)");
  const feelsLike = main.feels_like.toFixed();
  const humidity = main.humidity;
  const windSpeed = wind.speed.toFixed();

  return (
    <div className="container">
      <div className="header">
        <div className="city" data-toggle="tooltip" title={`City, Country`}>
          <p>
            {cityName}. {countryName}
          </p>
        </div>
      </div>
      <div className="temp" data-toggle="tooltip" title="Temperature">
        <h1>
          {temperature}
          <p>°С</p>
          <p>
            <img
              alt="icon"
              className="weather_icon"
              src={`icons/${weather[0].icon}.png`}
              data-toggle="tooltip"
              title="Description"
            />
          </p>
        </h1>
      </div>
      <div className="desc" data-toggle="tooltip" title="Description">
        <p>{description}</p>
      </div>
      <div className="additional-info">
        <div className="time" data-toggle="tooltip" title="Current date">
          <p className="bold">{date}</p>
        </div>
        <div className="feels" data-toggle="tooltip" title="Feels like">
          <p>{`L: ${feelsLike}°C`}</p>
        </div>
        <div className="humidity" data-toggle="tooltip" title="Humidity">
          <p>{`H: ${humidity}%`}</p>
        </div>
        <div className="wind" data-toggle="tooltip" title="Wind speed">
          <p>{`W: ${windSpeed} M/S`}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
