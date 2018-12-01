import React, { Component } from "react";

export default class VenueListItem extends Component{
  render(){
    return(
      <li onClick = {() => this.props.handleListItemClick(this.props)}
          onKeyPress = {() => this.props.handleListItemClick(this.props)}
          tabIndex = {0}
          aria-label={this.props.name}
          role="button"
          aria-pressed="false">
          {this.props.name}
      </li>
    )
  }
}
