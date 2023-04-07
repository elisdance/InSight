import React, { Component, createContext} from 'react';
const THEME = {
    LIGHT: 'day',
    DARK: 'night'
  }
const ThemeContext = createContext(THEME.LIGHT);
class Theme extends Component {
    handleTime = () => {
        const { DateTime } = require("luxon");
        let hours = DateTime.now().toObject().hour;
        return hours < 16 ? THEME.LIGHT : THEME.DARK;
      }
    render() {
        return (
            <ThemeContext.Consumer>
        {theme => (
          <div className={theme}>
          </div>
        )}
      </ThemeContext.Consumer>
        )
    }
}
export default Theme;