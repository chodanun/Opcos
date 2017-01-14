import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import MyScene2 from './MyScene2'

export default class MyScene extends Component {
  

  _onForward = () => {
    this.props.navigator.push({
      component: MyScene2,
      title: 'Scene 2',
    });
  }

  render() {

    return (
      <View style={{marginTop:100}}>
        <Text> Current Scene 2 </Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>

        
      </View>
    )
  }
}