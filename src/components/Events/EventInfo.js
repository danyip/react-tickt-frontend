import React from 'react'

export default function EventInfo(props) {
  const event = {...props.event} 
  



  return (
    <div>
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
        <p>{event.date}</p> {/* TODO: Figure out how to format this.... */}
      </section>
      <section>
        <h4>Time</h4>
        <p>{event.time}</p> {/* TODO: Figure out how to format this.... */}
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
    </div>
  )
}


