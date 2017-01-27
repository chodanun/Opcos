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
const {
	View,
	TextInput,
	Text,
	StyleSheet,
	Image,
} = ReactNative

const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
  	LoginButton,
  	AccessToken
} = FBSDK;

// var Login = React.createClass({
//   render: function() {
//     return (
//       <View>
//         <LoginButton
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={
//             (error, result) => {
//               if (error) {
//                 alert("login has error: " + result.error);
//               } else if (result.isCancelled) {
//                 alert("login is cancelled.");
//               } else {
//                 AccessToken.getCurrentAccessToken().then(
//                   (data) => {
//                     alert(data.accessToken.toString())
//                   }
//                 )
//               }
//             }
//           }
//           onLogoutFinished={() => alert("logout.")}/>
//       </View>
//     );
//   }
// });

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

	onPressLoginFacebook(){
		LoginManager.logInWithReadPermissions(['public_profile']).then(
		  function(result) {
		    if (result.isCancelled) {
		      alert('Login was cancelled');
		    } else {
		      alert('Login was successful with permissions: '
		        + result.grantedPermissions.toString());
		    }
		  },
		  function(error) {
		    alert('Login failed with error: ' + error);
		  }
		);
	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size='small' />
		}
		else{
			return <View style={{marginTop:10}} >
						<SocialIcon
						  title='Sign In With Facebook'
						  button type='facebook'
						  onPress={ () => this.onPressLoginFacebook() }
						/>
						<Button 
							block success
							onPress={ () => this.onPressLogin() }
							style ={styles.login_button}
						> Login </Button>

						<Button 
							block danger
							onPress={ () => this.onPressRegist() }
							style ={styles.login_button}
						> Register </Button>
					</View>
		}
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

	renderScene(){
		if (this.props.status_user == false){
			return (

				<Container style={{flex:1}} >
	                <Content style={{flex:1}}>
	                	<View style={styles.logo} >
	                		<Text>OPCOS</Text>
	                	</View>
	                	
	                	<View style={styles.input_form} >
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

	                    <View style={styles.button} >
	                    	{this.renderButton()}	
	                    </View>
						{this.renderError()}
	                    
	                </Content>

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
				<View style={{flex:1}}>
					{this.renderScene()}
				</View>
			</View>
	
			
		)
	}
}

var styles = StyleSheet.create({
  container: {
  	flex:1,
  },
  logo:{
  	flex:1,
  },
  input_form:{
  	flex:1,
  },
  button:{
  	flex:1,
  }
 })

function mapStateToProps(state){
	return {
		status_user: state.status_user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
