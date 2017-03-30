import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Container, Content, Tabs, List, ListItem } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export class Details extends Component {

	constructor(props) {
        super(props);
        this.state = {
           
        }
	}


  	render() {
	   return (
            <View>
              <Text>Hello Details</Text>
            </View>
              
            

	    );
	  }

}

const styles = StyleSheet.create({
  container :{
    flex:1,
  },

})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Details);
