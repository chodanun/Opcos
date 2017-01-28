import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Container, Content, Tabs } from 'native-base';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  NavigationExperimental,
  Button,
  TouchableHighlight
} from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;



export class AppContainer extends Component {

	constructor(props) {
	  super(props);
	}

	addCount(){
		this.props.add()
	}

  	render() {
	   return (
        <Container>
          <Content>
    	      <View style={styles.scene} >
    	      	<Text style={styles.count} >
    	      		Count : {this.props.num}
    	      	</Text>
    	      	<TouchableHighlight onPress={()=>this.addCount()} style={styles.buttonCount} >
    		      	<Text>
    		      		Add
    		      	</Text>
    	      	</TouchableHighlight>
                <Text> name : </Text>
                <Text> birthday : </Text>
                <Text> email : </Text>
                <Text> photoURL : </Text>
    	      </View>
          </Content>
        </Container>

	    );
	  }

}

const styles = StyleSheet.create({
  scene: {
    marginTop:20,
    flex: 1,
  },
  count : {
  	
  },
  buttonCount : {
  	
  },
  

})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
