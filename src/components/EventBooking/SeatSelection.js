import React, { Component } from 'react'

export default class SeatSelection extends Component {
  render() {
    return (
      <div>
        Selected Seats:
        {this.props.newTickets.map(newTicket=>{
          return(
            <li key={`${newTicket.seat_row}${newTicket.seat_column}`}>
            {String.fromCharCode(newTicket.seat_row+65)}{newTicket.seat_column + 1}
            </li>
          )
        })
        }
      </div>
    )
  }
}
