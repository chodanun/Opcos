import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ApplicationTabs from './ApplicationTabs'
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
	}

	addCount(){
		this.props.add()
	}

  	render() {
	   return (
	      <View style={styles.scene} >
	      	<Text style={styles.count} >
	      		Count : {this.props.num}
	      	</Text>
	      	<TouchableHighlight onPress={()=>this.addCount()} style={styles.buttonCount} >
		      	<Text>
		      		Add
		      	</Text>
	      	</TouchableHighlight>
	      </View>

	    );
	  }

}

const styles = StyleSheet.create({
  scene: {
    marginTop:20,
    flex: 1,
  },
  count : {
  	
  },
  buttonCount : {
  	
  },
  

})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
