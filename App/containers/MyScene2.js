import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene extends Component {
  onBack() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={{marginTop:100}}>
        <Text>Current Scene: {this.props.route.title}</Text>

        <TouchableHighlight onPress={ () =>this.onBack() }>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}