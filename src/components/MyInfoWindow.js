import React, { Component } from 'react';
import { InfoWindow } from "react-google-maps"


export default class MyInfoWindow extends Component {

  render(){
    let imgSrc;

    //console.log("MyInfoWindow");
    const venueInfo = this.props.venueInfo;
    if(venueInfo.bestPhoto)
      imgSrc = `${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`;
    else
      imgSrc = "";

    return(
      <InfoWindow aria-label="Information about the selected venue" >
        <React.Fragment >
        <p>
            {venueInfo.name}
            <br/>
            {venueInfo.location.formattedAddress[0]}
            <br />
            {venueInfo.location.formattedAddress[1]}
         </p>
        <img
          src={`${imgSrc}`}
          alt={`${venueInfo.name}`}
        />
        </React.Fragment>
      </InfoWindow>
    )
  }
}
