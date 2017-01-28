import firebase from 'firebase'
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
		this.state = {
			loggedIn: null
		}
	}

	// Initialize Firebase
	componentWillMount(){
		const config = {
			apiKey: 'AIzaSyDXZCNAAv3XCQy-c5GxYTBzO2iVLXxl0cM',
			authDomain: 'opcos-9267e.firebaseapp.com',
			databaseURL: 'https://opcos-9267e.firebaseio.com',
			storageBucket: 'opcos-9267e.appspot.com',
			messagingSenderId: '655410303822',
		}
		firebase.initializeApp(config)

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// name = user.displayName;
				// email = user.email;
				// photoUrl = user.photoURL;
				// emailVerified = user.emailVerified;
				// uid = user.uid; 
				this.setState({ loggedIn: true });
			}
			else {
				this.setState({ loggedIn: false });
			}
			this.updateStatusUser()
		})
		
	}

	updateStatusUser(){
		if (this.state.loggedIn)
			this.props.updateStatusUser(this.state.loggedIn,"opcos")
		else
			this.props.updateStatusUser(this.state.loggedIn,null,null)
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
	// num : state.num,
	status_user : state.status_user ,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
