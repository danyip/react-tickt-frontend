import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/constants';
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";
import UserBookings from "./UserBookings";



class MyProfile extends React.Component{

  state = {
    events: []
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
      console.log(res.data);
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

        <p>Hello {this.props.currentUser.name}</p>
        <p>Your email is {this.props.currentUser.email}</p>
        
        {<AdvancedImage cldImg={cld.image(this.props.currentUser.image)
                                    .resize(thumbnail()
                                    .width(150)
                                    .height(150))} 
        />}

        {<UserBookings events={this.state.events} currentUser={this.props.currentUser}/>}
        
      </div>
    );
    }
  }//render

}//class MyProfile


export default MyProfile