import React from "react";
import moment from "moment";
import "./CurrentWeather.scss";

const CurrentWeather = ({ currentWeather }) => {
  if (!currentWeather) {
    return null;
  }

  const { main, weather, name, dt, sys } = currentWeather;
  const temperature = main.temp.toFixed();
  const description = weather[0].main;
  const cityName = name;
  const countryName = sys.country;
  const date = moment.unix(dt).format("ddd Do (MMM)");

  const sunriseTime = moment.unix(sys.sunrise).format("HH:mm");
  const sunsetTime = moment.unix(sys.sunset).format("HH:mm");

  return (
    <div className="container">
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
              src={`icons/${weather[0].icon}.svg`}
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
          <p>{date}</p>
        </div>
        <div className="sunrise" data-toggle="tooltip" title="Sunrise">
          <img className="sunIcon" src="icons/sunrise.svg" alt="sunrise" />
          <p>{sunriseTime}</p>
        </div>
        <div className="sunset" data-toggle="tooltip" title="Sunset">
          <img className="sunIcon" src="icons/sunset.svg" alt="sunset" />
          <p>{sunsetTime}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
