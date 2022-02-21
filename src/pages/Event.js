import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../apiBaseUrl';
import '../stylesheets/style.css';
import EventInfo from '../components/Events/EventInfo'
import EventComments from '../components/Events/EventComments'
import SeatedBooking from '../components/EventBooking/SeatedBooking';
export default class Event extends Component {

  state = {
    loading: true,
    event: {
      venue:{},
      tickets:[],
      comments:[]
    },
    ticketsLeft: 0
  }

  fetchOneEvent = async ()=>{
    const url = `${BASE_URL}/events/${this.props.match.params.id}`

    try {
      const res = await axios.get(url)
      console.log('fetchOneEvent()',res.data);
      this.setState({event: res.data})
      
      this.setState({ticketsLeft: this.state.event.event_type? this.state.event.venue.standing_capacity - this.state.event.tickets.length : this.state.event.venue.seat_rows * this.state.event.venue.seat_columns - this.state.event.tickets.length})

      this.setState({loading: false})

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
        {
          this.state.loading
          ?
          <div>Loading...</div>
          :
          <div>
            <div>REPLACE WITH EVENT IMAGE ONCE WE WORK OUT CLOUDINARY</div>
            <div>REPLACE WITH MAP IFRAME ONCE WE WORK OUT MAPS API</div>
            <EventInfo event={this.state.event} ticketsLeft={this.state.ticketsLeft}/>
            <EventComments comments={this.state.event.comments}/>
            {!this.state.event.event_type && <SeatedBooking event={this.state.event}/>}
            
          </div>
        }
      </div>
    )
  }
}
