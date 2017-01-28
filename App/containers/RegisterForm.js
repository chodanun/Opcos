import firebase from 'firebase';
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Spinner } from '../components';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Button, Card,  CardItem, Text  } from 'native-base'
const {
	View,
	TextInput,
	DatePickerIOS,
	StyleSheet,
} = ReactNative

class LoginForm extends Component {
	
	static defaultProps = {
		date: new Date(),
	}

	constructor(props) {
		super(props)
		this.state = {
			email:'',
			password:'',
			confirm_password:'',
			error:'',
			loading: false,
			displayName: '',
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
			displayName:'',
			sirname:'',
			dateOfBirth:'',
		})
	}

	onLoginFail(error){
		this.setState({ 
			error: error,
			loading: false ,
		})
	}

	onPressRegist(){
		this.setState({error:''})
		const { email, password ,displayName} = this.state
		
		this.clearErrorDisplayed()
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then( ()=>{
			var user = firebase.auth().currentUser
			user.updateProfile({
			  displayName: displayName ,
			  photoURL: "https://www.stickboybangkok.com/images/2015/06/who-is-stickboy.jpeg"
			})
			this.onLoginSuccess.bind(this)
		})
		.catch((signUpError) => {
			const signUpErrorDetail = `code: ${signUpError.code} message: ${signUpError.message}`
			this.onLoginFail(signUpErrorDetail)
			
		})	
		
	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size='small' />
		}
		else{
			if (this.state.password!= '' && this.state.password == this.state.confirm_password )
				return	<Button block success onPress={ () => this.onPressRegist()} >
							Register 
						</Button>
			else
				return	<Button block danger onPress={() => this.setState({error:'code: password does not match'}) } > Register </Button>
		}
		// firebase.auth().signOut() }
	}

	onDateChange(date){
		this.setState({
			dateOfBirth:date,
		})
	}

	renderError(){
		if (this.state.error!= '')
		return <Card style={styles.error}>
	                <CardItem>                        
	                    <Text>
	                        {this.state.error}
	                    </Text>
	                </CardItem>
	            </Card>
	}
	render(){
		return (
			<Container>
				<Content>
					<List>
						<ListItem>
							<InputGroup>
								<Icon name='ios-person' />
								<Input 
									placeholder='EMAIL' 
									onChangeText={ email => this.setState({ email })}
									value = {this.state.email}
								/>
							</InputGroup>
						</ListItem>

						<ListItem>
							<InputGroup>
								<Icon name='ios-unlock' />
								<Input 
									placeholder='PASSWORD' 
									secureTextEntry={true}
									onChangeText={ password => this.setState({ password })}
								/>
							</InputGroup>
						</ListItem>

						<ListItem>
							<InputGroup>
								<Icon name='ios-unlock' />
								<Input 
									placeholder='VERIFY PASSWORD' 
									secureTextEntry={true}
									onChangeText={ confirm_password => this.setState({ confirm_password })}
								/>
							</InputGroup>
						</ListItem>

						<ListItem>
							<InputGroup >
								<Input
									autoCorrect={false}
									inlineLabel label='NAME' 
									placeholder='John Doe' 
									value={this.state.displayName} 
									onChangeText={ displayName => this.setState({ displayName })}
								/>
							</InputGroup>
						</ListItem>
					</List>
					{this.renderButton()}
					{this.renderError()}

				</Content>
			</Container>
		)
	}
}
const styles = StyleSheet.create({
	error : {
		marginTop: 0,
	}
})

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