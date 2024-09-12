import React from "react";
import "./DailyForecast.scss";

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
      <h1 className="title-daily">5-Day Forecast</h1>
      <hr />
      {dailyForecast.slice(0, 6).map((item, idx) => {
        const forecastDayIndex = (tomorrowIndex + idx) % WEEK_DAYS.length;
        const forecastDay = WEEK_DAYS[forecastDayIndex];
        const dayName = idx === 0 ? "Today" : forecastDay;
        const dayOfMonth = idx === 0 ? "" : formatDay(item.dt * 1000);

        return (
          <div
            className="forecast-daily"
            key={idx}
            onClick={() => openPopup(item)}
          >
            <div className="name">
              {dayName} {dayOfMonth}
            </div>
            <img
              className="icon-daily"
              src={`icons/${item.weather[0].icon}.svg`}
              alt="weather"
              data-toggle="tooltip"
              title={item.weather[0].description}
              loading="lazy"
            />
            <div className="temps" data-toggle="tooltip" title="Temperature">
              {Math.round(item.main.temp)}
              <span>°C</span>
            </div>
            <img
              className="detailsIcon"
              src="icons/details.svg"
              alt="details"
              loading="lazy"
            />
          </div>
        );
      })}
      {selectedDay && (
        <div className="popup">
          <div className="popup-content">
            <img
              data-toggle="tooltip"
              title="Close"
              className="close-btn"
              src="icons/close-button.svg"
              alt="close"
              onClick={closePopup}
              loading="lazy"
            />
            <div className="main-title">Day Details</div>
            <hr />
            <div className="add-info">
              <div className="fl" data-toggle="tooltip" title="Feels like">
                <img
                  className="details-icon"
                  src="icons/thermometer.svg"
                  alt="thermometer"
                  loading="lazy"
                />
                <h5>Feels like</h5>
                <p>
                  {selectedDay.main.feels_like.toFixed()}
                  <span>°C</span>
                </p>
              </div>
              <div className="hum" data-toggle="tooltip" title="Humidity">
                <img
                  className="details-icon"
                  src="icons/humidity.svg"
                  alt="humidity"
                  loading="lazy"
                />
                <h5>Humidity</h5>
                <p>{selectedDay.main.humidity}%</p>
              </div>
              <div className="ws" data-toggle="tooltip" title="Wind speed">
                <img
                  className="details-icon"
                  src="icons/wind.svg"
                  alt="wind"
                  loading="lazy"
                />
                <h5>Wind speed</h5>
                <p>{selectedDay.wind.speed.toFixed()} m/s</p>
              </div>
              <div className="pres" data-toggle="tooltip" title="Pressure">
                <img
                  className="details-icon"
                  src="icons/meter.svg"
                  alt="meter"
                  loading="lazy"
                />
                <h5>Pressure</h5>
                <p>{selectedDay.main.pressure.toFixed()} mb</p>
              </div>
              <div className="prec" data-toggle="tooltip" title="Precipitation">
                <img
                  className="details-icon"
                  src="icons/water-drop.svg"
                  alt="water-drop"
                  loading="lazy"
                />
                <h5>Precipitation</h5>
                <p> {selectedDay.rain ? selectedDay.rain["3h"] : 0} mm</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
