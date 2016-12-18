/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const CrumbResource = require('../resources/CrumbResource');
const ModalButton = require('./ModalButton.js');

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

class AddCrumbButton extends Component {
  constructor(props) {
    super(props);
    this._setCommentText = this._setCommentText.bind(this);
    this._submitComment = this._submitComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      comment: ''
    }
  }

  componentDidMount() {
    this.crumbResource = new CrumbResource();
  }

  alert() {
    console.log("testing");
  }

  _setCommentText(text) {
    this.setState({ comment: text });
  }

  _submitComment() {
    if(this.state.comment.trim() == '') { return false; }
    const coords = this.props.coords;
    const crumb = {
      message: this.state.comment,
      longitude: coords.longitude,
      latitude: coords.latitude,
    }
    console.log(JSON.stringify(crumb));
    this.crumbResource.addCrumb(crumb);
    //.then(implement notification handler);
    this.setState({ comment: '' });
  }

  onSubmit() {
    this._submitComment();
    this.refs.modal._hideModal();
  }

  render() {
    return (
      <ModalButton ref="modal" text="Crumb it!" onSubmit={this.onSubmit}>
        <TextInput
          autoFocus={true}
          onSubmitEditing={this.onSubmit}
          style={styles.commentText}
          onChangeText={this._setCommentText}
          value={this.state.comment} />
      </ModalButton>
    )
  }
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
  commentText: {
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
}

module.exports = AddCrumbButton;
