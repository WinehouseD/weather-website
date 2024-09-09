import React from "react";
import "./CurrentWeather.scss";
import AirQuality from "../AirQuality";
import dayjs from 'dayjs'

const utc = require('dayjs/plugin/utc');
const localizedFormat = require('dayjs/plugin/localizedFormat');

const CurrentWeather = ({ currentWeather }) => {
  if (!currentWeather) {
      return null;
    } 
    
  const {currentWeather: currentData, additionalWeather} = currentWeather;
  const { current } = currentData;
    const ultraviolet = current.uv;

  const { main, weather, name, dt, sys } = additionalWeather;
    const temperature = main.temp.toFixed();
    const description = weather[0].main;
    const cityName = name;
    const countryName = sys.country;
  
  dayjs.extend(utc);
  dayjs.extend(localizedFormat);
  
  const date = dayjs.unix(dt).format("ddd DD (MMM)");
  const sunriseTime = dayjs.unix(sys.sunrise).format("HH:mm");
  const sunsetTime = dayjs.unix(sys.sunset).format("HH:mm");

  return (
    <div className="current-weather">
      <div className="header">
        <div className="city" data-toggle="tooltip" title={`City, Country`}>
          <p>
            {cityName}, {countryName}
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
              src={`icons/${additionalWeather.weather[0].icon}.svg`}
              data-toggle="tooltip"
              title="Description"
              loading="lazy"
            />
          </p>
        </h1>
      </div>
      <div className="desc" data-toggle="tooltip" title="Description">
        <p>{description}</p>
      </div>
      <div className="additional-info">
        <div className="time" data-toggle="tooltip" title="Current date">
          <p>{date}</p>
        </div>
        <div className="sunrise" data-toggle="tooltip" title="Sunrise">
          <img
            className="sunIcon"
            src="icons/sunrise.svg"
            alt="sunrise"
            loading="lazy"
          />
          <p>{sunriseTime}</p>
        </div>
        <div className="sunset" data-toggle="tooltip" title="Sunset">
          <img
            className="sunIcon"
            src="icons/sunset.svg"
            alt="sunset"
            loading="lazy"
          />
          <p>{sunsetTime}</p>
        </div>
      </div>
        <div className="ultraviolet" data-togle="tooltip" title="Ultraviolet">
        <img
              alt="icon"
              className="uv"
              src={`icons/uv.svg`}
              data-toggle="tooltip"
              title="Ultraviolet"
              loading="lazy"
            />
          <p>{ultraviolet}</p>
          <div className="airQuality">
          <img
              alt="icon"
              className="aqi"
              src={`icons/aqi.svg`}
              data-toggle="tooltip"
              title="Air Quality"
              loading="lazy"
              />
              <AirQuality currentWeather={currentWeather} />
          </div>
        </div>
    </div>
  );
};

export default CurrentWeather;
