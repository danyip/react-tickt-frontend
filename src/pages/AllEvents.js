import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../apiBaseUrl';
import '../stylesheets/style.css';

export default class AllEvents extends Component {
  state = {
    allEvents: []
  }

  fetchAllEvents = async ()=>{
    const url = `${BASE_URL}/events`

    try {
      const res = await axios.get(url)
      console.log('fetchAllEvents()',res.data);
      this.setState({allEvents: res.data})
    } catch (err) {
      console.log('ERROR FETCHING ALL EVENTS: ', err);
    }
  }

  componentDidMount(){
    this.fetchAllEvents()
  }

  handleClick = (id)=>{
    console.log('Clicked: ', id);
    this.props.history.push(`/event/${id}`)
  }

  render() {
    return (
      <div className="pages-wrapper">
        {
          this.state.allEvents.map(event => {
            return(<article key={event.id}>
              <h3 onClick={()=>this.handleClick(event.id)}>{event.name}</h3>
              <p> <strong>Venue: </strong>{event.venue.name}</p>
              <p>{event.description}</p>
              <hr/>
            </article>)
          })
        }
      </div>
    )
  }
}
