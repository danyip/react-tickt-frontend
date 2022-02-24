import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import {GOOGLE_MAP_API_KEY } from '../apiBaseUrl';
import { BASE_URL } from '../config/constants';
import axios from 'axios';
import {DateTime} from "luxon";
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";
import '../stylesheets/FindEvent.css'


const containerStyle = {
  width: '100%',
  height: '100%'
};


export default class FindEvent extends Component {
  
  state = {
    center: {
      lat: null,
      lng: null
    },
    userCenter: {
      lat: null,
      lng: null
    },
    loading: true,
    events: [],
    venues: [],
    venuePositions: [],
    venueSelected: false
  }
  
  componentDidMount(){
    this.getLocation()
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log( "Geolocation is not supported by this browser." );
    }
  }

  showPosition = (pos) => {
    
    this.setState({
      center: {
        lat: pos.coords.latitude, 
        lng: pos.coords.longitude
      }, 
      loading: false,
      userCenter: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    })
    const position = [pos.coords.latitude, pos.coords.longitude]
    this.fetchAllVenues(position)
  }

  fetchAllVenues = async (position)=>{
    const url = `${BASE_URL}/venues`

    try {
      const res = await axios.get(url, {params: position})
      console.log('fetchAllVenues()',res.data);
      this.setState({venues: res.data})
      this.getVenuePositions();
    } catch (err) {
      console.log('ERROR FETCHING ALL VENUES: ', err);
    }
  }

  getVenuePositions = () => {
    const venueArr = this.state.venues.map(ev => {
      const position = {
        lat: parseFloat(ev.latitude), 
        lng: parseFloat(ev.longitude)
      }

      const venue = {
        position: position,
        image: ev.image
      }
      return venue
    })
    console.log(venueArr);
    this.setState({venuePositions: venueArr})
  }

  handleClick = (id) => {
    const venueArr = this.state.venues
    const currentVen = venueArr[id]
    this.setState({
      venueSelected: currentVen,
      center: {
        lat: currentVen.latitude,
        lng: currentVen.longitude
      } 
    })
  }

  getMoreInfo = (id) => {
    this.props.history.push(`/event/${id}`)
  }


  render() {

    const currentVenue = this.state.venueSelected
    const venueImage = cld.image(currentVenue.image); 
    venueImage.resize(thumbnail().width(125).height(125))

    return (
      <div className='map-page-wrapper'>
        
          {
            this.state.loading
            ?
            <div>
              Loading Map...
            </div>
            :
            <div className='map-wrapper'>
              <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={this.state.center}
                  zoom={12}
                  clickableIcons={false}
                >
                  <Marker 
                    key={1}
                    position={this.state.userCenter}
                    icon={this.props.currentUser ? `https://res.cloudinary.com/tickt-project22/image/upload/w_30,h_30,c_fill/r_max/e_outline:outer:1/${this.props.currentUser.image}.png` : 'http://maps.google.com/mapfiles/ms/icons/horsebackriding.png'} 
                  />
                  {
                    this.state.venuePositions.map((venue, i) => {
                      return (
                      <Marker 
                        key={i}
                        position={venue.position}
                        icon={`https://res.cloudinary.com/tickt-project22/image/upload/w_30,h_30,c_fill/r_max/co_rgb:A62216,e_outline:outer:3/${venue.image}.png`} 
                        onClick={() => this.handleClick(i)}
                      />
                    )})
                  }
                  <></>
                </GoogleMap>
              </LoadScript>
            </div>
          }
        
        {
          currentVenue
          ?
          <article className='selectedVenue'>
            <AdvancedImage cldImg={venueImage} />
            <h3>Events @ <strong>{currentVenue.name}</strong></h3>
            <p>{currentVenue.address}</p>
            <hr />
            {
              this.state.venueSelected.events.map((event) => {
                return (
                  <div>
                    <h4 onClick={() => {this.getMoreInfo(event.id)}}>
                      <strong>{event.name}</strong>
                    </h4>
                    <p><strong>Date</strong></p>
                    <p>
                      {DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_HUGE)},
                      &nbsp;
                      {DateTime.fromISO(event.time).toFormat('hh:mma')} 
                    </p>
                    <p><strong>Type</strong></p>
                    <p>{event.type === 0 ? "Seated" : "Standing"}</p>
                    <p><strong>Price</strong></p>
                    <p>${event.price/100}</p>
                    <button 
                      onClick={() => {this.getMoreInfo(event.id)}}>
                      Get more Info           
                    </button>
                    <hr />
                  </div>
                )
              })
            }
          </article>
          :
          <article className='venues-container'>
            {
              this.state.venues.map((ven, i) => {
                return(
                  <div  key={ven.id} 
                        onClick={() => {this.handleClick(i)}}
                        className='venue'
                  >
                    <AdvancedImage cldImg={ cld.image(ven.image)
                                            .resize(thumbnail()
                                            .width(150)
                                            .height(150))
                                          } 
                    />
                    <div>
                      <h4>{ven.name}</h4>
                      <p>{ven.address}</p>
                      <p>Number of events: {ven.events.length}</p>
                    </div>

                  </div>
                )
              })
            }
          </article>
        }
      </div>    
    )
  }
}