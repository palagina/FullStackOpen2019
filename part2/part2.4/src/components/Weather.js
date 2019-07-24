import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {

const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=3615b66d494c44c0886111637190807&q=${capital}`
      )
      .then(response => {
        setWeather({
            temp:response.data.current.temp_c, 
            wind_kph:response.data.current.wind_kph,
            wind_dir:response.data.current.wind_dir,
            icon:response.data.current.condition.icon
        });
      });
  }, [capital]);

  return (
    <div>
      <div>
        <b>Weather in {capital}</b>
      </div>
      <div>Temperature: {weather.temp} Celsius</div>
      <img src={weather.icon} alt="weather"></img>
      <div>Wind: {weather.wind_kph} kph direction {weather.wind_dir}</div>
    </div>
  );
};

export default Weather;
