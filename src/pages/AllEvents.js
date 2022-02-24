import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../config/constants';
import '../stylesheets/style.css';
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";

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
            <article key={event.id} >
              
            <AdvancedImage cldImg={ cld.image(event.image)
                                        .resize(thumbnail()
                                        .width(150))} 
            />
              <h3 className="search-result" onClick={()=>this.handleClick(event.id)}>{event.name}</h3>
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