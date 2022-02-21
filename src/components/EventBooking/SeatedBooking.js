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
    const tickets = this.props.event.tickets

    const result = []

    for(let i = 0; i < rows; i++){
      const rowArr = []
      
      for(let j = 0; j < cols; j++){
        const seatData = {ticket: {}, hold: false}
        rowArr.push(seatData)
      };

      result.push(rowArr)
    }

    tickets.forEach(ticket => {
      result[ticket.seat_row][ticket.seat_column].ticket = ticket
    });
    //TODO: fill in array with reservations data
    //TODO: set seating array into state
    console.log(result);
    console.log(tickets);
    this.setState({seatingArray: result})
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
