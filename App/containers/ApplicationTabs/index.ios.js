import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Shop from '../Shop'
import NewFeed from '../NewFeed'
import Me from '../Me'
import Search from '../Search'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { 
	View,
	TabBarIOS, 
	TabBarItemIOS, 
	NavigatorIOS, 
	Text,
	TouchableHighlight,
} from 'react-native'



class ApplicationTabs extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedTab : 'search',
			titleNewFeed : 'top-rated',
			titleShop : 'search',
			titleMe : 'more',
		};
	}

	changeTabs(title){
		this.setState({
			selectedTab: title,
		})
	}

	renderScene(component){
		return (
			<View style={{flex:1}}>
				{React.createElement(component, this.props)}
			</View>
		)
	}

	_changeSceneCosmeticsSearch(){
		this.props.changeSceneCosmeticsSearch()
	}

	_checkSceneCosmeticsSearch(){
		if (this.props.changeSceneCosmeticSearch){
			this.props.navigator.push({
				component:Search,
				title: 'Search',
				rightButtonSystemIcon: 'search',
				onRightButtonPress: () => console.log("SEARCH TEST") ,
				backButtonTitle: 'Back',
			})
			this._changeSceneCosmeticsSearch()
		}
	}

	componentDidUpdate(){
		this._checkSceneCosmeticsSearch()
	}

	render(){
		return (
			<TabBarIOS style={{marginTop:80}}>
				<TabBarIOS.Item
				// icon={require('../../image/test.png')}
				systemIcon={this.state.titleNewFeed}
				selected={this.state.selectedTab === this.state.titleNewFeed}
				onPress={() => this.changeTabs(this.state.titleNewFeed) }>
					{this.renderScene(NewFeed)}
				</TabBarIOS.Item>

				<TabBarIOS.Item 
				systemIcon={this.state.titleShop} 
				selected={this.state.selectedTab === this.state.titleShop}
				onPress={() => this.changeTabs(this.state.titleShop) }>
					{this.renderScene(Shop)}
				</TabBarIOS.Item>

				<TabBarIOS.Item 
				systemIcon={this.state.titleMe}
				selected={this.state.selectedTab === this.state.titleMe}
				onPress={() => this.changeTabs(this.state.titleMe) }>
					{this.renderScene(Me)}
				</TabBarIOS.Item>
			</TabBarIOS>
		)


	}
}

function mapStateToProps(state){
	return {
		changeSceneCosmeticSearch : state.changeSceneCosmeticSearch
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);