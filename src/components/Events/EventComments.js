import React, { Component } from 'react'
import {DateTime} from "luxon";
import axios from 'axios';
import { BASE_URL } from '../../apiBaseUrl';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'



export default class EventComments extends Component {
  
  state = {
    comment: ''
  }
  
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline','strike']
    ],
    keyboard: {
      bindings: {
        enter: {
          key: 'enter',
          handler: ()=>{
            this.postComment()
          }
        },
      }
    },
  }

  

  handleClick =()=>{
    console.log('hello');
    this.postComment()
  }
  handleChange = (e)=>{
    this.setState({comment: e})
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
                {parse(comment.text)}
                <p className="comment-time">{
                  // DateTime.fromISO(comment.created_at).toLocaleString(DateTime.DATETIME_SHORT)
                  DateTime.fromISO(comment.created_at).toRelative()
                  }</p>
              </div>
            )
          })}
          
          <ReactQuill value={this.state.comment}
                    onChange={this.handleChange}
                    onSubmit={this.handleClick}
                    modules={this.modules}
        />
        <button onClick={this.handleClick}>Submit</button>
        </div>

        

      </section>
    )
  }
}
