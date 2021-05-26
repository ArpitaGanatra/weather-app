import React from "react";
import "./cards.css";
const Cards = ({ day = "Today", img = "03d", temp }) => {
  return (
    <div className="weather_card">
      <div className="card_header">
        <p className="card_text value">{day}</p>
      </div>
      <div className="card_body">
        <div className="card_img">
          <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} />
        </div>
        <p className="card_text"> Temperature</p>
        <p className="card_text value">{temp}&#176;C</p>
      </div>
    </div>
  );
};

export default Cards;
