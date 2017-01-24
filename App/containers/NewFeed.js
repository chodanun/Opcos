import React , { Component } from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Tabs } from 'native-base';

const {
	ScrollView,
	View,
	TextInput,
	Text,
	Image,
	TouchableHighlight,
	StyleSheet,
} = ReactNative

class NewFeed extends Component {
	constructor(props) {
	  super(props)
	}

	render(){
		// console.log(this.cosmetics())
		return (
			<Container>
			<Content>
			<View>
				
			</View>
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