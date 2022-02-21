import React, { Component } from 'react'
import SeatMap from './SeatMap'
import SeatSelection from './SeatSelection'
import '../../stylesheets/SeatedBooking.css'
import axios from 'axios'
import { BASE_URL } from '../../apiBaseUrl'

export default class SeatedBooking extends Component {

  
  state = {
    seatingArray: [],
    newTickets: []
  }

  componentDidMount(){
    this.generateSeatingArray()
    console.log();
    
  };

  // Creates a nested array of seats
  generateSeatingArray = ()=>{
    
    const rows = this.props.event.venue.seat_rows
    const cols = this.props.event.venue.seat_columns
    
    const seatingArray = []

    for(let i = 0; i < rows; i++){ // Create an array for each row
      const rowArr = []
      
      for(let j = 0; j < cols; j++){ // Fill each row with seatData
        const seatData = {ticket: {}, hold: false, row: i, column: j}
        rowArr.push(seatData)
      };

      seatingArray.push(rowArr) // populate the parent array with the rows
    }
    
    // Loop though all the tickets and populate them into the seating array
    this.props.event.tickets.forEach(ticket => {
      seatingArray[ticket.seat_row][ticket.seat_column].ticket = ticket
    });

    this.setState({seatingArray: seatingArray})
  }

  // Adds a new ticket object to the array of new tickets in state and sets the seat hold to true
  addNewTicket = (row, column) => {
    const newTicket = {
      event_id: this.props.event.id,
      user_id: this.props.currentUser.id,
      seat_row: row,
      seat_column: column
    }
    this.setState({newTickets: [newTicket, ...this.state.newTickets]})

    const newSeatingArray = this.state.seatingArray.slice() //TODO: look into changing this, slice doesn't copy 2D array
    newSeatingArray[row][column].hold = true
    this.setState({seatingArray: newSeatingArray}) 
  }

  // Removes a ticket from the array of new tickets in state and sets the seat hold to false
  removeFromNewTickets = (row, column) => {

    const copyNewTickets = this.state.newTickets.slice()

    this.setState({newTickets: copyNewTickets.filter(hold => {
      return !(hold.seat_row === row && hold.seat_column === column)
    })})

    const newSeatingArray = this.state.seatingArray.slice() //TODO: look into changing this, slice doesn't copy 2D array
    newSeatingArray[row][column].hold = false
    this.setState({seatingArray: newSeatingArray})

  }

  purchaseTickets = async ()=>{

    try {
      const res = await axios.post(`${BASE_URL}/tickets`, this.state.newTickets)
      console.log('purchaseTickets()', res.data);
      this.props.history.push('/') //TODO: Make this redirect to the tickets
      
    } catch (err) {
      console.log('Error purchaseTickets()', err);
    }
    
  }

  render() {
    return (
      <div className='seated-booking-container' className="page-wrapper">
        <SeatMap 
          seatingArray={this.state.seatingArray} 
          addNewTicket={this.addNewTicket}
          removeFromNewTickets={this.removeFromNewTickets}
        />
        <SeatSelection 
          newTickets={this.state.newTickets}
          purchaseTickets={this.purchaseTickets}
        />      
      </div>
    )
  }
}
