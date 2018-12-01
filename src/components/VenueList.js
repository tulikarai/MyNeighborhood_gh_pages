import React, { Component } from "react";
import VenueListItem from "./VenueListItem";

export default class VenueList extends Component{
  render(){
    return(
      <ul>
        { this.props.venues && this.props.venues.map(
            (venue) => (
              < VenueListItem key={venue.id} {...venue} handleListItemClick={this.props.handleListItemClick} />
            )
           )
        }
      </ul>
    )
  }
}
