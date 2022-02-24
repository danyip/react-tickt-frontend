import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../config/constants';


export default class StandingBooking extends Component {

  state = {
    ticketQuantity: 1,
  }


  purchaseTickets = async (tickets) => {

    let token = "Bearer " + localStorage.getItem("jwt");

    try {
      const res = await axios.post(
                                  `${BASE_URL}/tickets`,
                                  tickets,
                                  { headers: {'Authorization': token}}
      );
      console.log("purchaseTickets()", res.data);
      this.props.history.push("/confirmation", { tickets: res.data });
    } catch (err) {
      console.log("Error purchaseTickets()", err);
    }
  };

  onChange =  (e)=>{
    this.setState({ticketQuantity: parseInt(e.target.value)})
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    const tickets = Array(this.state.ticketQuantity).fill({
      event_id: this.props.event.id
    })

    this.purchaseTickets(tickets)
  }


  render() {
    return (
      <div className='standing-booking-container'>
        StandingBooking
        <form onSubmit={this.handleSubmit}>
          <input type="number" min="1" max="10" value={this.state.ticketQuantity} onChange={this.onChange}/>
          <button className="purchase-button">Purchase</button>
        </form>
      </div>
    )
  }
}