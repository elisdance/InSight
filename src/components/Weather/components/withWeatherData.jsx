import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const withWeatherData = WrappedComponent => {
  return function WithWeatherData(props) {
    const [date, setDate] = useState('');
    const [hours, setHours] = useState([]);
    const [formattedWeatherData, setFormattedWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const [temperatures, setTemperatures] = useState([]);
    const [dailyData, setDailyData] = useState([]);

    function getDate() {
      const date = DateTime.now().toFormat('LLL dd');
      setDate(date);
    }
    function getCurrentCity() {
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
            if (!resp.list || resp.list.length === 0) {
              throw new Error('Weather data not found');
            }
            const hour = DateTime.now().toObject().hour;
            const hours = Array.from({ length: 4 }, (_, i) => {
              const hourMod = (hour + i) % 24;
              return `${hourMod}.00`;
            });
            const dailyData = resp.list.reduce((acc, item) => {
              const day = new Date(item.dt_txt).toLocaleString('en-us', { weekday: 'long' });
              const temperature_day = Math.round(item.main.temp_max);
              const temperature_night = Math.round(item.main.temp_min);
              if (!acc.some(data => data.day === day)) {
                acc.push({ day, temperature_day, temperature_night });
              } else {
                const index = acc.findIndex(data => data.day === day);
                if (temperature_day > acc[index].temperature_day) {
                  acc[index].temperature_day = temperature_day;
                }
                else if (temperature_night < acc[index].temperature_night) {
                  acc[index].temperature_night = temperature_night;
                }
              }
              return acc;
            }, []);
            setDailyData(dailyData);
            const temperatures = resp.list.slice(0, 4).map(item => Math.round(item.main.temp));
            setTemperatures(temperatures);
            setHours(hours);
          })
          .catch(error => {
            console.log(error);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    }

    useEffect(() => {
      getDate();
      getCurrentCity();
    }, []);

    return (
      <WrappedComponent
        date={date}
        hours={hours}
        formattedWeatherData={formattedWeatherData}
        loading={loading}
        error={error}
        city={city}
        temperatures={temperatures}
        dailyData={dailyData}
        {...props}
      />
    );
  };
};

export default withWeatherData;
