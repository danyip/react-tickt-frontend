import React, { Component } from 'react'
import SeatMap from './SeatMap'
import SeatSelection from './SeatSelection'
import '../../stylesheets/SeatedBooking.css'

export default class SeatedBooking extends Component {

  
  state = {
    seatingArray: [],
    newTickets: []
  }

  componentDidMount(){
    this.generateSeatingArray()
  };

  generateSeatingArray = ()=>{
    
    const rows = this.props.event.venue.seat_rows
    const cols = this.props.event.venue.seat_columns
    

    const emptySeatingArray = []

    for(let i = 0; i < rows; i++){
      const rowArr = []
      
      for(let j = 0; j < cols; j++){
        const seatData = {ticket: {}, hold: false, row: i, column: j}
        rowArr.push(seatData)
      };

      emptySeatingArray.push(rowArr)
    }

    // Populate the emptySeatingArray array (2D array) with each of the ticket objects
    const filledSeatingArray = this.populateBookedSeats(emptySeatingArray)

    console.log('filled seating array', filledSeatingArray);

    this.setState({seatingArray: emptySeatingArray})
  }

  populateBookedSeats = (seatingArray)=>{
    const populatedArray = seatingArray.slice()

    const tickets = this.props.event.tickets
    
    tickets.forEach(ticket => {
      populatedArray[ticket.seat_row][ticket.seat_column].ticket = ticket
    });

    return seatingArray
  }

  addNewTicket = (row, column) => {
    const newTicket = {
      event_id: this.props.event.id,
      user_id: this.props.currentUser.id,
      seat_row: row,
      seat_column: column
    }
    this.setState({newTickets: [newTicket, ...this.state.newTickets]})

    const newSeatingArray = this.state.seatingArray.slice()
    newSeatingArray[row][column].hold = true

    this.setState({seatingArray: newSeatingArray})
  }

  render() {
    return (
      <div className='seated-booking-container'>
        <SeatMap seatingArray={this.state.seatingArray} addNewTicket={this.addNewTicket}/>
        <SeatSelection newTickets={this.state.newTickets}/>      
      </div>
    )
  }
}
