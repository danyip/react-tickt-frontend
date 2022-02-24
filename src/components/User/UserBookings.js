import React, { Component } from 'react'
import Ticket from "../BookingConfirmation/Ticket";

export default class UserBookings extends Component {

    
  render() {

    const events = this.props.events

    return (
      <div>
        {Object.keys(events).map((event, i)=>{
          return(
            <div key={i}>
            <h3>
              {event} 
            </h3>
            <p>{events[event][0].event.date}</p>

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
