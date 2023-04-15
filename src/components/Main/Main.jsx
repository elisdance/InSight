import React, {  createContext } from 'react';
import Header from '../Header/Header';
import Weather from '../Weather/Weather';
import Footer from '../Footer/Footer';
import './sass/Main.scss';
import { DateTime } from 'luxon';

const ThemeContext = createContext('day');

function Main() {
  const handleTime = () => {
    let hours = DateTime.now().toObject().hour;
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
export default Main