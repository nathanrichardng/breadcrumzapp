/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const GPS = require('./components/GPS.js');
const LoginPage = require('./components/LoginPage.js');
const CrumbsList = require('./components/CrumbsList.js');
const AddCrumbButton = require('./components/AddCrumbButton.js');

export default class breadcrumzapp extends Component {
  constructor(props) {
    super(props);
    this.updateCoords = this.updateCoords.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.updateCrumbs = this.updateCrumbs.bind(this);
    this.state = {
      authenticated: false,
      coords: false,
      ready: false,
    } 
  }

  updateCoords(position) {
    this.setState({
      coords: position.coords,
      ready: true,
    });
  }

  authenticate(token) {
    this.setState({
      authenticated: true
    });
  }

  updateCrumbs() {
    const coords = this.state.coords;
    this.refs.crumbsList.getCrumbs(coords);
  }

  renderView() {
    // display login page if not authenticated
    if(!this.state.authenticated) {
      return (
        <LoginPage 
          onAuthentication={this.authenticate}/>
      )
    }
    // otherwise load crumbs
    if(this.state.ready) {
      return (
        <View style={styles.container}>
          <Text>
            {this.state.coords.longitude}, {this.state.coords.latitude}
          </Text>
          <CrumbsList coords={this.state.coords} ref="crumbsList"/>
          <AddCrumbButton coords={this.state.coords} onSubmit={this.updateCrumbs} />
        </View>
      );
    }
    else {
      return (
        <Text>Loading</Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.fullWidth}>
        <GPS onLocationChange={this.updateCoords} />
        <Text style={styles.welcome}>
          BreadCrumz
        </Text>
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fullWidth: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('breadcrumzapp', () => breadcrumzapp);
