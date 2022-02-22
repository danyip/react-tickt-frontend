import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../apiBaseUrl';
import '../stylesheets/style.css';
import '../stylesheets/confirmation.css';
import EventInfo from '../components/Events/EventInfo'
import EventComments from '../components/Events/EventComments'
import SeatedBooking from '../components/EventBooking/SeatedBooking';
import SingleEventMap from '../components/Events/SingleEventMap';
import {DateTime} from "luxon";


export default class Confirmation extends Component {

  state = {
    loading: true,
    event: {
      venue:{},
      tickets:[],
      comments:[]
    },
  }


  fetchOneEvent = async ()=>{
    const url = `${BASE_URL}/events/${this.props.match.params.id}`

    try {
      const res = await axios.get(url)
      console.log('fetchOneEvent()',res.data);
      this.setState({event: res.data})
      this.setState({loading: false})

    } catch (err) {
      console.log('ERROR FETCHING ONE EVENT: ', err);
    }
  }

  componentDidMount(){
    this.fetchOneEvent()
  }
  


  render() {

    return (
      <div className="pages-wrapper">
        {
          this.state.loading
          ?
          <div>Loading...</div>
          :
          <div className="confirmation">
            <h3>Confirmation</h3>
            <div className="virtual-ticket">
                <h1>Virtual Ticket Here!</h1>
            </div>



            <p>{`${this.state.event.venue.name}, ${DateTime.fromISO(this.state.event.date).toLocaleString(DateTime.DATE_HUGE)}`}</p>
            
            <div className="image-map-container">
              <div className="event-image"><p>REPLACE WITH EVENT IMAGE ONCE WE WORK OUT CLOUDINARY</p></div>
              <SingleEventMap className="event-map" venue={this.state.event.venue} />
            </div>

            <div className="event-info-comments-container">
              <div className="event-info">
                <EventInfo event={this.state.event} ticketsLeft={this.state.ticketsLeft} />
              </div>
              <div className="event-comments">
                <EventComments comments={this.state.event.comments} />
              </div>
            </div>
            {!this.state.event.event_type && <SeatedBooking 
                                                event={this.state.event} 
                                                currentUser={this.props.currentUser} 
                                                fetchOneEvent={this.fetchOneEvent} 
                                                history={this.props.history}/>}

          </div>
        }
      </div>
    )
  }
}
