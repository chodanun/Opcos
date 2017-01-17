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
  NavigatorIOS,
  TouchableHighlight
} from 'react-native'

export class AppContainer extends Component {

	constructor(props) {
	  super(props);
	  // this.state = {num:0};
	}

  _changeSceneCosmeticsSearch(){
    this.props.changeSceneCosmeticsSearch()
  }
  
  render() {
    return (
        <NavigatorIOS
        initialRoute={{
          component: ApplicationTabs,
          title: 'OPCOS',
          rightButtonSystemIcon: 'search',
          onRightButtonPress: () => this._changeSceneCosmeticsSearch() ,
          backButtonTitle: 'Back',
        }}
        style={{flex: 1}}
      />
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
