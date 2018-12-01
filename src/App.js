import React, { Component } from 'react';
import './App.css';

import ErrorPage from './components/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContainer from './components/MainContainer';
import FourSquareAPI from './api/FourSquareAPI';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        fetchError: false,
        errorMessage: '',
        center: [],
        venues: [],
        markers: [],
      }
    }

    /* This method will change state from child component */
    updateSuperState =  obj => {
      this.setState(obj);
    }

    componentDidMount() {

      let urlParams = {
        query: 'Elementary Schools',
        near: 'Englewood, CO',
        limit: 10
      };

      FourSquareAPI.getVenues(urlParams)
      .then( res => {
          // Selected Venues
          const { venues } = res.response;

          // Center of the map
          const { center } = res.response.geocode.feature.geometry;

          // Creating markers for selected venues
          const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });
        this.setState({ center, venues, markers});

      })
      .catch((error) => {
          this.updateSuperState({fetchError: true, errorMessage: 'Error While getting All Locations data from FourSquare API'});
      });
  }

    // Methods to change the state of markers

    closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });

    this.setState({ markers: markers});
  };

  openMarker = (marker) => {
    this.closeAllMarkers();

    const markers = this.state.markers.map(markerToOpen => {
        if(markerToOpen.id === marker.id)
            markerToOpen.isOpen = true;

      return markerToOpen;
    });

    this.setState({ markers: markers});
  }

  handleMarkerClick=(marker) => {
      this.openMarker(marker);
      const venue = this.state.venues.find(venue => venue.id === marker.id);

      FourSquareAPI.getVenueDetails(marker.id)
      .then(res => {
          const newVenue = Object.assign(venue, res.response.venue);
          this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      })
      .catch((error) => {
          this.updateSuperState({fetchError: true, errorMessage: 'Error While getting Location data from FourSquare API'});
      });
  }


   //*********************************************
   //This method is called when an item is clicked in the sidebar
  handleListItemClick = venue => {
      const marker = this.state.markers.find(marker => marker.id === venue.id);
      this.handleMarkerClick(marker);
  };

  /*************************************************/

  render() {

    if(this.state.fetchError)
      return(<ErrorPage errorMessage={this.state.errorMessage}/>)
    else{
    return (

      <div className="App">
        <Header />
        <MainContainer
          {...this.state}
          handleListItemClick={this.handleListItemClick}
          handleMarkerClick={this.handleMarkerClick}
          updateSuperState={this.updateSuperState}
        />
        <Footer />
      </div>
    )
  }
  }
}

export default App;
