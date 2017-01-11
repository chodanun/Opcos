import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {
  Animated,
  StyleSheet,
  View,
  NavigationExperimental
} from 'react-native';

class AppContainer extends Component {

  render() {
   return (
      <View/>

    );
  }

}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ActionCreators, dispatch);
// }

// function mapStateToProps(state) {
//   return {
    
//   };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
