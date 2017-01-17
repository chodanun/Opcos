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

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = { searching: false ,cosmeticsInput: ''};
	}

	searchedPress(){
		this.setState({ searching:true })
		this.props.fetchCosmetics(this.state.cosmeticsInput).then( () => {
			this.setState( {searching: false})
		})
	}

	cosmetics(){
		return Object.keys(this.props.searchedCosmetics).map( key => this.props.searchedCosmetics[key])
	}

	render(){
		return (
			<View/>
		)
	}
}

function mapStateToProps(state){
	return {
		searchedCosmetics : state.searchedCosmetics,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)