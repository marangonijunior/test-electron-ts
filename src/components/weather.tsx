import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import WeatherAPI from "../services/weather";

export interface FindWeatherProps {
  latlng: {
    lat: Number;
    lng: Number;
  };
}

const WeatherComponent = (props: FindWeatherProps) => {
  const { latlng } = props;

  const [errorWeather, setErrorWeather] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (latlng) {
      setLoading(true);
      WeatherAPI.searchWeather(latlng).then((item) => {
        setLoading(false);
        if (item.main) {
          setWeather(item);
          setErrorWeather(false);
          setError("");
        } else {
          setErrorWeather(true);
          setError("Not was possible get the information from weather.");
        }
      });
    }
  }, [latlng]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div id="#textWeather">
          <div>{weather?.name}</div>
          <div>Temp: {weather?.main.temp}</div>
          <div>Feels like: {weather?.main.feels_like}</div>
          <div>Humidity: {weather?.main.humidity}</div>
        </div>
      )}
      {errorWeather && (
        <Alert severity="warning" color="info">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default WeatherComponent;
