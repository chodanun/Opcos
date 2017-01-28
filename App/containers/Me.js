import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Container, Content, Tabs } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;



export class Me extends Component {

	constructor(props) {
	  super(props);
	}

	renderImage(){
        // console.log(this.props.user_profile.picture != undefined)
        if (this.props.user_profile.picture != undefined)
            return <Image style={styles.imageProfile} source={ { uri: this.props.user_profile.picture.data.url } }  />
    }

  	render() {
	   return (
        <Container style={styles.container} >
          <Content style={styles.container}>
    	      <View style={styles.scene} >
                    {this.renderImage()}
                    <Text> name :  {this.props.user_profile.name} </Text>
                    <Text> birthday : {this.props.user_profile.birthday} </Text>
                    <Text> email : {this.props.user_profile.email} </Text>
                    <Text> photoURL : {} </Text>
    	      </View>
          </Content>
        </Container>

	    );
	  }

}

const styles = StyleSheet.create({
  container :{
    flex:1,
  },
  scene: {
    flex: 1,
  },
  imageProfile:{
    height:150,
    width:150,
  },


})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num,
    user_profile : state.user_profile,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Me);
