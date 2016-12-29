/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const ListItem = require('./ListItem.js');

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} = ReactNative;

class List extends Component {
  constructor(props) {
    super(props);
  }

  renderItems() {
    // quit if no array supplied for list
    if(!Array.isArray(this.props.items)) { return false; }
    // otherwise render items
    var titleKey = this.props.titleKey ? this.props.titleKey : 'title';
    var textKey = this.props.textKey ? this.props.textKey : 'text';
    var itemNodes = this.props.items.map(function(item, index) {
      return <ListItem title={item[titleKey]} text={item[textKey]} key={index} />
    })
    return itemNodes;
  }

  render() {
    return (
      <View style={styles.list}>
        <ScrollView>
          {this.renderItems()}
        </ScrollView>
      </View>
    )
  }
}

List.propTypes = {
  titleKey: React.PropTypes.string,
  textKey: React.PropTypes.string,
  items: React.PropTypes.array
}

List.defaultProps = {
  titleKey: 'title',
  textKey: 'text',
  items: []
}

const styles = {
  list: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  }
}

module.exports = List;
