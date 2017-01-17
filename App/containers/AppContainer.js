import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import RouterComponent from './Router'
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native'

export class AppContainer extends Component {

	constructor(props) {
	  super(props);
	  // this.state = {num:0};
	}

  render() {
    return (
        <RouterComponent />
        // <ApplicationTabs {...this.props} style={styles.tabs}/>
      )
	    
	  }

}

const styles = StyleSheet.create({
  tabs : {
  	flex : 1,
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
