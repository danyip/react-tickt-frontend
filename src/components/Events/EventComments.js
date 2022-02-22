import React, { Component } from 'react'
import {DateTime} from "luxon";
import axios from 'axios';
import { BASE_URL } from '../../apiBaseUrl';

export default class EventComments extends Component {
  
  state = {
    comment: ''
  }

  handleSubmit =(e)=>{
    e.preventDefault()
    console.log('hello');
    this.postComment()
  }

  onChange =(e)=>{
    this.setState({comment: e.target.value})
  }

  postComment = async ()=>{
    const comment = {
      user_id: this.props.currentUser.id,
      event_id: this.props.eventId,
      text: this.state.comment
    }

    try {
      const res = await axios.post(`${BASE_URL}/comments`, comment )
      console.log(res);
      this.setState({comment: ''})
      this.props.newComment(res.data)
      
    } catch (err) {
      console.log('Error postComment()', err);
    }
  }

  render() {
    window.dt=DateTime;
    return (
      <section>
        <div>
          {this.props.comments.map(comment=>{
            return(
              <div key={comment.id}>
                <h5>{comment.user.name}</h5>
                <p>{comment.text}</p>
                <p>{`
                  ${DateTime.fromISO(comment.created_at).toLocaleString(DateTime.DATETIME_SHORT)} (${DateTime.fromISO(comment.created_at).toRelative()}) 
                  `}</p>
              </div>
            )
          })}
          <form onSubmit={this.handleSubmit}>{/* TODO: Look into replacing this with something more slick with EMOJIS */}
            <textarea onChange={this.onChange} name="comment" id="comment" cols="30" rows="3" placeholder='Write a comment' value={this.state.comment}></textarea>
            <button>Submit</button>
          </form>
        </div>

      </section>
    )
  }
}
