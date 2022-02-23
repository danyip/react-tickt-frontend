import React, { Component } from 'react'
import Ticket from "../BookingConfirmation/Ticket";

export default class UserBookings extends Component {
  render() {
    return (
      <div>
        {
          this.props.events.map(event=>{
            return (
              <div key={event.id}>
                {event.name}
                {event.tickets.map(ticket=>{
                  return(
                    <div key={ticket.id}>
                    INSERT TICKET COMPONENT HERE...
                      {ticket.id}
                      {event.name}
                      {/* <Ticket ticketData={ticket}/> */}
                    </div>  
                  )
                })}
              
              </div>
            )
          })
        }

      </div>
    )
  }
}
