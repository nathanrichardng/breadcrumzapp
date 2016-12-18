/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

const {
  Platform,
} = ReactNative;

class GPS extends React.Component {
  state = {
    initialPosition: {coords: {latitude: 'unknown', longitude: 'unknown'}},
    lastPosition: {coords: {latitude: 'unknown', longitude: 'unknown'}},
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.props.onLocationChange(position);
      var lastPosition = position;
      this.setState({lastPosition});

    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getPosition() {
  	return this.state.lastPosition;
  }

  render() {
    return false;
  }
}

GPS.propTypes = {
  onLocationChange: React.PropTypes.func.isRequired,
}

GPS.defaultProps = {
  onLocationChange: function(position) {
    console.log("implement GPS.onLocationChange prop");
    return true;
  }
}

module.exports = GPS;