import React , { Component } from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const {
	ScrollView,
	View,
	TextInput,
	Text,
	Image,
	TouchableHighlight,
	StyleSheet,
} = ReactNative

class Home extends Component {
	searchedPress(){
		this.props.fetchCosmetics('cheese')
	}

	render(){
		return (
			<View>
				<View>
					<TouchableHighlight onPress={()=> this.searchedPress()}>
						<Text>
							Fetch Cosmetics
						</Text>
					</TouchableHighlight>
				</View>
				<ScrollView>
					
				</ScrollView>
			</View>
		)
	}
}

function mapStateToProps(state){
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)