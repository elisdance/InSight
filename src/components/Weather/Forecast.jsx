import React, { Component } from 'react';
import ForecastDay from './components/ForecastDay';
import ForecastHour from './components/ForecastHour';
import drops from '../../assets/images/drops.svg';
import forecast1 from '../../assets/images/forecast1.svg';
import forecast2 from '../../assets/images/forecast2.svg';
import forecast3 from '../../assets/images/forecast3.svg';
import sun_cloud from '../../assets/images/sun_cloud.svg';
import tornado from '../../assets/images/tornado.svg';
import thunder from '../../assets/images/thunder.svg';
import './sass/Forecast.scss';

class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      text: ''
    }
  }
  getDate() {
    const { DateTime } = require("luxon");
    let date = DateTime.now().toFormat('LLL dd')
    this.setState({
      date: date
    })
  }
  getHours() {
    const { DateTime } = require("luxon");
    let hour = DateTime.now().toObject().hour;
    let text = document.getElementsByClassName('time');
    [...text].forEach.call(text, function (el) {
      el.innerText = hour + '.00';
      hour += 1;
      hour %= 24;
    });
    this.setState({
      text: hour
    })
  }
  componentDidMount() {
    this.getDate();
    this.getHours();
  }
  render() {
    const { date } = this.state;
    return (
      <div className="weather__block">
        <div className="block__detail">
          <div className="forecast">
            <div className="forecast__date">
              <h3 className="temperature--h3">Today</h3>
              <h4 className="temperature--h4" id="date">{date}</h4>
            </div>

            <div className="forecast__hours">
              <div className='focus'>
                <ForecastHour
                  className='focus'
                  src={forecast2}
                  image='sun-cloud'
                  temperature='29'
                />
              </div>
              <ForecastHour
                src={forecast2}
                image='sun-cloud'
                temperature='26'
              />
              <ForecastHour
                src={forecast1}
                image='cloud'
                temperature='24'
              />
              <ForecastHour
                src={forecast3}
                image='moon'
                temperature='23'
              />
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
              <ForecastDay
                src={drops}
                image='rain'
                text='Monday'
                temperature_day='13'
                temperature_night='10'
              />
              <ForecastDay
                src={thunder}
                image='thunder'
                text='Tuesday'
                temperature_day='17'
                temperature_night='12'
              />
              <ForecastDay
                className="margin--left"
                src={tornado}
                image='tornado'
                text='Wednesday'
                temperature_day='19'
                temperature_night='12'
              />
              <ForecastDay
                src={sun_cloud}
                image='sun-cloud'
                text='Thursday'
                temperature_day='13'
                temperature_night='10'
              />
              <ForecastDay
                src={sun_cloud}
                image='sun-cloud'
                className="margin--right"
                text='Friday'
                temperature_day='13'
                temperature_night='10'
              />
              <ForecastDay
                src={drops}
                image='rain'
                text='Saturday'
                temperature_day='10'
                temperature_night='6'
              />
              <ForecastDay
                src={thunder}
                image='thunder'
                className="margin--right"
                text='Sunday'
                temperature_day='14'
                temperature_night='8'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Forecast;