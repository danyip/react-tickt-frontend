import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../config/constants';
import '../stylesheets/style.css';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { cld } from "../cld";
import {fill} from "@cloudinary/url-gen/actions/resize";
import '../stylesheets/allEvents.css';

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
            return(
            <article key={event.id} className="event-index" onClick={()=>this.handleClick(event.id)}>
              
            <AdvancedImage cldImg={ cld.image(event.image).resize(fill().width(250).height(250))} 
            />
            <div className="text-wrapper">
              <h3>{event.name}</h3>
              <p> <strong>Venue: </strong>{event.venue.name}</p>
              <p>{event.description}</p>
            </div>
            </article>)
          })
        }
      </div>
    )
  }
}