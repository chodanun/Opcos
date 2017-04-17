
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
		let token = this.props.login_details.token
		let login_method = this.props.login_method
		this.props.logOut(token,login_method)
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
					<Button transparent onPress = { () => this.barcodeSearch() } >
                        <Icon name='ios-barcode'/>
                    </Button>
                </Header>
                <Content>
                    <Tabs 
                    	onChangeTab={ (obj) => this.setState({title:obj.i})}
                    	initialPage= {1}
                    >
                    	<NewFeed tabLabel='Home' />
                        <Shop tabLabel='Shop' barcode = {this.props.barcode} />
                        <Me tabLabel='Me' />

                    </Tabs>
                </Content>
            </Container>
		)
	}
}


function mapStateToProps(state){
	return {
		num: state.num,
		login_details: state.login_details,
		login_method: state.login_method,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ApplicationTabs)