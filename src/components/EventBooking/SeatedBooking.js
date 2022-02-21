import React, { Component } from 'react'
import SeatMap from './SeatMap'
import SeatSelection from './SeatSelection'
import '../../stylesheets/SeatedBooking.css'

export default class SeatedBooking extends Component {

  
  state = {
    seatingArray: []
  }

  componentDidMount(){
    this.generateSeatingArray()
  };

  generateSeatingArray = ()=>{
    
    const rows = this.props.event.venue.seat_rows
    const cols = this.props.event.venue.seat_columns
    

    const seatingArray = []

    for(let i = 0; i < rows; i++){
      const rowArr = []
      
      for(let j = 0; j < cols; j++){
        const seatData = {ticket: {}, hold: false, row: i, column: j}
        rowArr.push(seatData)
      };

      seatingArray.push(rowArr)
    }

    // Populate the seatingArray array (2D array) with each of the ticket objects
    
  
    this.setState({seatingArray: seatingArray})
  }

  populateBookedSeats = (seatingArray)=>{
    const tickets = this.props.event.tickets
    
    tickets.forEach(ticket => {
      seatingArray[ticket.seat_row][ticket.seat_column].ticket = ticket
    });
  }

  applyHolds = ()=>{

  }
  

  
  
  render() {
    return (
      <div className='seated-booking-container'>
      hello
        <SeatMap seatingArray={this.state.seatingArray}/>
        <SeatSelection/>      
      </div>
    )
  }
}
