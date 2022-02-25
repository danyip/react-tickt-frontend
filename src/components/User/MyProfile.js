import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/constants';
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";
import UserBookings from "./UserBookings";
import '../../stylesheets/profile.css';


class MyProfile extends React.Component{

  state = {
    events: null,
  }

  componentDidMount() {
    this.fetchUserTickets()
  }

  fetchUserTickets = async () => {

    let token = "Bearer " + localStorage.getItem("jwt");

    try {
      const res = await axios.get(`${BASE_URL}/user_tickets`, {
        headers: {
          'Authorization': token
        }
      })
      this.setState({events: res.data})
      
    } catch (err) {
      console.log('ERROR fetchUserTickets()', err);
    }

  }

  render(){

    if (!this.props.currentUser) {

      return <div>Loading...</div>
    } else {

      return(
        <div className='page-wrapper'>

        <h2><strong>Hello {this.props.currentUser.name}</strong></h2>
        <p>Your email is {this.props.currentUser.email}</p>

        
        <AdvancedImage className="profile-image" cldImg={cld.image(this.props.currentUser.image)
                                    .resize(thumbnail()
                                    .width(150)
                                    .height(150))} 
                                    />


        <h2><strong>Your Tickets</strong></h2>

        <UserBookings events={this.state.events} currentUser={this.props.currentUser}/>

        
      </div>
    );
    }
  }//render

}//class MyProfile


export default MyProfile