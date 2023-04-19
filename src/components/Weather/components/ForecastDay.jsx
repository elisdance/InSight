import React from "react";

function ForecastDay ({src,image,day,temperature_day,temperature_night,className}) {
    return (
      <div className="forecast__day">
      <p>{day}</p>
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

export default ForecastDay;