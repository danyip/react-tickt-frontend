import React, { Component, createRef, useRef  } from 'react'
import {DateTime} from "luxon";
import axios from 'axios';
import { BASE_URL } from '../../config/constants';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import * as Emoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";



export default class EventComments extends Component {
  
  state = {
    comment: ''
  }
  
  scrollToRef = createRef();

  toolbarOptions = {
    container: [
      ['bold', 'italic', 'underline'],
    
    ],
    handlers: {'emoji': function() {}}
  }
  
    modules= {
      toolbar: this.toolbarOptions,
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
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
    
    this.postComment()
    
  }
  handleChange = (e)=>{
    this.setState({comment: e})
    // this.scrollToRef.current.scrollIntoView({block: 'end', behavior: 'smooth'})
     
  }

  postComment = async ()=>{
    const comment = {
      user_id: this.props.currentUser.id,
      event_id: this.props.eventId,
      text: this.state.comment
    }

    try {
      const res = await axios.post(`${BASE_URL}/comments`, comment )
      this.setState({comment: ''})
      this.props.newComment(res.data)
      setTimeout(() => this.scrollToRef.current.scrollTop = 5000)       
    } catch (err) {
      console.log('Error postComment()', err);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.comments.length !== this.props.comments.length) {
      
      this.scrollToRef.current.scrollTop = 5000 
    }

  }

  render() {
    window.dt=DateTime;
    return (
      <section>
        <div className='event-comments-container'
              ref={this.scrollToRef}>
          {this.props.comments.map(comment=>{
            return(
              <div key={comment.id}
                  className='single-comment'
              >
                <h5>{comment.user.name}</h5>
                <p className="comment-time">{DateTime.fromISO(comment.created_at).toRelative()}</p>
                {parse(comment.text)}
              </div>
            )
          })}
          <div ></div>
          
        </div>
          {
          this.props.currentUser 
          && 
          <ReactQuill value={this.state.comment}
                    onChange={this.handleChange}
                    onSubmit={this.handleClick}
                    modules={this.modules}
                    className='quill-editor'
          />
          }

        

      </section>
    )
  }
}
