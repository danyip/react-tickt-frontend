import React, { Component } from "react";
import AllEventsMap from "../components/Events/AllEventsMap";

export default class FindEvent extends Component {
  render(){
    return(
      <div>
        <h3>
          Find nearby events
        </h3>
        <div>
          <AllEventsMap /> 
        </div>
      </div>
      )
    }

}
