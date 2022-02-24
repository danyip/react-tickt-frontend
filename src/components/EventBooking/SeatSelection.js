import React, { Component } from 'react'

export default class SeatSelection extends Component {
  render() {
    return (
      <div>
        Selected Seats:
        
        <ul>
          {this.props.newTickets.map(newTicket=>{
            return(
              <li key={`${newTicket.seat_row}${newTicket.seat_column}`}>
              {String.fromCharCode(newTicket.seat_row+65)}{newTicket.seat_column + 1}
              </li>
            )
          })
          }
        </ul>
        <button className="purchase-button" onClick={()=>this.props.purchaseTickets()}>Purchase</button>
      </div>
    )
  }
}
