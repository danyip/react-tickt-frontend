import React from 'react'
import {DateTime} from "luxon";

export default function EventInfo(props) {
  const event = {...props.event} 
  
  return (
    <article>
      <h2>{event.name}</h2>
      <section>
        <h4>Event Description</h4>
        <p>{event.description}</p>
      </section>
      <section>
        <h4>Venue</h4>
        <p>{event.venue.name}</p>
      </section>
      <section>
        <h4>Date</h4>
        <p>{DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_SHORT)}</p>
      </section>
      <section>
        <h4>Time</h4>
        <p>{DateTime.fromISO(event.time).toLocaleString(DateTime.TIME_SIMPLE)}</p> {/* TODO: Figure out how to format this.... */}
      </section>
      <section>
        <h4>Tickets Left</h4>
        <p>{props.ticketsLeft}</p>
      </section>
      <section>
        <h4>Price</h4>
        <p>${event.price/100}</p>
      </section>
      <button>Purchase Tickets</button>
    </article>
  )
}


