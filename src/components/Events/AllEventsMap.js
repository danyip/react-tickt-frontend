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
    },
    loading: true
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
  }

  render() {

    


    return (
      <div>
        {
          this.state.loading
          ?
          <div>
            loading
          </div>
          :
          <div>
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
          </div>
        }
      </div>
    )
  }
}