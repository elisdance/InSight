import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import rain_sm from '../../assets/images/rain_sm.svg';
import suncloud from '../../assets/images/suncloud.svg';
import temp_sm from '../../assets/images/temp_sm.svg';
import wind_sm from '../../assets/images/wind_sm.svg';
import { setWeatherData, setError } from '../../store/actions';
import './sass/WeatherBlock.scss';

function WeatherBlock() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoaded, isError, weatherData } = useSelector((state) => state.weather);

  useEffect(() => {
    const getCurrentCity = async () => {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = 'af5b4d017098884e3f779e32003418fe';
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
          if (!response.ok) {
            dispatch(setError());
            return;
          }
          const data = await response.json();
          dispatch(setWeatherData(data));
        } catch (error) {
          dispatch(setError());
        }
      });
    };
    getCurrentCity();
  }, [dispatch]);

  const imageLoad = () => {
    console.log('Image loaded successfully');
    dispatch(setWeatherData({ ...weatherData, isLoaded: true }));
  };

  if (isError) {
    return <div className="weather__block"><iframe src="https://giphy.com/embed/KJvOSHdFkoacp5qkg8" width="350" height="350" frameBorder="0" className="giphy-embed" allowFullScreen /></div>;
  }

  if (!isLoaded) {
    return <div className="weather__block"><iframe src="https://giphy.com/embed/QKUx6kHItu3ilaVMdn" width="350" frameBorder="0" className="giphy-embed" allowFullScreen /></div>;
  }

  const { temperature, temp_min, temp_max, feels_like, humidity, windSpeed } = weatherData;

  return (
    <div className="weather__block">
      <img src={suncloud} className="weather__image" alt="sun-cloud" onLoad={imageLoad} />
      <h2 className="temperature--h2">
        {temperature}
        °
      </h2>
      <h4 className="temperature--h4">
        {t('precipitations')}
        {' '}
        <br />
        Max:
        {' '}
        {temp_max}
        ° Min:
        {' '}
        {temp_min}
        °
      </h4>
      <div className="humidity">
        <div className="humidity__option">
          <img src={rain_sm} alt="rain" />
          {humidity}
        </div>
        <div className="humidity__option">
          <img src={temp_sm} alt="thermometer" />
          {feels_like}
          °
        </div>
        <div className="humidity__option">
          <img src={wind_sm} alt="wind" />
          {windSpeed}
        </div>
      </div>
    </div>
  );
}

export default WeatherBlock
