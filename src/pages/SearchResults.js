import React, { Component } from "react";
import Search from "../components/Search/Search";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";

export default class SearchResults extends Component {

  state = {
    searchResults: [],
  }

  componentDidMount(){
    this.returnResults()
  }

  returnResults = async () => {
    const url = `${BASE_URL}/search`


    try {
      const res = await axios.get(url, {params: {search: this.props.match.params.params}})
      console.log('handleSearch()', res.data);
      this.setState({searchResults: res.data})
    } catch (err) {
      console.log('ERROR FETCHING SEARCH RESULTS: ', err);
    }
  }

  returnSearch = (res) =>{
    this.returnResults()
    this.props.history.push(`/search/${res}`)
  }

  handleClick = (id)=>{
    this.props.history.push(`/event/${id}`)
  }

  render(){
    return(
      <div>
        <h4>Results for: "{this.props.match.params.params}"</h4>
        <Search returnSearch={this.returnSearch}/>
        <hr />
        {
          this.state.searchResults.map(event => {
            return(
            <article key={event.id} >
              
            <AdvancedImage cldImg={ cld.image(event.image)
                                        .resize(thumbnail()
                                        .width(150))} 
            />
              <h3 onClick={()=>this.handleClick(event.id)}>{event.name}</h3>
              <p> <strong>Venue: </strong>{event.venue.name}</p>
              <p>{event.description}</p>
              <hr/>
            </article>)
          })
        }
      </div>
    )
  }
}