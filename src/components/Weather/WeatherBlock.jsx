import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/reducers';
import { useTranslation } from 'react-i18next';
import rain_sm from '../../assets/images/rain_sm.svg';
import suncloud from '../../assets/images/suncloud.svg';
import temp_sm from '../../assets/images/temp_sm.svg';
import wind_sm from '../../assets/images/wind_sm.svg';
import './sass/WeatherBlock.scss';

function WeatherBlock() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectWeatherData = (state) => state.weather.weatherData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchWeather()).then(() => setLoading(false));
  }, [dispatch]);

  const weatherData = useSelector(selectWeatherData);

  const updateData = () => {
    setLoading(true);
    dispatch(fetchWeather()).then(() => setLoading(false));
  };

  return (
    <div className="weather__block">
      <img src={suncloud} className="weather__image" alt="sun-cloud" />
      <h2 className="temperature--h2">
        {Math.round(weatherData?.main?.temp)}
        °
      </h2>
      <h4 className="temperature--h4">
        {t('precipitations')}
        {' '}
        <br />
        Max:
        {' '}
        {Math.round(weatherData?.main?.temp_max)}
        ° Min:
        {' '}
        {Math.round(weatherData?.main?.temp_min)}
        °
      </h4>
      <div className="humidity">
        <div className="humidity__option">
          <img src={rain_sm} alt="rain" />
          {Math.round(weatherData?.main?.humidity)}
        </div>
        <div className="humidity__option">
          <img src={temp_sm} alt="thermometer" />
          {Math.round(weatherData?.main?.feels_like)}
          °
        </div>
        <div className="humidity__option">
          <img src={wind_sm} alt="wind" />
          {Math.round(weatherData?.wind?.speed)}
        </div>
      </div>
      <button disabled={loading} onClick={updateData}>
        {loading ? 'Loading...' : 'Update'}
      </button>
    </div>
  );
}

export default WeatherBlock;
