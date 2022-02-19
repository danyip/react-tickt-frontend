import React from "react";
import {Link} from 'react-router-dom'
import '../stylesheets/header.css';

class Header extends React.Component {
  render() {
    return(
      <header className="header">
        <h1>
          <Link to='/'>Tickt</Link>
        </h1>

        <p>Hello, ( if user print name )</p>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/events'>All Events</Link>
          <Link to="/profile"></Link>
          <Link to='#'>Login</Link>

        </nav>
      </header>
    )
  }
}

export default Header;