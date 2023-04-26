import { configureStore} from '@reduxjs/toolkit';
import weatherReducer  from './reducers';
import hoursReducer from './weather_hours';

export const store = configureStore(
  {reducer:{
  weather: weatherReducer
}},
{reducer: {
  hours: hoursReducer
}}
)

