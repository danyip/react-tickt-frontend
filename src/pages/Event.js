import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../apiBaseUrl';
import '../stylesheets/style.css';
import {DateTime} from "luxon";

export default class Event extends Component {

  state = {
    event: []
  }

  fetchOneEvent = async ()=>{
    const url = `${BASE_URL}/events/${this.props.match.params.id}`

    try {
      const res = await axios.get(url)
      console.log('fetchOneEvent()',res.data);
      this.setState({event: res.data})
    } catch (err) {
      console.log('ERROR FETCHING ONE EVENT: ', err);
    }
  }

  componentDidMount(){
    this.fetchOneEvent()
    console.log(this.props.match.params.id);
    
  }
  
  render() {
    return (
      <div>

        <div>REPLACE WITH EVENT IMAGE</div>
        <div>REPLACE WITH MAP IFRAME</div>
        <div>
          <h2>{this.state.event.name}</h2>
          <p>{this.state.event.description}</p>
          <p> <strong>Date: </strong>{DateTime.fromISO(this.state.event.date).toLocaleString(DateTime.DATE_SHORT)}</p>
        </div>
        <div>
          
        </div>

        
      </div>
    )
  }
}
