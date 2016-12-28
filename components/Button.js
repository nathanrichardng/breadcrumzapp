/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

const {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class Button extends Component {

	constructor(props) {
		super(props);
	}

	render() {
	    var TouchableElement = TouchableHighlight;
	    if (Platform.OS === 'android') {
	     	TouchableElement = TouchableNativeFeedback;
	    }
	    return (
		    <View style={this.props.buttonStyle}>
		      	<TouchableElement 
		      		onPress={this.props.onPress}>
			        <View style={styles.submitButton}>
				        <Text style={this.props.textStyle}>{this.props.text}</Text>
			        </View>
			    </TouchableElement>  
		    </View> 
	    );
	}
}

Button.propTypes = {
	text: React.PropTypes.string,
	onPress: React.PropTypes.func,
	buttonStyle: React.PropTypes.object,
	textStyle: React.PropTypes.object,
}

Button.defaultProps = {
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
}

const styles = StyleSheet.create({
  	submitButton: {
    	flex: 1, 
    	flexDirection: 'column', 
    	justifyContent: 'center',
  	},
});

module.exports = Button;