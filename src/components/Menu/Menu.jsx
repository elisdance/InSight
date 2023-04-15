import React, {useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sass/Menu.scss';

function Menu() {
  const [city,setCity] = useState('');
  const [notify,setNotify]=useState(false)
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=af5b4d017098884e3f779e32003418fe`
        )
        .then(response => response.json())
        .then(data => {
          setCity(data.city.name)
          setNotify(true)
        });
    },
  );
}, []);
const handleNotificationClick = () => {
  if (city) {
    toast.success(`Successfully, ${city}`,{icon:'🚀'});
  } else {
    toast.error('Error',{icon:'❕'});
  }
  setNotify(!notify);
};

  return (
    <div className="menu">
      <div className="dropdown__menu">
        <a href='/' className='city'><i className="fa-solid fa-location-dot"></i>&nbsp; {city || 'Loading...'}  &emsp; <i className="fa-solid fa-angle-down"></i></a>
        <div className="dropdown__content">
          <a href="/">Kyiv</a>
          <a href="/">Warsaw</a>
          <a href="/"><i className="fa-solid fa-plus"></i> Add a location</a>
        </div>
      </div>
      <div className="notification" onClick={handleNotificationClick}>
        <i className="fa-regular fa-bell"></i>
        <ToastContainer  theme='colored'/>
     </div>
     
    </div>
  )
}

export default Menu;