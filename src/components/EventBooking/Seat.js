import React, { Component } from 'react'

export default class Seat extends Component {

  handleClick=()=>{
    console.log('clicked', this.props.seat.hold);
    this.props.seat.hold
    ? 
    console.log('hold') //TODO: insert removehold function here
    : 
    this.props.addNewTicket(this.props.seat.row, this.props.seat.column)
    
  }

  render() {
  const seat = {...this.props.seat}

    if(Object.keys(seat.ticket).length){
      return (
        <div className='seat booked'>{seat.ticket.user_id}</div>
      )
    } else if (seat.hold){
      return (
        <div onClick={this.handleClick} className='seat held'>{seat.ticket.user_id}</div>
      )
    } else {
      return(
      <div onClick={this.handleClick} className='seat available'>{seat.ticket.user_id}</div>
      )
    }
    
  }
}
