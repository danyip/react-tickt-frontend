import React, { Component } from 'react'
import Ticket from "../BookingConfirmation/Ticket";
import {DateTime} from "luxon";


export default class UserBookings extends Component {


  render() {

    if (!this.props.events){

      return <div>Loading...</div>
    } else {

      
      const events = this.props.events
      
    return (
      <div>
        {Object.keys(events).map((event, i)=>{
          return(
            <div key={i}>
            <h3>
              {event} 
            </h3>
            <p>{DateTime.fromISO(events[event][0].event.date).toLocaleString(DateTime.DATE_HUGE)}</p>

            {events[event].map(ticket=>{
              return(
                
                  <Ticket ticketData={ticket} key={ticket.id}/>
                
              )
            })}
            </div>
          )
        })}

      </div>
    )
  }
  }
}
