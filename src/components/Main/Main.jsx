import React, { Component, createContext } from 'react';
import Header from '../Header/Header';
import Weather from '../Weather/Weather';
import Footer from '../Footer/Footer';
import './sass/Main.scss';

const ThemeContext = createContext('day');

class Main extends Component {
  handleTime = () => {
    const { DateTime } = require("luxon");
    let hours = DateTime.now().toObject().hour;
    return hours < 16 ? 'day' : 'night';
  }

  render() {
    const theme = this.handleTime();

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
}



export default Main;
