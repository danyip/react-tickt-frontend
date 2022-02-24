import React, { Component } from 'react'
import '../stylesheets/footer.css'

export default class Footer extends Component {
  render() {
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
            <p>
              All Events<br />
              Events Near Me<br />
              My Profile<br />
              Log Out
            </p>
          </div>
          <div className="footer-item" id="footer-right">
            <h1>tickt</h1>
          </div>
         </div>

        <p>&copy; tickt 2022</p>
      </footer>
    )
  }
}
