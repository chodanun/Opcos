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
	  	  cosmetics: [],
	      query: '',
	  }
	}

	loadRecItems(uid){
		this.props.loadRecItems(uid)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.login_details.uid){
			this.loadRecItems(nextProps.login_details.uid)
		}
		
	}

	render(){
		return (
			<Container>
				 <Content>
                    <Card>
                        <CardItem>
                            
                            <Text>Instrumental Songs</Text>
                            <Text note>Guitar</Text>
                        </CardItem>

                        <CardItem>
                            
                        </CardItem>

                        <CardItem>
                            <Icon name={'ios-musical-notes'} style={{color : '#ED4A6A'}} />
                            <Text>Listen now</Text>
                        </CardItem>
                   </Card>
                </Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  
});

function mapStateToProps(state){
	return {
		login_details: state.login_details
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewFeed)