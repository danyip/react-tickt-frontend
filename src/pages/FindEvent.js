import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { BASE_URL, GOOGLE_MAP_API_KEY } from '../apiBaseUrl';
import axios from 'axios';
import {DateTime} from "luxon";
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";


const containerStyle = {
  width: '600px',
  height: '450px'
};


export default class AllEventsMap extends Component {
  
  state = {
    center: {
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
      }, loading: false
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
      return position
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
      <div>
        <div className='mapDiv'>
          {
            this.state.loading
            ?
            <div>
              Loading Map...
            </div>
            :
            <div>
              <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={this.state.center}
                  zoom={12}
                  clickableIcons={false}
                  >
                  {
                    this.state.venuePositions.map((pos, i) => {
                      return (
                      <Marker 
                        key={i}
                        position={pos}
                        onClick={() => this.handleClick(i)}
                      />
                    )})
                  }
                  <></>
                </GoogleMap>
              </LoadScript>
            </div>
          }
        </div>
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
          <article className='allVenues'>
            {
              this.state.venues.map((ven, i) => {
                return(
                  <div key={ven.id} onClick={() => {
                    this.handleClick(i)}}>
                    <AdvancedImage cldImg={ cld.image(ven.image)
                      .resize(thumbnail()
                      .width(150)
                      .height(150))} 
                    />
                    <h4>{ven.name}</h4>
                    <p>{ven.address}</p>
                    <p>Number of events: {ven.events.length}</p>

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