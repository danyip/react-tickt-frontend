import React from 'react'
import {DateTime} from "luxon";
import '../../stylesheets/Tickets.css'

export default function Tickets(props) {
  const ticketData = {...props.ticketData};

  return (
    <article className="event-info-container">
      
        <div className="virtual-ticket">

            <h1>tickt</h1>

            <section>
                <h3>{ticketData.event.name}</h3>
            </section>

            <section>
                <h5>{`${DateTime.fromISO(ticketData.event.date).toLocaleString(DateTime.DATE_HUGE)} at ${DateTime.fromISO(ticketData.event.time).toLocaleString(DateTime.TIME_SIMPLE)}`}</h5>
            </section>
            
            <section>
                <h5>Venue: </h5>
                <p>{ticketData.venue.name}</p>
            </section>

            <section>
                    {
                    ticketData.seat_row === null
                    ?
                    <p><strong>General Admission</strong></p>
                    :
                    <div><h5>Seat: </h5><p>{`${ticketData.seat_row} ${ticketData.seat_column}`}</p></div>
                    }
            </section>

            <section>
                <h5>Ticketholder: </h5>
                <p>{ticketData.user.name}</p>
            </section>

            <section>
                <h5>Price: </h5>
                <p>${ticketData.event.price/100}</p>
            </section>

            <section>
                <h5>Ticket ID: </h5>
                <p>{`${DateTime.fromISO(ticketData.event.date).toFormat('yyyyLLdd')}${ticketData.id}`}</p>
            </section>

        </div>
    </article>
    )
}


