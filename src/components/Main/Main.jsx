import React, { createContext } from 'react';
import { DateTime } from 'luxon';
import Header from '../Header/Header';
import Weather from '../Weather/Weather';
import Footer from '../Footer/Footer';
import './sass/Main.scss';


const ThemeContext = createContext('day');

function Main() {
  const handleTime = () => {
    const hours = DateTime.now().toObject().hour;
    return hours < 16 ? 'day' : 'night';
  };
  const theme = handleTime();
  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme}>
        <Header />
        <Weather />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
export default Main;
