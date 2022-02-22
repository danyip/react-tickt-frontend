import React from 'react'
import {DateTime} from "luxon";
import {Link} from 'react-router-dom'

export default function Tickets(props) {
  const event = {...props.event}

  return (
    <article className="event-info-container">
      
      
        <div className="ticket">
            
            
            <h1>tickt</h1>
            
            <h3>{event.name}</h3>

                <section>
                    <p>{DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_HUGE)}</p>
                    <p>{DateTime.fromISO(event.time).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                </section>
                <section>
                    <h5>Venue</h5>
                    <p>{event.venue.name}</p>
                </section>
                <section>
                    <h5>Seat</h5>
                    <p>Seat Goes Here</p>
                </section>
                <section>
                    <p>{current_user.name}</p>
                </section>
                <section>
                    <h5>Price</h5>
                    <p>${event.price/100}</p>
                </section>
        </div>
    </article>
  )
}


