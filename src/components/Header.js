import React from "react";
import {Link} from 'react-router-dom';
import '../stylesheets/header.css';


class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>Hello World from class Header</h1>
        <nav>
        {
          this.props.currentUser !== undefined
          ?
          (
            <ul className="main-nav">
              <li><Link to='#'>Featured</Link></li>
              <li><Link to='#'>Event Map</Link></li>
              <li><Link to='#'>Social</Link></li>
              <li className="push">Welcome Derek</li>
              <li><Link to='#'>My Profile</Link></li>
              <li><Link to='/'>Logout</Link></li>
            </ul>
          )
          :
          (
            <ul className="main-nav">
              <li><Link to='#'>Featured</Link></li>
              <li><Link to='#'>Event Map</Link></li>
              <li><Link to='#'>Social</Link></li>
              <li className="push"><Link to='/login'>Login</Link></li>
            </ul>
          )
        }
      </nav>
    </header>
    )
  }
}

export default Header;