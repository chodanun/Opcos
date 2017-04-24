import React , { Component } from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Card, CardItem, Thumbnail, InputGroup, Input, Icon, List, ListItem, CheckBox, Button, Text} from 'native-base'
import Autocomplete from 'react-native-autocomplete-input';
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

	renderRecItems(){
		if (this.props.recommended_items.length>0){
			return <Text>{this.props.recommended_items[0].name}</Text>	
		}
		
	}

	render(){
		return (
			<Container>
				 <Content>
				 	{this.renderRecItems()}
                </Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  
});

function mapStateToProps(state){
	return {
		recommended_items: state.recommended_items,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewFeed)