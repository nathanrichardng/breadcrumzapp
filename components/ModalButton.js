/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Button,
} = ReactNative;

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this._showModal = this._showModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._submitModal = this._submitModal.bind(this);
    this.state = {
      modalVisible: false,
    }
  }

  _showModal() {
    this.setState({ modalVisible: true });
  }

  _hideModal() {
    this.setState({ modalVisible: false });
  }

  _submitModal() {
    this.props.onSubmit();
  }

  _onRequestClose() {
    return;
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.fullWidth}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this._onRequestClose}>
            <View style={styles.container}>
              {this.props.children}
                <Button 
                  color="steelblue"
                  title={this.props.submitText}
                  onPress={this._submitModal} />
            </View>
        </Modal>
        <Button
          color="steelblue"
          onPress={this._showModal}
          title={this.props.text} />
      </View> 
    )
  }
}

ModalButton.propTypes = {
  onSubmit: React.PropTypes.func,
  submitButtonStyle: React.PropTypes.object,
  submitTextStyle: React.PropTypes.object,
  submitText: React.PropTypes.string,
  text: React.PropTypes.string,
  buttonStyle: React.PropTypes.object,
  textStyle: React.PropTypes.object,
}

ModalButton.defaultProps = {
  text: 'Submit',
  buttonStyle: {
      backgroundColor: 'steelblue',
      justifyContent: 'center',
      alignSelf: 'stretch',
      height: 50,
      marginLeft: 0,
      marginRight: 0,
  },
  textStyle: {
      textAlign: 'center',
      color: '#fff',
  },
  onSubmit: function() {
    return true;
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  fullWidth: {
    alignSelf: 'stretch',
  }
}

module.exports = ModalButton;
