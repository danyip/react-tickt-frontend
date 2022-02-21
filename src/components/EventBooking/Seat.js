import React, { Component } from 'react'

export default class Seat extends Component {

  handleClick=()=>{
    console.log('clicked', this.props.seat);
  }

  render() {
  const seat = {...this.props.seat}
    return (
      <div onClick={this.handleClick} className='seat'>{seat.ticket.user_id}</div>
    )
  }
}
