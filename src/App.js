import React from 'react';
import axios from 'axios';
import {Route, Link, HashRouter as Router} from 'react-router-dom';
import {BASE_URL} from './apiBaseUrl'
import Login from './pages/Login'
import MyProfile from './components/User/MyProfile'
import AllEvents from './pages/AllEvents'
import NewUser from './pages/NewUser';
import Event from "./pages/Event";



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
      <Router>
        <header>
          <nav>
            {
              this.state.currentUser !== undefined
              ?
              (
                <ul>
                  <li>Welcome {this.state.currentUser.name} | </li>
                  <li><Link to='/my_profile'>My Profile</Link> | </li>
                  <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                </ul>
              )
              :
              (
                <ul>
                  <li><Link to='/login'>Login</Link></li>
                  <li><Link to='/new_user'>Create New Account</Link></li>
                </ul>
              )
            }
          </nav>
          <hr/>
        </header>
        <Route exact path='/new_user' component={NewUser}/>
        <Route exact path='/my_profile' component={MyProfile}/>
        <Route
          exact path='/login'
          render={(props) => <Login setCurrentUser={this.setCurrentUser}{...props}/>}
          />
        <Route exact path='/events' component={AllEvents}/>
        <Route exact path='/event/:id' component={Event}/>
      </Router>
    ); // return
  } // render
} //class App

export default App;
