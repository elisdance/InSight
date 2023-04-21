import React from 'react';
import WeatherBlock from './WeatherBlock';
import Forecast from './Forecast';
import './sass/Weather.scss';

function Weather() {
  return (
    <section className="weather">
      <WeatherBlock />
      <Forecast />
    </section>
  );
}
export default Weather;
