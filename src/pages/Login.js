import React from 'react'
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
        this.setState({ redirect: "/" })
        
        ev.preventDefault();
  } // handleSubmit()

  render(){

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return(
      <form className="user" onSubmit={this.handleSubmit}>
        <label>User Login</label>
        <br/>
        <input
          className="user-input"
          onChange={this.handleInput}
          name="email"
          type="email"
          placeholder='Enter Email'
        />
        <br/>
        <input
          className="user-input"
          onChange={this.handleInput}
          name="password"
          type="password"
          placeholder='Enter Password'
        />
        <br/>
        <button className="user-button">Login</button>
      </form>
    ); // return
  }// render()
} // class Login

export default Login