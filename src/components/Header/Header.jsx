import React from 'react';
import Menu from '../Menu/Menu';
import './sass/Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="title">
        <div className="content">
          <h1> InSight</h1>
          <h1>InSight</h1>
        </div>
      </div>
      <div className=" header__description">
        <div className="header__text">
          This app provides accurate weather information
          <br />
          based on location or on your search query.
          <br />
          It displays push notifications,rain forecast, humidity
          <br />
          information, wind predictions, maximum and minimum 
          {' '}
          <br />
          temperatures of the day and hourly temperature for a location.
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default Header;
