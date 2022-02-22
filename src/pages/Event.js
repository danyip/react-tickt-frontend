import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../apiBaseUrl';
import '../stylesheets/style.css';
import '../stylesheets/event.css';
import EventInfo from '../components/Events/EventInfo'
import EventComments from '../components/Events/EventComments'
import SeatedBooking from '../components/EventBooking/SeatedBooking';
import StandingBooking from '../components/EventBooking/StandingBooking';
import SingleEventMap from '../components/Events/SingleEventMap';
import {DateTime} from "luxon";
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";


export default class Event extends Component {

  state = {
    loading: true,
    event: {
      venue:{},
      tickets:[],
      comments:[]
    },
    ticketsLeft: 0,
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
    
  }
  
  // Adds a new comment to state after posting to server
  newComment = (newComment)=>{
    let {event} = this.state
    event.comments.push(newComment)
    this.setState({event: event} )
  }


  render() {
    const myImage = cld.image(this.state.event.image);
    myImage.resize(thumbnail().width(300).height(300)) 
    
     
    return (
      <div className="pages-wrapper">
        {
          this.state.loading
          ?
          <div>Loading...</div>
          :
          <div>
            <h3>{this.state.event.name}</h3>
            <p>{`${this.state.event.venue.name}, ${DateTime.fromISO(this.state.event.date).toLocaleString(DateTime.DATE_HUGE)}`}</p>
            
            <div className="image-map-container">
              <div className="event-image"><AdvancedImage cldImg={myImage} /></div>
              <SingleEventMap className="event-map" venue={this.state.event.venue} />
            </div>
            <div className="event-info-comments-container">
              <div className="event-info">
                <EventInfo event={this.state.event} ticketsLeft={this.state.ticketsLeft} />
              </div>
              <div className="event-comments">
                <EventComments 
                  comments={this.state.event.comments} 
                  currentUser={this.props.currentUser}
                  eventId={this.state.event.id}
                  newComment={this.newComment}
                  />
              </div>
            </div>
            {this.state.event.event_type === 0 && <SeatedBooking 
                                                event={this.state.event} 
                                                currentUser={this.props.currentUser} 
                                                fetchOneEvent={this.fetchOneEvent} 
                                                history={this.props.history}/>}

            {this.state.event.event_type === 1 && <StandingBooking 
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
