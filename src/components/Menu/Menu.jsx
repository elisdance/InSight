import React, { Component } from 'react';
import './sass/Menu.scss';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="dropdown__menu">
          <a href='/' className='city'><i className="fa-solid fa-location-dot"></i>&nbsp; Fortaleza &emsp; <i className="fa-solid fa-angle-down"></i></a>
          <div className="dropdown__content">
            <a href="/">Kyiv</a>
            <a href="/">Warsaw</a>
            <a href="/"><i className="fa-solid fa-plus"></i> Add a location</a>
          </div>
        </div>
        <div className="notification">
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>
    )
  }
}

export default Menu;