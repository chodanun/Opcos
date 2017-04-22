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
	TouchableOpacity,
} = ReactNative

class NewFeed extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  }
	}

		render(){
		return (
			<Container>
			
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  
});

function mapStateToProps(state){
	return {
		searchedCosmetics : state.searchedCosmetics,
		cosmetics_autocom_details: state.cosmetics_autocom_details,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewFeed)