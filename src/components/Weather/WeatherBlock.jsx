import React, { useState, useEffect } from 'react';
import rain_sm from '../../assets/images/rain_sm.svg';
import suncloud from '../../assets/images/suncloud.svg';
import temp_sm from '../../assets/images/temp_sm.svg';
import wind_sm from '../../assets/images/wind_sm.svg';
import './sass/WeatherBlock.scss';

const WeatherBlock = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [temp_min, setTempMin] = useState('');
  const [temp_max, setTempMax] = useState('');
  const [feels_like, setFeelsLike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');

  useEffect(() => {
    const getCurrentCity = async () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = 'af5b4d017098884e3f779e32003418fe'; 
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
          if (!response.ok) {
            setIsError(true);
            return;
          }
          const data = await response.json();
          setWeatherData(data);
          setIsLoaded(true);
          setTemperature(data.main.temp);
          setTempMin(data.main.temp_min);
          setTempMax(data.main.temp_max);
          setFeelsLike(Math.round(data.main.feels_like));
          setHumidity(data.main.humidity);
          setWindSpeed(Math.round(data.wind.speed));
        } catch (error) {
          setIsError(true);
        }
      });
    };
    getCurrentCity();
  }, []);

  const imageLoad = () => {
    console.log("Image loaded successfully");
    setIsLoaded(true);
  }

  const imageError = () => {
    console.log("Error loading image");
    setIsError(true);
  }

  if (isError) {
    return <div className="weather__block"><iframe src="https://giphy.com/embed/KJvOSHdFkoacp5qkg8" width="350" height="350" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>;
  }

  if (!isLoaded) {
    return <div className="weather__block"><iframe src="https://giphy.com/embed/QKUx6kHItu3ilaVMdn" width="350" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>;
  }

  return (
    <div className="weather__block">
      <img src={suncloud} className="weather__image" alt="sun-cloud" onLoad={imageLoad} />
      <h2 className="temperature--h2">{temperature}&deg;</h2>
      <h4 className="temperature--h4">Precipitations <br />
        Max: {temp_max}° Min: {temp_min}°</h4>
      <div className="humidity">
        <div className="humidity__option">
          <img src={rain_sm} alt="rain" />
          {humidity}
        </div>
        <div className="humidity__option">
          <img src={temp_sm} alt="thermometer" />
          {feels_like}&deg;
        </div>
        <div className="humidity__option">
          <img src={wind_sm} alt="wind" />
          {windSpeed}
        </div>
      </div>
    </div>
  )
}

export default WeatherBlock;