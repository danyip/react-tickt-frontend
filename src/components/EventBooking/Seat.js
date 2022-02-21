import React, { Component } from 'react'

export default class Seat extends Component {

  handleClick=()=>{

    this.props.seat.hold
    ? 
    this.props.removeFromNewTickets(this.props.seat.row, this.props.seat.column)
    : 
    this.props.addNewTicket(this.props.seat.row, this.props.seat.column)

  }

  render() {
  const seat = {...this.props.seat}

    if(Object.keys(seat.ticket).length){ // The seat contains a filled in ticket object
      return (
        <div className='seat booked'>{seat.ticket.user_id}</div>
      )
    } else if (seat.hold){ // The seat was already a hold
      return (
        <div onClick={this.handleClick} className='seat held'>{seat.ticket.user_id}</div>
      )
    } else { // The seat is available
      return(
      <div onClick={this.handleClick} className='seat available'>{seat.ticket.user_id}</div>
      )
    }
    
  }
}
