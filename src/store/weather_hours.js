import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk('fetchWeather', async () => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'af5b4d017098884e3f779e32003418fe';
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${apiKey}`);
  const weatherHours = await resp.json();
  return { weatherHours };
});

const hoursSlice = createSlice({
  name: 'hours',
  initialState: {
    weatherHours:{},
    temperatures: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weatherHours = action.payload.weatherHours
      state.temperatures = action.payload.weatherHours.list.slice(0, 4).map(item => Math.round(item.main.temp));
    });
  },
});

export default hoursSlice.reducer;
