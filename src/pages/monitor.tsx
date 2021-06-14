import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

import PostCodeComponent from "../components/postcode";
import WeatherComponent from "../components/weather";

import { ipcRenderer } from "electron";

export const Monitor = () => {
  const [weather, setWeather] =
    useState<{
      lat: Number;
      lng: Number;
    }>(null);

  const [cpu, setCPU] = useState(null);

  ipcRenderer.on("asynchronous-reply", (event, arg) => {
    setCPU(arg);
  });

  useEffect(() => {
    ipcRenderer.send("asynchronous-cpu", "cpu");
  }, []);

  return (
    <div className="screens">
      <div className="screenn-page-left">
        <div className="screenn-item-left">
          <Typography variant="h5" gutterBottom>
            CPU Info.
          </Typography>
          {cpu && (
            <div>
              <div>{cpu?.manufacturer}</div>
              <div>{cpu?.brand}</div>
              <div>Speed: {cpu?.speed}</div>
              <div>PhysicalCores: {cpu?.physicalCores}</div>
            </div>
          )}
        </div>
      </div>
      <div className="screenn-page-right">
        <div>
          <Typography variant="h5" gutterBottom>
            Weather ;)
          </Typography>
          {weather ? (
            <WeatherComponent latlng={weather} />
          ) : (
            <PostCodeComponent
              updateLatLng={(value: any) => {
                setWeather(value);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
