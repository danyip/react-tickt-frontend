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
            {event}
            {events[event][0].event.date}

            {events[event].map(ticket=>{
              return(
                <div key={ticket.id}>{ticket.id}</div>
              )
            })}
            </div>
          )
        })}

      </div>
    )
  }
}
