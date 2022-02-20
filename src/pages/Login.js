import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../apiBaseUrl'
import { Redirect } from 'react-router-dom';


class Login extends React.Component{
  state = {
    email: '',
    password: '',
    redirect: false
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
        this.setState({ redirect: "/my_profile" })
        
        ev.preventDefault();
  } // handleSubmit()

  render(){

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

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