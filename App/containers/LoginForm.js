import firebase from 'firebase';
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Spinner } from '../components';
import { Scene, Router, Actions } from 'react-native-router-flux';
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
			email:'',
			password:'',
			error:'',
			loading: false,
		}
	}
	
	clearErrorDisplayed(){
		this.setState({
			error : '',
			loading: true,
		})
	}

	onLoginSuccess(){
		this.setState({
			loading: false,
			email: '',
			password: '',
			error:'',
		})
	}

	onLoginFail(){
		this.setState({ 
			error: 'Authentication Failed.',
			loading: false ,
		})
	}

	onPressLogin(){
		this.clearErrorDisplayed()
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(this.onLoginSuccess.bind(this))
		.catch((signInError) => {
			this.onLoginFail()
		})
	}
	

	onPressRegist(){
		Actions.regist()
	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size='small' />
		}
		else{
			return <View>
					<Button
						onPress={ () => this.onPressLogin() }
						title="Login"
						color="#841584"
						accessibilityLabel="Learn more about this purple button"
					/>
					<Button
						onPress={ () => this.onPressRegist() }
						title="Register"
						color="#841584"
						accessibilityLabel="Learn more about this purple button"
					/>
					</View>
		}
	}

	renderScene(){
		if (this.props.status_user == false){
			return (
				<View>
					<TextInput 
						autoCorrect={false}
						placeholder="email"
						value={this.state.email}
						onChangeText={ email => this.setState({ email })}
						style={{ height: 20, width: 200 }}
					/>
					<TextInput 
						autoCorrect={false}
						secureTextEntry
						placeholder="password"
						value={this.state.password}
						onChangeText={ password => this.setState({ password })}
						style={{ height: 20, width: 200 }}
					/>
					<Text> {this.state.error} </Text>
					{this.renderButton()} 
				</View>
			)
		}
		else{
			return <View/>
		}
		
	}
	render(){
		return (
			<View>

				{this.renderScene()}
				
			</View>
		)
	}
}

function mapStateToProps(state){
	return {
		status_user: state.status_user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)