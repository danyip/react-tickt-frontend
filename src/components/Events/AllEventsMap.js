import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { BASE_URL, GOOGLE_MAP_API_KEY } from '../../apiBaseUrl';
import axios from 'axios';
import Login from '../../pages/Login';


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
    venuePositions: []
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

  render() {

    return (
      <div>
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
                    />
                  )})
                }
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        }
        <article>
          {
            this.state.venues.map((ven) => {
              return(
                <div key={ven.id}>
                  <h4>{ven.name}</h4>
                  <p>{ven.address}</p>
                  <p>Number of events: {ven.events.length}</p>

                </div>
              )
            })
          }
        </article>
      </div>
    )
  }
}