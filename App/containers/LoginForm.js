import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
const {
	View,
	TextInput,
	Text,
	StyleSheet,
	Button,
} = ReactNative

class LoginForm extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			username:'',
			password:'',
		}
	}
	
	onPressLogin(){
		console.log("TEST")
	}

	render(){
		return (
			<View>
				<TextInput 
					label="username"
					placeholder="Username"
					value={this.state.username}
					onChangeText={ username => this.setState({ username })}
					style={{ height: 20, width: 100 }}
				/>
				<TextInput 
					autoCorrect={false}
					secureTextEntry
					label="password"
					placeholder="password"
					value={this.state.password}
					onChangeText={ password => this.setState({ password })}
					style={{ height: 20, width: 100 }}
				/>
				<Button
					onPress={ () => this.onPressLogin() }
					title="LOGIN"
					color="#841584"
					accessibilityLabel="Learn more about this purple button"
				/>
			</View>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)