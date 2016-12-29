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

  constructor(props) {
    super(props);
    this.getPosition = this.getPosition.bind(this);
    this.state = {
      lastPosition: {coords: {latitude: 'unknown', longitude: 'unknown'}},
    } 
  }

  componentDidMount() {
    // get position
    this.getPosition();
    // set interval to update position and save id so it can be cleared on unmount
    this.gpsUpdateInterval = setInterval(() => {
      //need to use this instead of watchInterval, because the latter doesnt update location as desired.
      this.getPosition();
    }, 10000);

  }

  componentWillUnmount() {
    // clear gps update interval
    clearInterval(this.gpsUpdateInterval);
  }

  getPosition() {
  	navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lastPosition: position });
        this.props.onLocationChange(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
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