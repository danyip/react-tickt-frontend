import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../../apiBaseUrl'


class MyProfile extends React.Component{
  render(){
    return(
      <div>
        <p>Hello {this.props.currentUser.name}</p>
        <p>Your email is {this.props.currentUser.email}</p>
      </div>
    );
  }//render

}//class MyProfile


export default MyProfile