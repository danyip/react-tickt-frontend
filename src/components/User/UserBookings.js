import React, { Component } from 'react'
import Tickets from "../BookingConfirmation/Tickets";

export default class UserBookings extends Component {
  render() {
    return (
      <div>
        {
          this.props.events.map(event=>{
            return (
              <div>
                {event.name}
                {event.tickets.map(ticket=>{
                  return(
                    <div>
                      {ticket.id}
                      {event.name}
                      {/* <Tickets/> */}
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
