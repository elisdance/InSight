import React from 'react';
import ForecastDay from './components/ForecastDay';
import ForecastHour from './components/ForecastHour';
import drops from '../../assets/images/drops.svg';
import forecast2 from '../../assets/images/forecast2.svg';
import './sass/Forecast.scss';
import withWeatherData from './components/withWeatherData';

function WeatherComponent(props) {
  const { date, temperatures, hours, dailyData } = props;

  return (
    <div className="weather__block">
      <div className="block__detail">
        <div className="forecast">
          <div className="forecast__date">
            <h3 className="temperature--h3">Today</h3>
            <h4 className="temperature--h4" id="date">{date}</h4>
          </div>
          <div className="forecast__hours">
            {temperatures.map((item, index) => {
              return (
                <div className={index === 0 ? 'focus' : ''} >
                  <ForecastHour
                    src={forecast2}
                    image='sun-cloud'
                    temperature={item}
                    time={hours[index]}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="block__detail">
        <div className="forecast">
          <div className="forecast__date">
            <h3 className="temperature--h3">Next Forecast</h3>
            <h4 className="temperature--h4"><i className="fa-regular fa-calendar"></i></h4>
          </div>
          <div className="forecast__days scroll">
            {dailyData.map((day)=> 
            <ForecastDay
              src={drops}
              image='rain'
              day={day.day}
              temperature_day={day.temperature_day}
              temperature_night={day.temperature_night}
            /> )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withWeatherData(WeatherComponent);
