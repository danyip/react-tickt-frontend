import React, { Component } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../../apiBaseUrl';


const containerStyle = {
  width: '600px',
  height: '450px'
};


export default class AllEventsMap extends Component {
  
  state = {
    center: {
      lat: null,
      lng: null
    }
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
      center: {lat: pos.coords.latitude, lng: pos.coords.longitude}
    })
  }

  render() {
    return (
      <LoadScript
        googleMapsApiKey={GOOGLE_MAP_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.state.center}
          zoom={14}
          clickableIcons={false}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}