import React, { Component } from 'react'

export default class Seat extends Component {

  

  render() {
  const seat = {...this.props.seat}
    return (
      <div className='seat'>{seat.ticket.user_id}</div>
    )
  }
}
