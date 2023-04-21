import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import './sass/Menu.scss';

function Menu() {
  const [city, setCity] = useState('');
  const [setNotify] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=af5b4d017098884e3f779e32003418fe`
        )
          .then((response) => response.json())
          .then((data) => {
            setCity(data.city.name);
            setNotify(true);
          });
      },
    );
  }, []);
  const { i18n } = useTranslation();
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const handleNotificationClick = () => {
    if (city) {
      toast.success(`Successfully, ${city}`, { icon: '🚀' });
    } else {
      toast.error('Error', { icon: '❕' });
    }
    setNotify((prevNotify) => !prevNotify);
  };
  const onChange = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };
  return (
    <div className="menu">
      <div className="dropdown__menu">
        <a href="/" className="city">
          <i className="fa-solid fa-location-dot" />
&nbsp;
          {' '}
          {city || 'Loading...'}
          {' '}
&emsp;
          {' '}
          <i className="fa-solid fa-angle-down" />
        </a>
        <div className="dropdown__content">
          <a href="/">Kyiv</a>
          <a href="/">Warsaw</a>
          <a href="/">
            <i className="fa-solid fa-plus" />
            {' '}
            Add a location
          </a>
        </div>
      </div>
      <div className="icons">
        <select className="language" onChange={onChange} value={i18n.language}>
          <option value="en">English 🇬🇧</option>
          <option value="ua">Ukrainian 🇺🇦</option>
        </select>
        <div onClick={handleNotificationClick} className="notification">
          <i className="fa-regular fa-bell" />
          <ToastContainer theme="colored" />
        </div>

      </div>

    </div>
  );
}

export default Menu;
