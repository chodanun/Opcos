import firebase from 'firebase';
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Spinner } from '../components';
const {
	View,
	TextInput,
	DatePickerIOS,
	Text,
	StyleSheet,
	Button,
} = ReactNative

class LoginForm extends Component {
	
	static defaultProps = {
		date: new Date(),
		timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  	}

	constructor(props) {
		super(props)
		this.state = {
			email:'',
			password:'',
			confirm_password:'',
			error:'',
			loading: false,
			fullname:'',
			sirname:'',
			dateOfBirth: this.props.date,
			timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
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
			fullname:'',
			sirname:'',
			dateOfBirth:'',
		})
	}

	onLoginFail(error){
		this.setState({ 
			error,
			loading: false ,
		})
	}

	onPressRegist(){
		const { email, password , confirm_password} = this.state
		if (password == confirm_password){
			this.clearErrorDisplayed()
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch((signUpError) => {
				const signUpErrorDetail = `code: ${signUpError.code} message: ${signUpError.message}`
				this.onLoginFail(signUpErrorDetail)
				
			})	
		}
		else{
			this.setState({
				error: 'password not matched'
			})
		}
		
	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size='small' />
		}
		else{
			return <Button
						onPress={ () => this.onPressRegist() }
						title="Register"
						color="#841584"
						accessibilityLabel="Learn more about this purple button"
					/>
		}
		// firebase.auth().signOut() }
	}

	onDateChange(date){
		this.setState({
			dateOfBirth:date,
		})
	}

	render(){
		return (
			<View>
				<TextInput 
					autoCorrect={false}
					placeholder="fullname"
					value={this.state.fullname}
					onChangeText={ fullname => this.setState({ fullname })}
					style={{ height: 20, width: 200 }}
				/>
				<TextInput 
					autoCorrect={false}
					placeholder="sirname"
					value={this.state.sirname}
					onChangeText={ sirname => this.setState({ sirname })}
					style={{ height: 20, width: 200 }}
				/>
				
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
				<TextInput 
					autoCorrect={false}
					secureTextEntry
					placeholder="confirm password"
					value={this.state.confirm_password}
					onChangeText={ confirm_password => this.setState({ confirm_password })}
					style={{ height: 20, width: 200 }}
				/>
				<Text> {this.state.error} </Text>
				{this.renderButton()} 
				
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

// <DatePickerIOS
// 					date={this.state.dateOfBirth}
// 					mode="date"
// 					timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
// 					onDateChange={ (date) => {this.onDateChange(date)} }
// 				/>