import React from "react";
import {HashRouter as Router} from 'react-router-dom';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import Routes from './Routes';

class App extends React.Component{
  state = {

  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        <h1>Tickt</h1>

        <Router>

        </Router>
      </div>
    )
  }
  
}

export default App;
