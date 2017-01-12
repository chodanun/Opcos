import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Home from '../components/Home'
import {
  Animated,
  StyleSheet,
  View,
  Text,
  NavigationExperimental,
  TouchableHighlight
} from 'react-native'



export class AppContainer extends Component {

	constructor(props) {
	  super(props);
	  // this.state = {num:0};
	}

	addCount(){
		this.props.add()
	}

  	render() {
	   return (
	      <View>
	      	<Text style={{marginTop:20}}>
	      		Count : {this.props.num}
	      	</Text>
	      	<TouchableHighlight onPress={()=>this.addCount()} >
	      	<Text>
	      		Add
	      	</Text>
	      	</TouchableHighlight>

	      	<Home {...this.props} />

	      </View>

	    );
	  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
