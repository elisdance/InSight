import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../../../store/weather_hours';
import { DateTime } from 'luxon';

const withWeatherData = WrappedComponent => {
  return function WithWeatherData(props) {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [temperatures, setTemperatures] = useState([]);
    const dispatch = useDispatch();
    const selectWeatherData = (state) => state.hours.weatherHours;
    const weatherData = useSelector(selectWeatherData)
    function getDate() {
      const date = DateTime.now().toFormat('LLL dd');
      setDate(date);
    } const dailyData = weatherData?.list?.reduce((acc, item) => {
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
    }, []) || [];
    const hour = DateTime.now().toObject().hour;
    const hours = Array.from({ length: 4 }, (_, i) => {
      const hourMod = (hour + i) % 24;
      return `${hourMod}.00`;
    })


    useEffect(() => {
      getDate();
      dispatch(fetchWeather()).then(() => setLoading(false));
    }, [dispatch]);

    return (
      <WrappedComponent
        date={date}
        hours={hours}
        loading={loading}
        error={error}
        dailyData={dailyData}
        temperatures={temperatures}
        {...props}
      />
    );
  };
};

export default withWeatherData;