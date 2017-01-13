import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import MyScene2 from './MyScene2'
export default class MyScene extends Component {
   _navigate(){
      this.props.navigator.push({
        component: MyScene2, // Matches route.name
      })
    }
  render() {
    console.log(this.props)
    return (
      <View style={{marginTop:100}}>
        <Text> Scene </Text>
        <TouchableHighlight onPress={ () => this._navigate() }>
          <Text>GO To View</Text>
        </TouchableHighlight>
      </View>
    )
  }
}