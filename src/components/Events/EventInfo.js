import React from 'react'
import {DateTime} from "luxon";
import {Link} from 'react-router-dom'

export default function EventInfo(props) {
  const event = {...props.event} 

  return (
    <article className="event-info-container">
      {
        // <h3>{event.name}</h3>
      }
      <div className="col1">

        <section>
          <h5>Event Description</h5>
          <p>{event.description}</p>
        </section>
      <Link to='/confirmation'><button className="purchase-button" onClick={()=>this.handleClick(event.id)}>Purchase Tickets</button></Link>

      </div>
      <div className="col2">
        <section>
          <h5>Venue</h5>
          <p>{event.venue.name}</p>
        </section>
        <section>
          <h5>Date</h5>
          <p>{DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_HUGE)}</p>
        </section>
        <section>
          <h5>Time</h5>
          <p>{DateTime.fromISO(event.time).toLocaleString({ hour:'numeric', minute: 'numeric' , timeZoneName: 'short' })}</p>
        </section>
        <section>
          <h5>Tickets Left</h5>
          <p>{props.ticketsLeft}</p>
        </section>
        <section>
          <h5>Price</h5>
          <p>${event.price/100}</p>
        </section>

      </div>
    </article>
  )
}


