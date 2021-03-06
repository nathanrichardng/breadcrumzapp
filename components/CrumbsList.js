/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const CrumbResource = require('../resources/CrumbResource');
const List = require('./List.js');

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

class CrumbsList extends Component {
  constructor(props) {
    super(props);
    this.getCrumbs = this.getCrumbs.bind(this);
    this.state = {
      crumbs: [],
    } 
  }

  componentDidMount() {
    this.crumbResource = new CrumbResource();
    const coords = this.props.coords;
    this.getCrumbs(coords);
  }

  componentWillReceiveProps(nextProps) {
    const coords = nextProps.coords;
    this.getCrumbs(coords);
  }

  getCrumbs(coords) {
    this.crumbResource.getCrumbs(coords.longitude, coords.latitude).then((crumbs) => {
      this.setState({ crumbs: crumbs });
    });
  }

  render() {
    return (
      <List items={this.state.crumbs} titleKey="addedBy" textKey="message" />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 75,
    alignSelf: 'stretch',
    borderColor: '#e1e1e1',
    borderWidth: 1,
  },
});

module.exports = CrumbsList;
