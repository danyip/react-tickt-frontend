import React, { Component } from "react";
import SeatMap from "./SeatMap";
import SeatSelection from "./SeatSelection";
import "../../stylesheets/SeatedBooking.css";
import axios from "axios";
import { BASE_URL } from "../../config/constants";

export default class SeatedBooking extends Component {
  state = {
    seatingArray: [],
    newTickets: [],
  };

  componentDidMount() {
    this.generateSeatingArray();
  }

  // Creates a nested array of seats
  generateSeatingArray = () => {
    const rows = this.props.event.venue.seat_rows;
    const cols = this.props.event.venue.seat_columns;

    const seatingArray = [];

    for (let i = 0; i < rows; i++) {
      // Create an array for each row
      const rowArr = [];

      for (let j = 0; j < cols; j++) {
        // Fill each row with seatData
        const seatData = { ticket: {}, hold: false, row: i, column: j };
        rowArr.push(seatData);
      }

      seatingArray.push(rowArr); // populate the parent array with the rows
    }

    // Loop though all the tickets and populate them into the seating array
    this.props.event.tickets.forEach((ticket) => {
      seatingArray[ticket.seat_row][ticket.seat_column].ticket = ticket;
    });

    this.setState({ seatingArray: seatingArray });
  };

  // Adds a new ticket object to the array of new tickets in state and sets the seat hold to true
  addNewTicket = (row, column) => {
    const newTicket = {
      event_id: this.props.event.id,
      user_id: this.props.currentUser.id,
      seat_row: row,
      seat_column: column,
    };

    // Mapping over seatingArray to update the seat hold. Must do it this way as a slice is a 'shallow copy' only the outer array is copied, the inner array is referanced to the original!
    this.setState((state) => ({
      ...this.state,
      seatingArray: this.state.seatingArray.map((seat_row, i) =>
        seat_row.map((seat, j) => {
          if (row === i && column === j) {
            return { ...seat, hold: true };
          } else {
            return seat;
          }
        })
      ),
      newTickets: [newTicket, ...this.state.newTickets],
    }));
  };

  // Removes a ticket from the array of new tickets in state and sets the seat hold to false
  removeFromNewTickets = (row, column) => {
    this.setState((state) => ({
      ...this.state,
      seatingArray: this.state.seatingArray.map((seat_row, i) =>
        seat_row.map((seat, j) => {
          if (row === i && column === j) {
            return { ...seat, hold: false };
          } else {
            return seat;
          }
        })
      ),
      newTickets: this.state.newTickets.filter((hold) => {
        return !(hold.seat_row === row && hold.seat_column === column);
      }),
    }));
  };

  purchaseTickets = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/tickets`,
        this.state.newTickets
      );
      console.log("purchaseTickets()", res.data);
      this.props.history.push("/confirmation", { tickets: res.data });
    } catch (err) {
      console.log("Error purchaseTickets()", err);
    }
  };

  render() {
    return (
      <div className="seated-booking-container">
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
    );
  }
}
