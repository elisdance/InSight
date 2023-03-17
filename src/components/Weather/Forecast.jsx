import React, { Component } from 'react';
import ForecastDay from './components/ForecastDay';
import ForecastHour from './components/ForecastHour';
import drops from '../../assets/images/drops.svg';
import forecast2 from '../../assets/images/forecast2.svg';
import { DateTime } from 'luxon';
import './sass/Forecast.scss';


class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      hours: [],
      formattedWeatherData: null,
      loading: true,
      error: null,
      city: '',
      temperatures: [],
      dailyData: []
    }
  }
  getDate() {
    let date = DateTime.now().toFormat('LLL dd')
    this.setState({
      date: date
    })
  }
  getCurrentCity() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=af5b4d017098884e3f779e32003418fe`)
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp);
          if (!resp.list || resp.list.length === 0) {
            throw new Error("Weather data not found");
          }
          const hour = DateTime.now().toObject().hour;
          let hours = [];
          for (let i = 0; i < 4; i++) {
            const el = document.createElement('div');
            const hourMod = (hour + i) % 24;
            el.innerText = `${hourMod}.00`;
            hours.push(el);
          }
          console.log(hours)
          const dailyData = resp.list.reduce((acc, item) => {
            const day = new Date(item.dt_txt).toLocaleString('en-us', { weekday: 'long' });
            const temperature_day = Math.round(item.main.temp_max);
            const temperature_night = Math.round(item.main.temp_min);
            if (!acc.some(data => data.day === day)) {
              acc.push({ day, temperature_day, temperature_night });
            }
            return acc;
          }, []);
          console.log(dailyData);
          this.setState({ dailyData: dailyData });
          const temperatures = resp.list.slice(0, 4).map(item => Math.round(item.main.temp));
          console.log(temperatures);
          this.setState({ temperatures: temperatures, hours: hours });
        })
        .catch(error => {
          console.log(error);
          this.setState({ isError: true });
        });
    }
    );
  }
  componentDidMount() {
    this.getDate();
    this.getCurrentCity()
  }
  render() {
    const { date } = this.state;
    const { temperatures, hours, dailyData } = this.state;
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
                  <div className={index === 0 ? 'focus' : ''} key={index}>
                    <ForecastHour
                      src={forecast2}
                      image='sun-cloud'
                      temperature={item}
                      time={hours[index].innerText}
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
              {dailyData.map((day,index)=> 
              <ForecastDay
                src={drops}
                image='rain'
                key={index}
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
}

export default Forecast;