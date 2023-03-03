import React, { Component } from 'react';

import Header from '../Header/Header';
import Weather from '../Weather/Weather';
import Footer from '../Footer/Footer';

import './sass/Main.scss';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      themeClass: '',
    };
  }
  handleTime = () => {
    const { DateTime } = require("luxon");
    let hours = DateTime.now().toObject().hour;
    console.log(hours);
    const THEME = {
      LIGHT: 'day',
      DARK: 'night'
    }
    this.setState({ themeClass: hours < 16 ? THEME.LIGHT : THEME.DARK })
  }
  componentDidMount() {
    this.handleTime();
  }

  render() {
    const { themeClass } = this.state;
    return (
      <div className={themeClass}>
        <Header />
        <Weather />
        <Footer />
      </div>
    );
  }
}

export default Main;