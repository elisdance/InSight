import React, { Component } from 'react';
import rain_sm from '../../assets/images/rain_sm.svg';
import suncloud from '../../assets/images/suncloud.svg';
import temp_sm from '../../assets/images/temp_sm.svg';
import wind_sm from '../../assets/images/wind_sm.svg';
import './sass/WeatherBlock.scss';

class WeatherBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
      city: '',
      temperature: '',
      temp_min: '',
      temp_max: '',
      feels_like: '',
      humidity: '',
      windSpeed: '',
    };
  }

  componentDidMount() {
    this.getCurrentCity();

  }
  imageLoad = () => {
    console.log("Image loaded successfully");
    this.setState({ isLoaded: true });
  }
  imageError = () => {
    console.log("Error loading image");
    this.setState({ isError: true });
  }
  getCurrentCity() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=af5b4d017098884e3f779e32003418fe`)
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp);
          if (!resp.main) {
            throw new Error("Weather data not found");
          }
          const temperature = Math.round(resp.main.temp);
          const temp_min = Math.round(resp.main.temp_min);
          const temp_max = Math.round(resp.main.temp_max);
          const feels_like = Math.round(resp.main.feels_like);
          const humidity = `${resp.main.humidity}%`;
          const windSpeed = `${Math.round(resp.wind.speed)}m/s`;
          this.setState({ temperature: temperature, feels_like: feels_like, temp_min: temp_min, temp_max: temp_max, humidity: humidity, windSpeed: windSpeed, isLoaded: true });
        })
        .catch(error => {
          console.log(error);
          this.setState({ isError: true });
        });
    }
    );
  }
  render() {
    const { isLoaded, isError, temperature, feels_like, humidity, temp_min, temp_max, windSpeed } = this.state;

    if (isError) {
      return <div className="weather__block"><iframe src="https://giphy.com/embed/KJvOSHdFkoacp5qkg8" width="350" height="350" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>;
    }

    if (!isLoaded) {
      return <div className="weather__block"><iframe src="https://giphy.com/embed/QKUx6kHItu3ilaVMdn" width="350" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>;
    }

    return (
      <div className="weather__block">
        <img src={suncloud} className="weather__image" alt="sun-cloud" onLoad={this.imageLoad} />
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
}

export default WeatherBlock;