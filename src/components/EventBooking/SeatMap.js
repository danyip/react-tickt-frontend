import React, { Component } from 'react'
import Seat from './Seat'
import '../../stylesheets/SeatedBooking.css'

export default class SeatMap extends Component {
  render() {
    return (
      <div className='seat-map-viewport'>
      <div className='stage'>Stage</div>
        {this.props.seatingArray.map((row, rowIndex)=>{
          return(
            <div key={rowIndex} className='seat-row'>
              {row.map((seat, seatIndex)=>{
                return(
                  <Seat 
                    key={seatIndex} 
                    seat={seat} 
                    addNewTicket={this.props.addNewTicket}
                    removeFromNewTickets={this.props.removeFromNewTickets}
                  />
                  )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
