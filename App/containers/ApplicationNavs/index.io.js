import React, { Component } from 'react'
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
} from 'react-native'

class ApplicationNavs extends Component {

	render(){
		return (
			<TabBarIOS style={{flex:1}}>
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