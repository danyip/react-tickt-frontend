import React from "react";
import axios from "axios";
import { BASE_URL } from "../apiBaseUrl";
import { Redirect } from 'react-router-dom';


class NewUser extends React.Component{

  state = {
    email: '',
    password: '',
    name: '',
    userLevel: 1,
    redirect: false
  }

  handleInput = (ev) => {
    switch(ev.target.name){
      case 'email':
        this.setState({email: ev.target.value})
        break;
      case 'name':
        this.setState({name: ev.target.value})
        break;
      case 'password':
        this.setState({password: ev.target.value})
    }
  } //handleInput

  handleSubmit = (ev) => {
    const newUser = {
      'name': this.state.name,
      'email': this.state.email,
      'password': this.state.password,
      'user_level': this.state.userLevel
    }

    axios.post(`${BASE_URL}/users`, {user: newUser})
    .then(res => {
      const request = {'email': newUser.email, 'password': newUser.password}
      this.props.loginUser(request)
      this.setState({ redirect: "/" })
    })
    .catch(err => {
      console.log(err)
    })

    ev.preventDefault();
} // handleSubmit()

  render(){

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <label>Create User</label>
        <br/>
        <input
          onChange={this.handleInput}
          name="name"
          type="name"
          placeholder='Enter Name'
        />
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

        <button>Sign Up</button>
      </form>
    )
  }
}

export default NewUser