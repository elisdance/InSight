const initialState = {
    isLoaded: false,
    isError: false,
    weatherData: null,
    temperature: '',
    temp_min: '',
    temp_max: '',
    feels_like: '',
    humidity: '',
    windSpeed: '',
  };
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_WEATHER_DATA':
        return {
          ...state,
          weatherData: action.payload,
          isLoaded: true,
          temperature: Math.round(action.payload.main.temp),
          temp_min: Math.round(action.payload.main.temp_min),
          temp_max: Math.round(action.payload.main.temp_max),
          feels_like: Math.round(action.payload.main.feels_like),
          humidity: action.payload.main.humidity,
          windSpeed: Math.round(action.payload.wind.speed),
        };
      case 'SET_ERROR':
        return {
          ...state,
          isError: true,
        };
      default:
        return state;
    }
  };
  
  export default weatherReducer;
  