import React , { Component } from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Card, CardItem, Thumbnail, InputGroup, Input, Icon, List, ListItem, CheckBox, Button, Text} from 'native-base'
const {
	View,
	Image,
	StyleSheet,
	AsyncStorage
} = ReactNative

class NewFeed extends Component {
	constructor(props) {
	  super(props)
	}

	async save(){
		try {
		  await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
		} catch (error) {
		  console.log(error)
		}
	}

	async fetch(){
		try {
		  const value = await AsyncStorage.getItem('@MySuperStore:key');
		  if (value !== null){
		    // We have data!!
		    console.log(value);
		  }
		} catch (error) {
		  // Error retrieving data
		  console.log(error)
		}
	}
	
	render(){
		// console.log(this.cosmetics())
		return (
			<Container>
			<Content>
			<Button onPress={ ()=> this.save()} >
				<Text>save</Text>
			</Button>
			<Button onPress={ ()=> this.fetch()} >
				<Text>fetch</Text>
			</Button>
			</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  
});

function mapStateToProps(state){
	return {
		searchedCosmetics : state.searchedCosmetics,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewFeed)