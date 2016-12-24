/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

const AuthResource = require('../resources/AuthResource.js');

class CrumbResource {

  constructor() {
    this.authResource = new AuthResource();
  }

  async getCrumbs(lon, lat) {
    var token = await this.authResource.getToken();
    var crumbs = await fetch(`https://breadcrumz.herokuapp.com/api/crumbs?longitude=${lon}&latitude=${lat}&token=${token}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Fetched Crumbs: " + JSON.stringify(responseData));
      return responseData;
    }).catch(function (err) {
      console.log("Error fetching crumbs: " + err);
      return [];
    });

    return crumbs;
  }

  async addCrumb(crumb) {
    var token = await this.authResource.getToken();
    crumb.token = token;
    console.log("adding crumb: " + JSON.stringify(crumb));
    return fetch('https://breadcrumz.herokuapp.com/api/crumbs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crumb),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("added crumb: " + JSON.stringify(responseData));
      return responseData.message;
    }).catch(function (err) {
      console.log("Error adding crumb: " + err);
      return "error adding crumb: " + err;
    });
  }

}

module.exports = CrumbResource;