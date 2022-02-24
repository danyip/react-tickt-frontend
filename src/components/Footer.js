import React, { Component } from 'react'
import '../stylesheets/footer.css'
import {Link} from 'react-router-dom'


export default class Footer extends Component {
  render() {
    const currentUser = this.props.currentUser

    return (
      <footer>

        <div className="footer-flex">
          <div className="footer-item">
            <p>
              tickt Inc<br />
              1 Entertainment Way<br />
              Sydney NSW 2000
            </p>
          </div>
          <div className="footer-item">
            <p id="footer-links">
              <Link to='/events'>All Events </Link>
              <Link to='/find_event'>Events Near Me</Link>
              {currentUser &&  <Link to="/my_profile" className="push">Profile </Link>}
              {currentUser &&  <Link onClick={()=>this.props.handleLogout()} to='/'>Logout</Link>}

              {!currentUser && <Link to='/new_user' className="push">Sign Up</Link>}
              {!currentUser && <Link to='/login' >Login </Link>}
            </p>
          </div>
          <div className="footer-item" id="footer-right">
            <h1>tickt</h1>
          </div>
        </div>
      </footer>
    )
  }
}
