import React, { Component, PropTypes } from 'react'
import { Container, Content, Tabs, Header, Title, Button} from 'native-base'
import { 
	View,
	TabBarIOS, 
	TabBarItemIOS, 
	Text,
	TouchableHighlight,
} from 'react-native'
import Shop from '../Shop'
import NewFeed from '../NewFeed'
import Me from '../Me'



export default class ApplicationTabs extends Component {

	constructor(props) {
		super(props)
		this.state = {
			titile: null,
		};
	}
	
	renderTitle(){
		if (this.state.title==0)
			var title = "HOME"
		else if (this.state.title==1)
			var title ="SHOP"
		else
			var title ="ME"

		return (
			<Title>
				{title}
			</Title>
		)
	}



	render(){
		return (
			 <Container>
				 <Header>
					{this.renderTitle()}
                </Header>
                <Content>
                    <Tabs 
                    	tabBarPosition="top"
                    	onChangeTab={ (obj) => this.setState({title:obj.i})}
                    >
                    	<NewFeed tabLabel='Home' />
                        <Shop tabLabel='Shop' />
                        <Me tabLabel='Me' />

                    </Tabs>
                </Content>
            </Container>
		)
	}
}


// <TabBarIOS >
// 				<TabBarIOS.Item
// 				// icon={require('../../image/test.png')}
// 				systemIcon={this.state.titleNewFeed}
// 				selected={this.state.selectedTab === this.state.titleNewFeed}
// 				onPress={() => this.changeTabs(this.state.titleNewFeed) }>
// 					{this.renderScene(NewFeed)}
// 				</TabBarIOS.Item>

// 				<TabBarIOS.Item 
// 				systemIcon={this.state.titleShop} 
// 				selected={this.state.selectedTab === this.state.titleShop}
// 				onPress={() => this.changeTabs(this.state.titleShop) }>
// 					{this.renderScene(Shop)}
// 				</TabBarIOS.Item>

// 				<TabBarIOS.Item 
// 				systemIcon={this.state.titleMe}
// 				selected={this.state.selectedTab === this.state.titleMe}
// 				onPress={() => this.changeTabs(this.state.titleMe) }>
// 					{this.renderScene(Me)}
// 				</TabBarIOS.Item>
// 			</TabBarIOS>