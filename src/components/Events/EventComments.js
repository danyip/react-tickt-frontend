import React, { Component } from 'react'
import {DateTime} from "luxon";

export default class EventComments extends Component {
  
  render() {
    window.dt=DateTime;
    return (
      <section>
        <div>
          {this.props.comments.map(comment=>{
        console.log("created......",comment.created_at)
            return(
              <div key={comment.id}>
                <h4>{comment.user.name}</h4>
                <p>{comment.text}</p>
                <p>{`
                  ${DateTime.fromISO(comment.created_at).toLocaleString(DateTime.DATETIME_SHORT)} (${DateTime.fromISO(comment.created_at).toRelative()}) 
                  `}</p>
              </div>
            )
          })}
          <form>{/* TODO: Look into replacing this with something more slick */}
            <textarea name="comment" id="comment" cols="30" rows="3" placeholder='Write a comment'></textarea>
            <button>Submit</button>
          </form>
        </div>

      </section>
    )
  }
}
