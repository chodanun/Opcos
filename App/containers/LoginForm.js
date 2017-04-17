import firebase from 'firebase';
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Spinner } from '../components';
import { Scene, Router, Actions } from 'react-native-router-flux'
import ReactNative from 'react-native'
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Button, Card, CardItem } from 'native-base'
import { SocialIcon } from 'react-native-elements'
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
  	LoginButton,
  	AccessToken
} = FBSDK;
const {
	View,
	TextInput,
	Text,
	StyleSheet,
	Image,
} = ReactNative

class LoginForm extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			email:'',
			password:'',
			error:'',
			loading: false,
			facebook_loading:false,

			isLogin:false,
			name:'',
			loginMethod:'',
		}
	}

	componentWillMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ 
					isLogin: true ,
					name : user.displayName,
					email : user.email,
					loginMethod: "firebase"
					// photoUrl = user.photoURL;
					// emailVerified = user.emailVerified;
					// uid = user.uid; 
				})
				this.updateStatusUser()
			}else{
				this.props.updateStatusUser({
					email: '',
					isLogin: false,
					loginMethod: '',
				})
			}
			
		})

	}

	updateStatusUser(){
		let login_obj = {
			email: this.state.email,
			isLogin: this.state.isLogin,
			loginMethod: this.state.loginMethod,
		}
		this.props.updateStatusUser(login_obj)
	}
	
	clearErrorDisplayed(){
		this.setState({
			error : '',
			loading: true,
		})
	}

	setFacebookLoading(){
		this.setState({
			facebook_loading: true ,
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

	onLoginFail(code,message){
		this.setState({ 
			error: message,
			loading: false ,
		})
		alert(this.state.error)
	}

	onPressLogin(){
		this.clearErrorDisplayed()
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(this.onLoginSuccess.bind(this))
		.catch((error) => {
			var errorCode = error.code;
  			var errorMessage = error.message;
			this.onLoginFail(errorCode,errorMessage)
		})
	}
	

	onPressRegist(){
		Actions.regist()
	}

	onPressLoginFacebook(){
		this.setFacebookLoading()
		LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday']).then(
		  (result) => {
		    if (result.isCancelled) {
		      // alert('Login was cancelled')
		    } else {
		      // alert('Login was successful with permissions: '
		        // + result.grantedPermissions.toString())
		        AccessToken.getCurrentAccessToken().then((data) => {
                		this.props.loginTokenFacebook(data.accessToken.toString()) 
                		this.setState({
                			isLogin: true,
							loginMethod: 'facebook',
                		})
                		let login_obj = {
							isLogin: this.state.isLogin,
							loginMethod: this.state.loginMethod,
							token: data.accessToken.toString()
						}   
                		this.props.updateStatusUser(login_obj)
           				this.onLoginSuccess()     		
                  }
                )
		        
		    }
		  },
		  function(error) {
		    alert('Login failed with error: ' + error);
		  }
		)
	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size='small' />
		}
		else{
			return <Button 
						block success
						onPress={ () => this.onPressLogin() }
						style ={styles.login_button}
					> Login </Button>
		}
	}

	renderFacebookButton(){

		if (this.state.facebook_loading)
			return <Spinner size='small' />
		else
			return <SocialIcon
				  title='Sign In With Facebook'
				  button type='facebook'
				  onPress={ () => this.onPressLoginFacebook() }
				  iconSize={20}
				  style={{height:42,margin:10,marginTop:0}}
				/>
	}

	renderScene(){
		if (this.props.status_user == false){
			return (
				<Container style={styles.container}>
	            	<View style={styles.logo} >
	            		<Text>..logo..</Text>
	            		<Text>OpCos</Text>
	            	</View>

	            	<View style={styles.input_form} >
	            		<View style={{flex:3,justifyContent:'center' }}>
		                    <List>
		                        <ListItem>
		                            <InputGroup>
		                                <Icon name='ios-person' />
		                                <Input 
		                                	placeholder='EMAIL'
		                                	value={this.state.email}
											onChangeText={ email => this.setState({ email })}
		                                />
		                            </InputGroup>
		                        </ListItem>

		                        <ListItem>
		                            <InputGroup>
		                                <Icon name='ios-unlock' />
		                                <Input 
		                                	placeholder='PASSWORD'
		                                	secureTextEntry={true}
		                                	value={this.state.password}
											onChangeText={ password => this.setState({ password })}
											onSubmitEditing={ ()=> this.onPressLogin() }
		                                />
		                            </InputGroup>
		                        </ListItem>
		                    </List>
		                </View>
		                <View style={{flex:1,justifyContent:'center'}}>
	                    	{this.renderButton()}
	                    </View>
	                    <View style={{flex:5}}>
							<View style={styles.text} >
		                		<Text> OR </Text>
		                	</View>
		                	{this.renderFacebookButton()}
							
						</View>
	                </View>

	                <View style={styles.footer}>
                		<Text>
	                		CREATE AN ACCOUNT?
	                	</Text>
	                	<Button 
							block warning
							onPress={ () => this.onPressRegist() }
							style = {styles.login_button}
						> Register 
						</Button>
					</View>
		        </Container>
				
			)
		}
		else{
			return <Spinner size='large' />
		}
		
	}
	render(){
		return (
			
			<View style={styles.container}>
				
					{this.renderScene()}
				
			</View>
	
			
		)
	}
}

var styles = StyleSheet.create({
  container: {
  	flex:1,
  },
  logo:{
  	flex:3,
  	justifyContent: 'center',
  	alignItems : 'center',
  	backgroundColor: 'powderblue',
  },
  input_form:{
  	flex:5,
  	justifyContent: 'center',
  	backgroundColor: 'skyblue',
  },
  footer:{
	flex:2,
	alignItems:'center',
	justifyContent:'center',
	backgroundColor: 'steelblue',
  },
  login_button:{
  	margin:10,
  	borderRadius:30,
  },
  text:{
  	alignItems : 'center', 
  	margin:20,
  }
 })

function mapStateToProps(state){
	return {
		status_user: state.status_user,
		login_token : state.login_token,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)


