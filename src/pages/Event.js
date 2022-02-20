import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../apiBaseUrl';
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
        <h2>{this.state.event.name}</h2>
        <p> <strong>Date: </strong>{this.state.event.date}</p>
        <p>{this.state.event.description}</p>
      </div>
    )
  }
}
