import React, { Component } from 'react';
import './sass/_base.scss';
import './sass/_layout.scss';
import './sass/_media.scss';
import './sass/_modules.scss';
import './sass/_nav.scss';
import './sass/_normalize.scss';
import './sass/_section.scss';
import './sass/_typography.scss';
import './sass/_weather.scss';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '#ffff',
      date: '',
      text: ''
    };

  }
  handleTime = (time) => {
    let hours = time.getHours();
    if (hours < 16) {
      this.setState({ backgroundColor: '#29B2DD' });
    } else {
      this.setState({ backgroundColor: '#08244F' });
    }
  }
  componentDidMount() {
    this.handleTime(new Date());
    this.getDate();
    this.getHours();
  }
  getDate() {
    let today = new Date();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = monthName[today.getMonth()] + ',' + today.getDate();
    this.setState({
      date: date
    })
  }
  getHours() {
    let hour = new Date().getHours();
    let text = document.getElementsByClassName('time');
    Array.prototype.forEach.call(text, function (el) {
      el.innerText = hour + '.00';
      hour += 1;
      hour %= 24;
    });

    this.setState({
      text: hour
    })
  }
  render() {




    return (
      <div className='app' style={{ backgroundColor: this.state.backgroundColor }}>
        <div className="header">
          <div className="title">
            <div className="content">
              <h1> InSight</h1>
              <h1>InSight</h1>
            </div>
          </div>
          <div className=" header__description">
            <div className="header__text">
              This app provides accurate weather information<br />
              based on location or on your search query.<br />
              It displays push notifications,rain forecast, humidity<br />
              information, wind predictions, maximum and minimum <br />
              temperatures of the day and hourly temperature for a location.
            </div>
          </div>
          <div className="menu">
            <div className="dropdown__menu">
              <a><i className="fa-solid fa-location-dot"></i>&nbsp; Fortaleza &emsp; <i class="fa-solid fa-angle-down"></i></a>
              <div className="dropdown__content">
                <a href="#">Kyiv</a>
                <a href="#">Warsaw</a>
                <a href="#"><i className="fa-solid fa-plus"></i> Add a location</a>
              </div>
            </div>
            <div className="notification">
              <i className="fa-regular fa-bell"></i>
            </div>
          </div>
        </div>
        <section className="weather">
          <div className="weather__block">
            <img src="img/suncloud.svg" className="weather__image" alt="sun-cloud" />
            <h2 className="temperature--h2">28°</h2>
            <h4 className="temperature--h4">Precipitations <br />
              Max.: 31° Min.: 25°</h4>
            <div className="humidity">
              <div className="humidity__option">
                <img src="img/rain_sm.svg" alt="rain" />
                6%
              </div>
              <div className="humidity__option">
                <img src="img/temp_sm.svg" alt="thermometer" />
                90%
              </div>
              <div className="humidity__option">
                <img src="img/wind_sm.svg" alt="wind" />
                19km/h
              </div>
            </div>
          </div>
          <div className="weather__block">
            <div>
              <div className="block__detail">
                <div className="forecast">
                  <div className="forecast__date">
                    <h3 className="temperature--h3">Today</h3>
                    <h4 className="temperature--h4" id="date">{this.state.date}</h4>
                  </div>
                  <div className="forecast__hours">
                    <div className="forecast__hour focus">
                      <h4 className="temperature--h4 shadow">29°C</h4>
                      <img src="img/forecast2.svg" className="forecast__image" alt="sun-cloud" />
                      <h4 className="temperature--h4 shadow time"></h4>
                    </div>
                    <div className="forecast__hour">
                      <h4 className="temperature--h4 shadow">26°C</h4>
                      <img src="img/forecast2.svg" className="forecast__image" alt="sun-cloud" />
                      <h4 className="temperature--h4 shadow time"></h4>
                    </div>
                    <div className="forecast__hour">
                      <h4 className="temperature--h4 shadow">24°C</h4>
                      <img src="img/forecast1.svg" className="forecast__image" alt="cloud" />
                      <h4 className="temperature--h4 shadow time"></h4>
                    </div>
                    <div className="forecast__hour">
                      <h4 className="temperature--h4 shadow">23°C</h4>
                      <img src="img/forecast3.svg" className="forecast__image" alt="mooon" />
                      <h4 className="temperature--h4 shadow time"></h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block__detail">
                <div className="forecast">
                  <div className="forecast__date">
                    <h3 className="temperature--h3">Next Forecast</h3>
                    <h4 className="temperature--h4"><i className="fa-regular fa-calendar"></i></h4>
                  </div>
                  <div className="forecast__days scroll">
                    <div className="forecast__day">
                      <p>Monday</p>
                      <img src="img/drops.svg" alt="rain" />
                      <div className="t">
                        <div className="t">13
                          <p className="celsius">°C</p>
                        </div>
                        <div clasNames="t dark">10
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="forecast__day">
                      <p>Tuesday</p>
                      <img src="img/thunder.svg" alt="thunder" />
                      <div className="t">
                        <div className="t">17
                          <p className="celsius">°C</p>
                        </div>
                        <div className="t dark">12
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="forecast__day">
                      <p>Wednesday</p>
                      <img src="img/tornado.svg" className="margin--left" alt=" tornado" />
                      <div className="t">
                        <div className="t">19
                          <p className="celsius">°C</p>
                        </div>
                        <div className="t dark">12
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="forecast__day">
                      <p>Thursday</p>
                      <img src="img/sun_cloud.svg" alt="sun-cloud" />
                      <div className="t">
                        <div className="t">13
                          <p className="celsius">°C</p>
                        </div>
                        <div className="t dark">10
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="forecast__day">
                      <p>Friday</p>
                      <img src="img/sun_cloud.svg" className="margin--right" alt="sun-cloud" />
                      <div className="t">
                        <div className="t">13
                          <p className="celsius">°C</p>
                        </div>
                        <div className="t dark">10
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="forecast__day">
                      <p>Saturday</p>
                      <img src="img/drops.svg" alt="rain" />
                      <div className="t">
                        <div className="t">10
                          <p className="celsius">°C</p>
                        </div>
                        <div className="t dark">6
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="forecast__day">
                      <p>Sunday</p>
                      <img src="img/thunder.svg" className="margin--right" alt="thunder" />
                      <div className="t">
                        <div className="t">14
                          <p className="celsius">°C</p>
                        </div>
                        <div className="t dark">8
                          <p className="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div>Ruda Yelizaveta</div>
          <div><a href="https://github.com/elisdance">GitHub</a></div>
          <div><a href="https://www.figma.com/community/file/1158928016905524023">Design</a></div>
        </footer>
      </div>
    );
  }

}

export default Main