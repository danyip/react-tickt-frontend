import React, { Component } from "react";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import "../stylesheets/style.css";
import "../stylesheets/home.css";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../cld";
import { thumbnail, scale, fill } from "@cloudinary/url-gen/actions/resize";
import Search from "../components/Search/Search";
import loading from "../assets/loading.gif";

export default class Home extends Component {
  state = {
    allEvents: [],
    loading: true,
  };

  fetchAllEvents = async () => {
    const url = `${BASE_URL}/events`;

    try {
      const res = await axios.get(url);
      // console.log("fetchAllEvents()", res.data);
      this.setState({ allEvents: res.data });
      this.setState({ loading: false });
    } catch (err) {
      console.log("ERROR FETCHING ALL EVENTS: ", err);
    }
  };

  componentDidMount() {
    this.fetchAllEvents();
  }

  handleClick = (id) => {
    // console.log("Clicked: ", id);
    this.props.history.push(`/event/${id}`);
  };

  returnSearch = (res) => {
    this.props.history.push(`/search/${res}`);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <img src={loading} />
        </div>
      );
    } else {
      return (
        <div className="pages-wrapper" id="homepage">
          <div className="search-bar">
            <Search returnSearch={this.returnSearch} />
          </div>

          <div className="tiles">
            <ul>
              {this.state.allEvents.map((event) => {
                return (
                  <li key={event.id} onClick={() => this.handleClick(event.id)}>
                    <AdvancedImage
                      className="img"
                      cldImg={cld
                        .image(event.image)
                        .resize(fill().width(200).height(150))}
                    />
                    <div className="content">
                      <p className="title">{event.name}</p>
                      <p className="tile-info">
                        {" "}
                        <strong>Venue:</strong> {event.venue.name}
                      </p>
                      <p className="tile-info">
                        <strong>Date:</strong> {event.date}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
}
