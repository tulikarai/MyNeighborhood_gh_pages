import React, { Component } from 'react';
import VenueList from  "./VenueList";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleFilterVenues = () => {
   if (this.state.query.trim() !== '') {
     const venues = this.props.venues.filter(venue =>
       venue.name.toLowerCase().includes(this.state.query.toLowerCase())
     );
     return venues;
   }
   return this.props.venues;
  };

  /** This handleSearchChange method is called when input search
      string is changed
  **/
  handleSearchChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      /**  calling toLowerCase() method of String to make the
           the Strings case-insensitive for matching
      **/
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      marker.isOpen = false;
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };

  render() {
    return(
      <div className="Side-bar">
        <input type={"search"} id={"search"} placeholder={"Filter Venues"}
        onChange={this.handleSearchChange}
        tabIndex = {0}
        aria-label="Filter Search For Elementary Schools In Englewood, Colorado"
        />
        <VenueList
            {...this.props}
            venues={this.handleFilterVenues()}
            handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
