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
	      <View style={styles.scene} >
	      	<Text style={styles.count} >
	      		Count : {this.props.num}
	      	</Text>
	      	<TouchableHighlight onPress={()=>this.addCount()} style={styles.buttonCount} >
		      	<Text>
		      		Add
		      	</Text>
	      	</TouchableHighlight>

	      	<Home {...this.props} style={styles.home} />

	      </View>

	    );
	  }

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  count : {
  	flex : 0.025,
  	marginTop : 20,
  },
  buttonCount : {
  	flex : 0.025,
  },
  home : {
  	flex : 0.95,
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
