import firebase from 'firebase';
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Spinner } from '../components';
import { Scene, Router, Actions } from 'react-native-router-flux'
import ReactNative from 'react-native'
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Button, Card, CardItem } from 'native-base'

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

	}

	renderButton(){
		if (this.state.loading){
			return <Spinner size='small' />
		}
		else{
			return <View>
						<Button 
							block success
							onPress={ () => this.onPressLogin() }
						> Login </Button>
						<Button 
							block danger
							onPress={ () => this.onPressRegist() }
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
				<Container>
                <Content>
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
                    {this.renderButton()}
                    {this.renderError()}
                </Content>

            </Container>
				
			)
		}
		else{
			return <View/>
		}
		
	}
	render(){
		return (
			
			<View style={styles.container}>
				<View style={styles.login}>
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
  login:{
  	flex:1,
  },
  error:{
  	marginTop:50,
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


	// <View>
	// <TextInput 
	// 	autoCorrect={false}
	// 	placeholder="email"
	// 	value={this.state.email}
	// 	onChangeText={ email => this.setState({ email })}
	// 	style={{ height: 20, width: 200 }}
	// />
	// <TextInput 
	// 	autoCorrect={false}
	// 	secureTextEntry
	// 	placeholder="password"
	// 	value={this.state.password}
	// 	onChangeText={ password => this.setState({ password })}
	// 	style={{ height: 20, width: 200 }}
	// />
	// <Text> {this.state.error} </Text>
	// {this.renderButton()} 
	// </View>