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
          </div>
          <div className="footer-item" id="footer-right">
            <h1>tickt</h1>
          </div>
        </div>
      </footer>
    )
  }
}
