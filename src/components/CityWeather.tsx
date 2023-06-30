import React, { FunctionComponent } from 'react';
import { toDate } from './tools';
import { CityWeatherProps } from '../types/CityWeather';

export const CityWeather: FunctionComponent<CityWeatherProps> = ({ name, country, description, icon, windSpeed, temp }) => (
<div>
    <div className="city-name">
      <h2>
        {name}, <span>{country}</span>
      </h2>
    </div>
    <div className="date">
            <span>{toDate()}</span>
    </div>
    <div className="icon-temp">
      <img
        className=""
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      {temp}
      <sup className="deg">&deg;C</sup>
    </div>
    <div className="des-wind">
      <p>{description}</p>
      <p>Wind Speed: {windSpeed}m/s</p>
    </div>
  </div>
);
