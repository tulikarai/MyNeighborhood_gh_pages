import Helper from './Helper.js';

export default class FourSquareAPI {
  static getVenues(urlParams) {
    return Helper.simpleFetch('/venues/search', urlParams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`);
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`);
  }
}
