import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import MyScene2 from './MyScene2'
export default class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  _onForward = () => {
    this.props.navigator.push({
      component: MyScene2 ,
      passProps : {
        title: 'My Scene2',
      }
    });
  }

  render() {
    console.log(this.props)
    return (
      <View style={{marginTop:100}}>
        <Text>Current Scene: { this.props.route.title } </Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
      </View>
    )
  }
}