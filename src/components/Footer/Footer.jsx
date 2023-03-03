import React, { Component } from 'react';
import './sass/Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div>Ruda Yelizaveta</div>
        <div><a href="https://github.com/elisdance">GitHub</a></div>
        <div><a href="https://www.figma.com/community/file/1158928016905524023">Design</a></div>
      </footer>
    )
  }
}
export default Footer;