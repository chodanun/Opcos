import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import RouterComponent from './Router'

export class AppContainer extends Component {

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
		this.setDefaultAuthSystem()
		
	}	

	setDefaultAuthSystem(){
		let login_obj = {
			email: '',
			isLogin: null,
			loginMethod: '',
		}
		this.props.updateStatusUser(login_obj)
	}

	render() {
		return (
			<RouterComponent />
		)
	}
}

function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AppContainer)


