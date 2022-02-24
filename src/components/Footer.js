import React, { Component } from 'react'
import '../stylesheets/footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer>

        <div className="footer-flex">
          <div className="footer-item">
            <p>left</p>
          </div>
          <div className="footer-item">
            <p>middle</p>
          </div>
          <div className="footer-item">
            <p>right</p>
          </div>
        </div>

      </footer>
    )
  }
}
