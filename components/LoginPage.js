/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const AuthResource = require('../resources/AuthResource.js');

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
} = ReactNative;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.focusPassword = this.focusPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.authResource = new AuthResource();
    //check if already authenticated with token
    this.authResource.userValid().then((token) => {
      if(token) {
        this.props.onAuthentication(token);
      }
    });
  }

  setUsername(username) {
    this.setState({ username: username });
  }

  setPassword(password) {
    this.setState({ password: password });
  }

  focusPassword() {
    this.refs.password.focus();
  }

  async onSubmit() {
    console.log("submitted username: " + this.state.username + " password: " + this.state.password);
    var user = {
      username: this.state.username,
      password: this.state.password
    }
    var token = this.authResource.register(user);
    this.props.onAuthentication(token);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={this.focusPassword}
          style={styles.inputText}
          onChangeText={this.setUsername}
          value={this.state.username} />
        <TextInput
          placeholder="Password"
          ref="password"
          onSubmitEditing={this.onSubmit}
          style={styles.inputText}
          onChangeText={this.setPassword}
          secureTextEntry={true}
          value={this.state.password} />
        <Button
          onPress={this.onSubmit}
          title="Submit" />
      </View> 
    )
  }
}

LoginPage.propTypes = {
  onAuthentication: React.PropTypes.func.isRequired
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  buttonStyle: {
      backgroundColor: 'steelblue',
      justifyContent: 'center',
      alignSelf: 'stretch',
      height: 50,
      marginLeft: 0,
      marginRight: 0,
  },
  inputText: {
    paddingLeft: 10,
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
    alignSelf: 'stretch',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
  }
}

module.exports = LoginPage;
