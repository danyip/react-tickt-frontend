import React, { Component } from 'react'

export default class EventComments extends Component {
  
  render() {
    return (
      <section>
        <div>
          {this.props.comments.map(comment=>{
            return(
              <div key={comment.id}>
                <h4>{comment.user.name}</h4>
                <p>{comment.created_at}</p> {/* TODO: Make this display a "time since calc" */}
                <p>{comment.text}</p>
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
