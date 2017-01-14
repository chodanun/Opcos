import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene2 extends Component {
  _onBackward = () => {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={{marginTop:100}}>
        <Text> Scene2 </Text>
        <TouchableHighlight onPress={this._onBackward}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}