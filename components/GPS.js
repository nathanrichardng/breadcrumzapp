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

    // save watch id so it can be cleared on unmount
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = position;
        this.setState({lastPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 5000}
    );

    // save interval id so it can be cleared on unmount
    // call this in a separate interval from watchPosition to ensure its not called too often
    this.gpsUpdateInterval = setInterval(() => {
      this.props.onLocationChange(this.state.lastPosition);
    }, 5000);

  }

  componentWillUnmount() {
    // clear geolocation watch
    navigator.geolocation.clearWatch(this.watchID);
    // clear gps update interval
    clearInterval(this.gpsUpdateInterval);
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