import React from "react";
import {Link} from 'react-router-dom'
import '../stylesheets/header.css';

class Header extends React.Component {

  
  render() {
    const currentUser = this.props.currentUser


    return(
      <header className="header">
        

        
        <nav>
          <ul className="main-nav">

          <li><h1><Link to='/'>tickt</Link></h1></li>
          <li><Link to='/events'>All Events </Link></li>
          <li><Link to='/find_event'>Events Near Me</Link></li>

          {currentUser &&  <li className="push"><Link to="/my_profile">My Profile </Link></li>}
          {currentUser &&  <li><Link onClick={()=>this.props.handleLogout()} to='/'>Logout</Link></li>}

          {!currentUser && <li className="push"><Link to='/login'>Login </Link></li>}
          {!currentUser && <li><Link to='/new_user'>Create New Account</Link></li>}
          </ul>
        </nav>
        
        {currentUser && <p>Hello, {currentUser.name}</p> }
        
      </header>
    )
  }
}

export default Header;