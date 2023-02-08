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
        <div class="header">
          <div class="title">
            <div class="content">
              <h1> InSight</h1>
              <h1>InSight</h1>
            </div>
          </div>
          <div class=" header__description">
            <div class="header__text">
              This app provides accurate weather information<br />
              based on location or on your search query.<br />
              It displays push notifications,rain forecast, humidity<br />
              information, wind predictions, maximum and minimum <br />
              temperatures of the day and hourly temperature for a location.
            </div>
          </div>
          <div class="menu">
            <div class="dropdown__menu">
              <a><i class="fa-solid fa-location-dot"></i>&nbsp; Fortaleza &emsp; <i class="fa-solid fa-angle-down"></i></a>
              <div class="dropdown__content">
                <a href="#">Kyiv</a>
                <a href="#">Warsaw</a>
                <a href="#"><i class="fa-solid fa-plus"></i> Add a location</a>
              </div>
            </div>
            <div class="notification">
              <i class="fa-regular fa-bell"></i>
            </div>
          </div>
        </div>
        <section class="weather">
          <div class="weather__block">
            <img src="img/suncloud.svg" class="weather__image" alt="sun-cloud" />
            <h2 class="temperature--h2">28°</h2>
            <h4 class="temperature--h4">Precipitations <br />
              Max.: 31° Min.: 25°</h4>
            <div class="humidity">
              <div class="humidity__option">
                <img src="img/rain_sm.svg" alt="rain" />
                6%
              </div>
              <div class="humidity__option">
                <img src="img/temp_sm.svg" alt="thermometer" />
                90%
              </div>
              <div class="humidity__option">
                <img src="img/wind_sm.svg" alt="wind" />
                19km/h
              </div>
            </div>
          </div>
          <div class="weather__block">
            <div>
              <div class="block__detail">
                <div class="forecast">
                  <div class="forecast__date">
                    <h3 class="temperature--h3">Today</h3>
                    <h4 class="temperature--h4" id="date">{this.state.date}</h4>
                  </div>
                  <div class="forecast__hours">
                    <div class="forecast__hour focus">
                      <h4 class="temperature--h4 shadow">29°C</h4>
                      <img src="img/forecast2.svg" class="forecast__image" alt="sun-cloud" />
                      <h4 class="temperature--h4 shadow time"></h4>
                    </div>
                    <div class="forecast__hour">
                      <h4 class="temperature--h4 shadow">26°C</h4>
                      <img src="img/forecast2.svg" class="forecast__image" alt="sun-cloud" />
                      <h4 class="temperature--h4 shadow time"></h4>
                    </div>
                    <div class="forecast__hour">
                      <h4 class="temperature--h4 shadow">24°C</h4>
                      <img src="img/forecast1.svg" class="forecast__image" alt="cloud" />
                      <h4 class="temperature--h4 shadow time"></h4>
                    </div>
                    <div class="forecast__hour">
                      <h4 class="temperature--h4 shadow">23°C</h4>
                      <img src="img/forecast3.svg" class="forecast__image" alt="mooon" />
                      <h4 class="temperature--h4 shadow time"></h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block__detail">
                <div class="forecast">
                  <div class="forecast__date">
                    <h3 class="temperature--h3">Next Forecast</h3>
                    <h4 class="temperature--h4"><i class="fa-regular fa-calendar"></i></h4>
                  </div>
                  <div class="forecast__days scroll">
                    <div class="forecast__day">
                      <p>Monday</p>
                      <img src="img/drops.svg" alt="rain" />
                      <div class="t">
                        <div class="t">13
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">10
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div class="forecast__day">
                      <p>Tuesday</p>
                      <img src="img/thunder.svg" alt="thunder" />
                      <div class="t">
                        <div class="t">17
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">12
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div class="forecast__day">
                      <p>Wednesday</p>
                      <img src="img/tornado.svg" class="margin--left" alt=" tornado" />
                      <div class="t">
                        <div class="t">19
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">12
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div class="forecast__day">
                      <p>Thursday</p>
                      <img src="img/sun_cloud.svg" alt="sun-cloud" />
                      <div class="t">
                        <div class="t">13
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">10
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div class="forecast__day">
                      <p>Friday</p>
                      <img src="img/sun_cloud.svg" class="margin--right" alt="sun-cloud" />
                      <div class="t">
                        <div class="t">13
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">10
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div class="forecast__day">
                      <p>Saturday</p>
                      <img src="img/drops.svg" alt="rain" />
                      <div class="t">
                        <div class="t">10
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">6
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                    <div class="forecast__day">
                      <p>Sunday</p>
                      <img src="img/thunder.svg" class="margin--right" alt="thunder" />
                      <div class="t">
                        <div class="t">14
                          <p class="celsius">°C</p>
                        </div>
                        <div class="t dark">8
                          <p class="celsius">°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="footer">
          <div>Ruda Yelizaveta</div>
          <div><a href="https://github.com/elisdance">GitHub</a></div>
          <div><a href="https://www.figma.com/community/file/1158928016905524023">Design</a></div>
        </footer>
      </div>
    );
  }

}

export default Main