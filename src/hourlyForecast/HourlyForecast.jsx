import React from "react";
import moment from "moment";
import "./HourlyForecast.css";

const HourlyForecast = ({ hourlyForecast }) => {
  return (
    <div className="hourly-forecast">
      <h1 className="titleHour">Hourly Forecast</h1>
      <hr />
      <div className="info">
        {Array.isArray(hourlyForecast) &&
          hourlyForecast
            .filter((data, index) => index < 6)
            .map((data) => (
              <div key={data.dt}>
                <div className="hour" data-toggle="tooltip" title={"Time"}>
                  {moment.unix(data.dt).format("HH:mm")}
                </div>
                <img
                  alt="icon"
                  className="iconHourly"
                  src={`icons/${data.weather[0].icon}.png`}
                  data-toggle="tooltip"
                  title={data.weather[0].description}
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
                    className="waterDrop"
                    src="icons/water-drop.png"
                    alt="water-drop"
                  ></img>
                  <div>
                    {data.pop === 0
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
