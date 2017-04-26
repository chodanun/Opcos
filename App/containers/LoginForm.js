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
import {fetchToken} from '../lib/token'
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
	Dimensions,
} = ReactNative

class LoginForm extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			email:'',
			password:'',
			error:'',
			loading: false,

			isLogin:false,
			name:'',
			loginMethod:'',
		}
	}

	componentWillMount(){
		fetchToken().then( (token) => {
			this.props.checkToken(token).then((isLoginFb) =>{
				if (isLoginFb){
					console.log("FACEBOOK TOKEN : "+ token+" isLogin: true")
				}else{
					console.log("FACEBOOK TOKEN : "+ token+" isLogin: false")
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
							console.log("FIREBASE LOGIN : true")
						}else{
							this.props.updateStatusUser({
								email: '',
								isLogin: false,
								loginMethod: '',
							})
						}
					
					})
				}
			}).catch(err => console.log(err))
		}).catch(err => console.log(err))

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
		this.setState({loading:true})
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
		this.setState({loading:true})
		LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday']).then(
		  (result) => {
		    if (result.isCancelled) {
		      // alert('Login was cancelled')
		      this.setState({loading:false})
		    } else {
		      // alert('Login was successful with permissions: '
		        // + result.grantedPermissions.toString())
		        AccessToken.getCurrentAccessToken().then((data) => {
                		// this.props.loginTokenFacebook(data.accessToken.toString()) 
                		this.setState({
                			isLogin: true,
							loginMethod: 'facebook',
							loading:false,
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
	renderButtonLogin(){
		if (!this.state.loading)
			return (
				<Button 
					block success
					onPress={ () => this.onPressLogin() }
					style ={styles.login_button}
				> Login </Button>
			)
	}
	renderButtonFacebookLogin(){
		if (!this.state.loading)
			return (
				<SocialIcon
				  title='Sign In With Facebook'
				  button type='facebook'
				  onPress={ () => this.onPressLoginFacebook() }
				  iconSize={20}
				  style={{height:42}}
				/>
			)
	}

	renderSpinner(){
		if(this.state.loading)
			return (
				<Spinner size='large' />
			)
	}

	renderScene(){
		var {width, height} = Dimensions.get('window');
		if (this.props.status_user == false){
			return (
				<View style={{height:height,width:width}}>
	            	<View style={styles.logo} >
	            		<Image source={require('../img/icon.png')} style={{resizeMode: 'contain',width:200}}  />
	            	</View>

	            	<View style={styles.input_form} >
	            		<View style={{flex:3,justifyContent:'center' }}>
		                    <List>
		                        <ListItem>
		                            <InputGroup>
		                                <Icon name='ios-person' />
		                                <Input 
		                                	autoCorrect={false}
		                                	placeholder='EMAIL'
		                                	value={this.state.email}
											onChangeText={ email => this.setState({ email })}
											style={{fontWeight:'bold',fontSize:15,color:'white'}}
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
											style={{fontWeight:'bold',fontSize:15,color:'white'}}
		                                />
		                            </InputGroup>
		                        </ListItem>
		                    </List>
		                </View>
		                <View style={{flex:1,justifyContent:'center',top:20}}>	
	                    	{this.renderButtonLogin()}
	                    	<View style={{top:20}}>
		                    	{this.renderSpinner()}
	                    	</View>
	                    </View>
	                    <View style={{flex:5,top:40}}>
		                	{this.renderButtonFacebookLogin()}
						</View>
	                </View>

	                <View style={styles.footer}>
	                	<Button 
							block warning
							onPress={ () => this.onPressRegist() }
							style = {styles.login_button}
						> Register 
						</Button>
					</View>
		        </View>
				
			)
		}
		else{
			return <View style={{height:height,width:width}}>
						<Spinner size='large' />
					</View>
		}
		
	}
	render(){
		return (
				<View style={{flex:1}}>
					<Image source={require('../img/bg1.png')} style={{flex:1,}}>
						{this.renderScene()}
					</Image>

				</View>
			
		)
	}
}

var styles = StyleSheet.create({
  container: {
  	flex:1,
  },
  logo:{
  	flex:6,
  	justifyContent: 'center',
  	alignItems : 'center',
  	// backgroundColor: 'powderblue',
  },
  input_form:{
  	flex:5,
  	justifyContent: 'center',
  	// backgroundColor: 'skyblue',
  },
  footer:{
	flex:3,
	alignItems:'center',
	justifyContent:'center',
	// backgroundColor: 'steelblue',
  },
  login_button:{
  	margin:10,
  	borderRadius:30,
  },
  text:{
  	alignItems : 'center', 
  	margin:20,
  },
  backgroundImage:{
  	flex:1,
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


