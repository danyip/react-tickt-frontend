import React, {Component} from "react";
import { GOOGLE_MAP_API_KEY } from "../../apiBaseUrl";

export default class SingleEventMap extends Component {
  render(){
    return(
      <div>
        <iframe 
          width="400" 
          height="400" 
          style={{border: "0"}} 
          loading="lazy" 
          src={`https://www.google.com/maps/embed/v1/place?q=${this.props.venue.address}&key=${GOOGLE_MAP_API_KEY}`}>  
        </iframe>
      </div>
    )
  }
}