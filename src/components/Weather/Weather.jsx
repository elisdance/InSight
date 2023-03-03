import React, { Component } from 'react';
import WeatherBlock from './WeatherBlock';
import Forecast from './Forecast';
import './sass/Weather.scss';

class Weather extends Component {
  render () {
    return (
      <section className="weather">
        <WeatherBlock/>
        <Forecast/>
        </section>
    )
  }
}
export default Weather;