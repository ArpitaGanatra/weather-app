import React, { useState } from "react";
import moment from "moment";
import "./main.css";
import { getLatLong, getForecast } from "../api/apicall";
import Chart from "./Chart";
import Cards from "./Cards";

const Main = () => {
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState({
    date_value: "",
    temperature: "",
    description: "",
    humidity: "",
    sunrise: "",
    sunset: "",
    windSpeed: "",
    imgCode: "",
    forecastData: [],
    dailyWeathers: [],
  });

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const getCoordinates = () => {
    getLatLong(location).then((res) => {
      console.log(res);
      console.log(res.coord);
      const lon = res.coord.lon;
      const lat = res.coord.lat;
      console.log(lon, lat);
      loadForecast(lon, lat);
    });
  };

  const loadForecast = (lon, lat) => {
    getForecast(lon, lat).then((res) => {
      console.log("new", res);
      setInfo({
        ...info,
        date_value: res.data.current.dt,
        temperature: res.data.current.temp,
        description: res.data.current.weather[0].description,
        windSpeed: res.data.current.wind_speed,
        humidity: res.data.current.humidity,
        sunrise: moment.unix(res.data.current.sunrise).format("h:mm A"),
        sunset: moment.unix(res.data.current.sunset).format("h:mm A"),
        imgCode: res.data.current.weather[0].icon,
        labels: res.data.daily.map((date) => {
          return moment.unix(date.dt).format("MMMM Do");
        }),
        forecastData: res.data.daily.map((daily_temp) => {
          return daily_temp.temp.day;
        }),
        dailyWeathers: res.data.daily.slice(1, 6),
      });
      console.log(setInfo.humidity);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCoordinates();
  };
  return (
    <div className="main">
      <div className="left_container">
        <form onSubmit={handleSubmit}>
          <div className="input_grp">
            <input
              type="text"
              placeholder="Your City"
              name="location"
              value={location}
              onChange={handleChange}
            ></input>
            <button type="submit">Search</button>
          </div>
        </form>

        <div className="date_and_time">
          <b>{location}: </b>
          {info.date_value
            ? moment.unix(info.date_value).format("MMMM Do YYYY, h:mm:ss A")
            : "00:00 AM"}
        </div>
        <div className="temperature">
          <div className="temp_container">
            <img
              src={
                info.imgCode
                  ? `http://openweathermap.org/img/wn/${info.imgCode}@2x.png`
                  : "http://openweathermap.org/img/wn/03d@2x.png"
              }
            ></img>
          </div>
          <div className="temp_info">
            <h1 className="temp_value">
              {info.temperature ? info.temperature : "--"}&#176;C
            </h1>
            <hr></hr>
            <p className="weather">
              {info.description ? info.description : "----"}
            </p>
          </div>
          <div className="temp_desc">
            <div className="humidity">
              <p>Humidity</p>
              <p className="value">{info.humidity ? info.humidity : "-"}%</p>
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              <p className="value">
                {info.windSpeed ? info.windSpeed : "-"} m/s
              </p>
            </div>
          </div>
          <div className="temp_desc">
            <div className="humidity">
              <p>Sunrise</p>
              <p className="value">{info.sunrise ? info.sunrise : "-"}</p>
            </div>
            <div className="wind">
              <p>Sunset</p>
              <p className="value">{info.sunset ? info.sunset : "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right_container">
        <Chart temp={info.forecastData} labels={info.labels} />
        <div className="card_container">
          {info.dailyWeathers.length > 0
            ? info.dailyWeathers.map((d, index) => (
                <Cards
                  className="individual_cards"
                  key={index}
                  day={moment.unix(d.dt).format("MMMM Do")}
                  img={d.weather[0].icon}
                  temp={d.temp.day}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Main;
