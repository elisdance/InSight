import React, { Component } from "react";

class ForecastHour extends Component {

    render() {
      const {src,image,temperature,time} = this.props;
      return (
        <div className="forecast__hour ">
          <h4 className="temperature--h4 shadow">{temperature}°C</h4>
          <img src={src} className="forecast__image" alt={image} />
          <h4 className="temperature--h4 shadow time">{time}</h4>
        </div>
      )
    }
}
export default ForecastHour;