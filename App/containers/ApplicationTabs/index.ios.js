import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Shop from '../Shop'
import Home from '../Home'
import Me from '../Me'
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
			titleHome : 'top-rated',
			titleShop : 'search',
			titleMe : 'more',
		};
	}

	// static propTypes = {
	// 	title: PropTypes.string.isRequired,
	// 	navigator: PropTypes.object.isRequired,
	// }

	_onForward = () => {
		this.props.navigator.push({
			title: 'Scene ' + nextIndex,
		})
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

	render(){
		console.log(this.props)
		return (
			
			<TabBarIOS style={{marginTop:80}}>
				
				<TabBarIOS.Item
				// icon={require('../../image/test.png')}
				systemIcon={this.state.titleHome}
				selected={this.state.selectedTab === this.state.titleHome}
				onPress={() => this.changeTabs(this.state.titleHome) }>
					{this.renderScene(Home)}
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

	}
}

export default connect(mapStateToProps)(ApplicationTabs)