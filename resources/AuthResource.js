/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react');
var ReactNative = require('react-native');
var {
  AsyncStorage,
} = ReactNative;

var USER_TOKEN = 'USER_TOKEN';

class AuthResource {

  register(user) {
    return fetch('https://breadcrumz.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("added user: " + JSON.stringify(user));
      var token = responseData.token;
      AsyncStorage.setItem(USER_TOKEN, token)
      return token;
    }).catch(function (err) {
      console.log("Error adding user: " + err);
      return "error adding user: " + err;
    });
  }

  getToken() {
    var token = AsyncStorage.getItem(USER_TOKEN);
    if(token == null) {
      return false;
    }
    return token;
  }

  async userValid() {
    // get token
    var token = await this.getToken();
    if(!token) { return false; }
    // check user valid
    return fetch(`https://breadcrumz.herokuapp.com/api/authenticate?token=${token}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.success) {
        return token;
      }
      else {
        return false;
      }
    }).catch(function (err) {
      console.log("Error vaidating user: " + err);
      return false;
    });
  }
}

module.exports = AuthResource;