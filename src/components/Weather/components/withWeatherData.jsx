import React, { Component } from 'react';
import { DateTime } from 'luxon';

const withWeatherData = WrappedComponent => {
  return class extends Component {
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
      };
    }

    getDate() {
      let date = DateTime.now().toFormat('LLL dd');
      this.setState({
        date: date
      });
    }

    getCurrentCity() {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser');
        return;
      }
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=af5b4d017098884e3f779e32003418fe`
        )
          .then(resp => resp.json())
          .then(resp => {
            console.log(resp);
            if (!resp.list || resp.list.length === 0) {
              throw new Error('Weather data not found');
            }
            const hour = DateTime.now().toObject().hour;
            const hours = Array.from({ length: 4 }, (_, i) => {
              const hourMod = (hour + i) % 24;
              return `${hourMod}.00`;
            });
            console.log(hours);
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
      });
    }

    componentDidMount() {
      this.getDate();
      this.getCurrentCity();
    }

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export default withWeatherData;
