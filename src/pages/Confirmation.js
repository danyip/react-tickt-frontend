import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../config/constants';
import '../stylesheets/style.css';
import '../stylesheets/confirmation.css';
import '../stylesheets/Tickets.css';
import {DateTime} from "luxon";
import Ticket from '../components/BookingConfirmation/Ticket';


export default class Confirmation extends Component {

  ticketData = this.props.history.location.state.tickets
  
  render() {

    return (
      <div className="pages-wrapper">
        {
          // this.state.loading
          // ?
          // <div>Loading...</div>
          // :
          <div className="confirmation">
            <h3>Confirmation</h3>
              {
              this.ticketData.map(ticket => {
                return (
                  <Ticket key={ticket.id} ticketData={ticket} currentUser={this.props.currentUser} />
                )
              })

            }
          </div>
        }
      </div>
    )
  }
}
