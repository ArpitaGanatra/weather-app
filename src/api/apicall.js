import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const apiKey = process.env.REACT_APP_API_KEY;

export const getLatLong = (location) => {
  return axios
    .get(`${baseUrl}/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getForecast = (lon, lat) => {
  return axios.get(
    `${baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
  );
};
