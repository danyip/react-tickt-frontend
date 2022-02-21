import React, { Component } from 'react'
import '../stylesheets/style.css'
import AllEventsMap from '../components/Events/AllEventsMap';

export default class Home extends Component {
  render() {
    return (
      <div className="pages-wrapper">
        <h1>HOME PAGE</h1>
        <AllEventsMap />
      </div>
    )
  }
}
