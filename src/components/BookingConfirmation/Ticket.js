import React from 'react'
import {DateTime} from "luxon";
import '../../stylesheets/Tickets.css'
import ReactDOM from "react-dom";
import QRCode from 'react-qr-code';

export default function Tickets(props) {


    if(!props.ticketData.id){

        return <div>Loading</div>

    }else {

        const ticketData = {...props.ticketData};

        return (
          <article className="event-info-container">
            
              <div className="virtual-ticket">
      
                  <div className="vt-left-container">
      
                      <h1>tickt</h1>
      
                      <section>
                          <h3>{ticketData.event.name.toUpperCase()}</h3>
                      </section>
      
                      <section>
                          <h5>{`${DateTime.fromISO(ticketData.event.date).toLocaleString(DateTime.DATE_HUGE).toUpperCase()} AT ${DateTime.fromISO(ticketData.event.time).toLocaleString(DateTime.TIME_SIMPLE).toUpperCase()}`}</h5>
                      </section>
                      
                      <section>
                          <h5>Venue: </h5>
                          <p>{ticketData.venue.name.toUpperCase()}</p>
                      </section>
      
                      <section>
                              {
                              ticketData.seat_row === null
                              ?
                              <p><strong>GENERAL ADMISSION</strong></p>
                              :
                              <div><h5>SEAT: </h5><p>{String.fromCharCode(ticketData.seat_row+65)}{ticketData.seat_column + 1}</p></div>
                              }
                      </section>
      
                      <section>
                          <h5>TICKETHOLDER: </h5>
                          <p>{ticketData.user.name.toUpperCase()}</p>
                      </section>
      
                      <section>
                          <h5>PRICE: </h5>
                          <p>${ticketData.event.price/100}</p>
                      </section>
      
                      <section>
                          <h5>TICKET ID: </h5>
                          <p>{`${DateTime.fromISO(ticketData.event.date).toFormat('yyyyLLdd')}${ticketData.id}`}</p>
                      </section>
      
                  </div>
      
                  <div className="vt-right-container">
                      <QRCode className="QR" value={`https://tickt-sei50.netlify.app/event/${ticketData.id}`} size={200} />
                  </div>
      
              </div>
          </article>
          )

    }

}


