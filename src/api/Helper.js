
//Base URL
const baseURL = `https://api.foursquare.com/v2`;

//Authentication Variables
const client_id = 'YOUR_CLIENT_ID';
const client_secret = 'YOUR_CLIENT_SECTRET';
const v = '20181111';

const auth = `client_id=${client_id}&client_secret=${client_secret}&v=${v}`;

class Helper {

  static getQueryString(params) {
    if (!params) {
      return '';
    }

    let arrParam=[];
    let queryString = '';

    for(var key in params){
      arrParam.push(`${key}=${params[key]}`);
    }
      queryString = arrParam.join('&');
      return queryString;
  }

  static getURL_to_fetch(endpoint,params){
    let fetchURL = (`${baseURL}${endpoint}?${auth}&${Helper.getQueryString(params)}`);
    return fetchURL;
  }

  static simpleFetch(endpoint, urlParams='') {
      let fetchURL = Helper.getURL_to_fetch(endpoint,urlParams);

      return fetch(fetchURL)
      .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
      }).then((responseJson) => {
              return responseJson;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
  }
}

export default Helper;
