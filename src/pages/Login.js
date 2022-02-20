import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../apiBaseUrl'


class Login extends React.Component{
  state = {
    email: '',
    password: ''
  }

  //handle typing in the form
  handleInput = (ev) => {
    switch(ev.target.name){
      case 'email':
        this.setState({email: ev.target.value})
        break;
      case 'password':
        this.setState({password: ev.target.value})
    }
  } //handleInput


  

  //handle the submit of the login
  handleSubmit = (ev) => {
        const request = {'email': this.state.email, 'password': this.state.password}

        this.props.loginUser(request)
        
        ev.preventDefault();
  } // handleSubmit()

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Login Form</label>
        <br/>
        <input
          onChange={this.handleInput}
          name="email"
          type="email"
          placeholder='Enter Email'
        />
        <br/>
        <input
          onChange={this.handleInput}
          name="password"
          type="password"
          placeholder='Enter Password'
        />
        <br/>
        <button>Login</button>
      </form>
    ); // return
  }// render()
} // class Login

export default Login