import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(() => {
    const localValue = localStorage.getItem("result");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [town, setTown] = useState("");

  // const key = "59265a5cb4f663b8cf3898b2c0a2c2df";
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&exclude=hourly, daily&appid=${key}`;

  const url = `api.openweathermap.org/data/2.5/forecast?q=london&appid=59265a5cb4f663b8cf3898b2c0a2c2df`;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  const searchWeather = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setTown("");
    }
  };

  useEffect(() => {
    localStorage.setItem("result", JSON.stringify(data));
  }, [data]);

  return (
    <div className="app">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={(event) => setTown(event.target.value)}
          placeholder="Enter location"
          onKeyDown={searchWeather}
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>
              {data.main.temp.toFixed()}
              <h5>°C</h5>
              <img className="weather_icon" src="icons/rain.png" alt="icon" />
            </h1>
          ) : null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      {data.name !== undefined && (
        <div className="footer">
          <div className="time">
            <p className="bold">
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="feels">
            {data.main ? (
              <p className="bold">
                {"L:" + `${data.main.feels_like.toFixed()} ` + "°C "}
              </p>
            ) : null}
          </div>
          <div className="humidity">
            {data.main ? (
              <p className="bold">{"H:" + `${data.main.humidity}` + "%"}</p>
            ) : null}
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">
                {"W:" + `${data.wind.speed.toFixed()} ` + "M/C"}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
