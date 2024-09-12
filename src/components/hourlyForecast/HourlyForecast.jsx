import React from "react";
import dayjs from 'dayjs';
import "./HourlyForecast.scss";

const HourlyForecast = ({ hourlyForecast }) => {
  if (!hourlyForecast) {
    return null;
  }

  return (
    <div className="hourly-forecast">
      <h1 className="title-hour">Hourly Forecast</h1>
      <hr />
      <div className="info">
        {Array.isArray(hourlyForecast) &&
          hourlyForecast
            .filter((data, index) => index < 6)
            .map((data) => (
              <div key={data.dt}>
                <div className="hour" data-toggle="tooltip" title={"Time"}>
                  {dayjs.unix(data.dt).format("HH:mm")}
                </div>
                <img
                  alt="icon"
                  className="icon-hourly"
                  src={`icons/${data.weather[0].icon}.svg`}
                  data-toggle="tooltip"
                  title={data.weather[0].description}
                  loading="lazy"
                />
                <div
                  className="temperature"
                  data-toggle="tooltip"
                  title={"Temperature"}
                >
                  {data.main.temp.toFixed()}
                  <span>°C</span>
                </div>
                <div
                  className="precipitation"
                  data-toggle="tooltip"
                  title={"Precipitation"}
                >
                  <img
                    className="water-drop"
                    src="icons/water-drop.svg"
                    alt="water-drop"
                    loading="lazy"
                  ></img>
                  <div>
                    {data.pop === 0 || data.pop === 1
                      ? "0%"
                      : data.pop.toFixed(2).split(".")[1] + "%"}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
