import React, { Component } from 'react';
import SideBar from './SideBar';
import Map from './Map';



class MainContainer extends Component {
  render() {
    return (
      <div className="Main-container">
        <SideBar {...this.props}   handleListItemClick={this.props.handleListItemClick}/>
        <Map {...this.props} handleMarkerClick={this.props.handleMarkerClick}  updateSuperState={this.props.updateSuperState}/>
      </div>

    );
  }
}

export default MainContainer;
