/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
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
    this.state = {
      crumbs: [],
    } 
  }

  componentDidMount() {
      fetch('https://johhnnytest:testing1234@breadcrumz.herokuapp.com/api/crumbs?longitude=-101&lattitude=101', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
        window.alert(JSON.stringify(responseData));
        this.setState({ crumbs: responseData });
      }).catch(function (err) {
        window.alert(err);
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
