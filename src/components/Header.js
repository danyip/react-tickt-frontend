import React from "react";
import {Link} from 'react-router-dom'
// import '../stylesheets/header.css';

class Header extends React.Component {

  
  render() {
    const currentUser = this.props.currentUser


    return(
      <header className="header">
        
        <h1><Link to='/'>Tickt</Link></h1>

        {currentUser && <p>Hello, {currentUser.name}</p> }
        
        <nav>
          <ul>

          <li><Link to='/events'>All Events </Link></li>

          {currentUser &&  <li><Link to="/my_profile">My Profile </Link></li>}
          {currentUser && <li><Link onClick={()=>this.props.handleLogout()} to='/'>Logout </Link></li>}

          {!currentUser && <li><Link to='/login'>Login </Link></li>}
          {!currentUser && <li><Link to='/new_user'>Create New Account </Link></li>}
          </ul>
        </nav>
        
        
      </header>
    )
  }
}

export default Header;