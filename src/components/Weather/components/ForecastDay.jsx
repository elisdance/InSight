import React, { Component } from "react";

class ForecastDay extends Component {
  render () {
    const {src,image,text,temperature_day,temperature_night,className} = this.props;
    return (
      <div className="forecast__day">
      <p>{text}</p>
      <img src={src} alt={image} className={className}/>
      <div className="t">
        <div className="t">{temperature_day}
          <p className="celsius">°C</p>
        </div>
        <div className="t dark">{temperature_night}
          <p className="celsius">°C</p>
        </div>
      </div>
    </div>
    )
  }
}

export default ForecastDay;