
import { useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherResponse } from '../types/WeatherResponse';
import { CityWeather } from './CityWeather';

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<{ loading: Boolean, data?: WeatherResponse[], error: Boolean }>({
    loading: false,
    data: undefined,
    error: false,
  });

  const search = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });

      //Rozdelenie inputu ciarkou pre 2 mesta
      const cities = query.split(',').map((city) => city.trim());

      const promises = cities.map((city) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const appid = 'f00c38e0279b7bc85480c3fe775d518c';
        const params = {
          q: city,
          units: 'metric',
          appid: appid,
        };

        return axios.get(url, { params })
     });
     Promise.all(promises)
        .then((responses) => {
          const weatherData = responses.map((res) => res.data);
          setWeather({ data: weatherData, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: undefined, error: true });
          setQuery('');
          console.log('error', error);
        });
 }
};

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={search}
        />
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <InfinitySpin width='100px' />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}> Sorry, City not found</span>
          </span>
        </>
      )}

{weather && weather.data && weather.data.length > 0 && (
        weather.data.map((cityData, index) => (
          <CityWeather
            key={index}
            name={cityData.name}
            country={cityData.sys.country}
            description={cityData.weather[0].description.toUpperCase()}
            icon={cityData.weather[0].icon}
            windSpeed={cityData.wind.speed}
            temp={Math.round(cityData.main.temp)}
          />
        ))
      )}
    </div>
  );
}

export default Weather;
