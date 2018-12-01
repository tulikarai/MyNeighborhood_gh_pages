/* global google */

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { PureComponent } from 'react';

import ErrorPage from './ErrorPage';
import MyInfoWindow from './MyInfoWindow';

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (

  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 39.64777, lng: -104.98776 }}
    center={{
        lat: parseFloat(props.center.lat),
        lng: parseFloat(props.center.lng)
      }}
    zoom={12}
  >
    { props.markers &&
      props.markers
        .filter(marker => marker.isVisible)
        .map((marker, index, arr) => {
          //venueInfo of the open marker for InfoWindow
          const venueInfo = props.venues.find(
            venue => venue.id === marker.id
          );
          return (
            <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
                animation={
                  (arr.length === 1 || marker.isOpen)
                    ? google.maps.Animation.BOUNCE
                    : google.maps.Animation.DROP
                }
              >
              {marker.isOpen && (
                <MyInfoWindow venueInfo={venueInfo} />
              )
              }
            </Marker>
          )
      })
    }
  </GoogleMap>

)));

export default class Map extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      mapAuthError: false,
      mapErrorMsg: ''
    }
  }

  componentDidMount() {
      window.gm_authFailure = () => {
        this.setState({mapAuthError: true, mapErrorMsg: 'Google Map Authentication Error'});
    };
  }

  render(){
    if(this.state.mapAuthError)
      return(<ErrorPage errorMessage={this.state.mapErrorMsg}/>)
    else{

    return(
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=YOUR_GOOGLE_API_KEY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `80vh`, width: `75vw` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
}
