import React from "react";
import {Link} from 'react-router-dom'
import '../stylesheets/header.css';

class Header extends React.Component {

  
  render() {
    const currentUser = this.props.currentUser


    return(
      <header className="header">
        

        
        <nav className="linear-nav">
          <h1><Link to='/'>tickt</Link></h1>
          

          <Link to='/events'>All Events </Link>
          <Link to='/find_event'>Events Near Me</Link>

          {currentUser &&  <Link to="/my_profile" className="push">My Profile </Link>}
          {currentUser &&  <Link onClick={()=>this.props.handleLogout()} to='/'>Logout</Link>}

          {!currentUser && <Link to='/login' className="push">Login </Link>}
          {!currentUser && <Link to='/new_user'>Create New Account</Link>}
          
        </nav>        
        
      </header>
    )
  }
}

export default Header;