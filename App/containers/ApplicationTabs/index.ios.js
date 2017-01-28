import firebase from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
import React, { Component, PropTypes } from 'react'
import { Container, Content, Tabs, Header, Title, Button, Icon} from 'native-base'
import { 
	View,
	Text,
	TouchableHighlight,
} from 'react-native'

const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
} = FBSDK;

import Shop from '../Shop'
import NewFeed from '../NewFeed'
import Me from '../Me'



class ApplicationTabs extends Component {

	constructor(props) {
		super(props)
		this.state = {
			titile: null,
		};
	}

	onPressSignOut(){
	    firebase.auth().signOut()
	    LoginManager.logOut()
  		
  		this.props.loginToken(null)    
        this.props.updateStatusUser(false,null,null)
	    Actions.auth()
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

	barcodeSearch(){
		Actions.barcodeSearch()
	}

	render(){
		return (
			 <Container>
				 <Header>
					<Button transparent onPress = { () => this.onPressSignOut()} >
						<Icon size={30}  name='ios-power' style={{fontSize: 30, color: 'red'}} />
                    </Button>
					{this.renderTitle()}
					<Button transparent onPress = {this.barcodeSearch} >
                        <Icon name='ios-barcode'/>
                    </Button>
                </Header>
                <Content>
                    <Tabs 
                    	onChangeTab={ (obj) => this.setState({title:obj.i})}
                    	initialPage= {1}
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


function mapStateToProps(state){
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ApplicationTabs)



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