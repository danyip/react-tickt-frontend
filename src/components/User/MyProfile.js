import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../../apiBaseUrl'


class MyProfile extends React.Component{
  state = {
    currentUser: {
      name: '',
      email: ''
    }
  }

  componentDidMount(){
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`${BASE_URL}/users/current`, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      console.log(res.data);
      this.setState({currentUser: res.data})
    })
    .catch(err => console.warn(err))
  }

  render(){
    return(
      <div>
        <p>Hello {this.state.currentUser.name}</p>
        <p>Your email is {this.state.currentUser.email}</p>
      </div>
    );
  }//render

}//class MyProfile


export default MyProfile