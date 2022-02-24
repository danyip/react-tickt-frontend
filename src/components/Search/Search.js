import React, { Component } from "react";

export default class Search extends Component{

  state = {
    queryText: '',
  };

  handleInput = (e) => {
      this.setState({queryText: e.target.value})
  }

  handleSearch = (e) => {
    e.preventDefault();
    if(this.state.queryText.length === 0){
      return
    }else{
      this.props.returnSearch(this.state.queryText)
    }
  }


  render(){
      return(
          <div className="search">
              <form onSubmit={this.handleSearch}>
                  <input type="text" onChange={this.handleInput} placeholder='Search for an event' />
                  <button className="searchBtn">Search</button>
              </form>
          </div>
      )
    }
}