import { DateTime } from "luxon";

const API_KEY = "af5b4d017098884e3f779e32003418fe";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({...searchParams, appid:API_KEY})

  return fetch(url)
    .then((res) => res.json())
};

const formatCurrentWeather = (data) => {
  const {
    coord: {lat, lon},
    main: {temp, temp_min, temp_max, humidity},
    name,
    dt,
    weather,
    wind: {speed}
  } = data
  return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}



const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData
  ('weather', searchParams).then(formatCurrentWeather);

  const {lat, lon} = formattedCurrentWeather

  const formattedForecastWeather = await getWeatherData('onecall',{
    lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units
  }).then(formatForecastWeather)

  return {...formattedCurrentWeather, ...formattedForecastWeather};
};


export default getFormattedWeatherData;
