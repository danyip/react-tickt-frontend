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
    this.props.returnSearch(this.state.queryText)
  }


  render(){
      return(
          <div>
              <form onSubmit={this.handleSearch}>
                  <input type="text" onChange={this.handleInput} />
                  <br />
                  <button>Search</button>
              </form>
          </div>
      )
    }
}