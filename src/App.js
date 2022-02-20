import React from 'react';
import axios from 'axios'
import {Route, Link, HashRouter as Router} from 'react-router-dom';

import Login from './pages/Login'
import MyProfile from './components/User/MyProfile'
import Routes from './Routes';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

const BASE_URL = 'http://localhost:3000'

class App extends React.Component{

  //App state
  state = {
    currentUser: undefined
  }

  //function to run on component mounting
  componentDidMount(){
    this.setCurrentUser();
  }

  //function to set the state to the current logged in user
  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`${BASE_URL}/users/current`, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      this.setState({currentUser: res.data})
    })
    .catch(err => console.warn(err))
  }

  //function to log the user out.
  handleLogout = () => {
    this.setState({currentUser: undefined})
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  render(){
    return (
      <div className="App">
        <Router>

          <Header currentUser={this.state.currentUser} />

          
          <Route exact path='/my_profile' component={MyProfile}/>
          <Route
            exact path='/login'
            render={(props) => <Login setCurrentUser={this.setCurrentUser}{...props}/>}
          /> 
          
          <p>Hello World!</p>

          <Footer />

        </Router>
      </div>
    ); // return
  } // render
} //class App

export default App;
