import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk('fetchWeather', async () => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'af5b4d017098884e3f779e32003418fe';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await response.json();
  return data;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    isLoaded: false,
    isError: false,
    weatherData: null,
    temperature: '',
    temp_min: '',
    temp_max: '',
    feels_like: '',
    humidity: '',
    windSpeed: '',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.isError = false;
      state.weatherData = action.payload;
      state.temperature = action.payload.main.temp ?? '';
      state.temp_min = action.payload.main.temp_min ?? '';
      state.temp_max = action.payload.main.temp_max ?? '';
      state.feels_like = action.payload.main.feels_like ?? '';
      state.humidity = action.payload.main.humidity ?? '';
      state.windSpeed = action.payload.wind.speed ?? '';
    });
    builder.addCase(fetchWeather.rejected, (state) => {
      state.isLoaded = true;
      state.isError = true;
      state.weatherData = null;
    });
  },
});

export default weatherSlice.reducer;