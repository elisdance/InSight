import React, { Component } from 'react';
import rain_sm from '../../assets/images/rain_sm.svg';
import suncloud from '../../assets/images/suncloud.svg';
import temp_sm from '../../assets/images/temp_sm.svg';
import wind_sm from '../../assets/images/wind_sm.svg';
import './sass/WeatherBlock.scss';

class WeatherBlock extends Component {
  constructor() {
    super();
    this.state = {
        isLoaded: false,
        isError: false,
    }
  }
  imageLoad= () => {
    console.log("Image loaded successfully");
    this.setState({isLoaded:true});
  }
  imageError= ()=> {
    console.log("Error loading image");
    this.setState({isError:true});
  }
  render() {
    return (
      <div className="weather__block">
        <img src={suncloud} onLoad={this.imageLoad}
          onError={this.imageError} className="weather__image" alt="sun-cloud" />
        <h2 className="temperature--h2">28°</h2>
        <h4 className="temperature--h4">Precipitations <br />
          Max.: 31° Min.: 25°</h4>
        <div className="humidity">
          <div className="humidity__option">
            <img src={rain_sm} alt="rain" />
            6%
          </div>
          <div className="humidity__option">
            <img src={temp_sm} alt="thermometer" />
            90%
          </div>
          <div className="humidity__option">
            <img src={wind_sm} alt="wind" />
            19km/h
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherBlock;