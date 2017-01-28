import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Container, Content, Tabs, List, ListItem } from 'native-base';
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
        this.state = {
            name : '',
            birthday : '',
            email : '',
        }
	}

    // componentDidMount(){
    //     if (this.props.login_method == "facebook"){
    //         this.setState({
    //             name : this.props.user_profile.name,
    //             birthday : this.props.user_profile.birthday,
    //             email : this.props.user_profile.email,
    //         })
    //     }
    //     else if (this.props.login_method == "opcos"){
    //         this.setState({
    //             name : this.props.user_profile.name,
    //             // birthday : this.props.user_profile.birthday,
    //             email : this.props.user_profile.email,
    //         })
    //     }
    // }

	renderImage(){
        // console.log(this.props.user_profile.picture != undefined)
        if (this.props.user_profile.picture != undefined)
            return <Image 
                        style={styles.imageProfile} 
                        source={ { uri: this.props.user_profile.picture.data.url } }  
                    />
    }

  	render() {
	   return (
            <Container style={{flex:1}} >
                <View style={styles.imageProfileView} >
                    {this.renderImage()}
                </View>

                <View style={styles.profile}>
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Text>Profile</Text>
                            </ListItem>                    
                            <ListItem >
                                <Text>Name :  {this.props.user_profile.name} </Text>
                            </ListItem>
                            <ListItem >
                                <Text>Birthday : {this.props.user_profile.birthday}</Text>
                            </ListItem>
                            <ListItem >
                                <Text>Email : {this.props.user_profile.email}</Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Activity Log</Text>
                            </ListItem>  
                            <ListItem>
                                <Text>...</Text>
                            </ListItem>
                            
                        </List>
                    </Content>                                       
                </View>

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
  imageProfileView:{
    alignItems: 'center',
  },
  imageProfile:{
    height:150,
    width:150,
    borderRadius :10,
    borderColor: 'black',
    borderWidth:1,
    margin:10,
  },
  profile :{
    flex: 1,
    padding: 10,
    
  },
  log:{
    flex:1,
    
  },


})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num,
    user_profile : state.user_profile,
    login_method : state.login_method,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Me);

// <Image 
//                     style={styles.imageProfile} 
//                     source={ { uri: "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14724580_10207419760914394_7496170479931945206_n.jpg?oh=54cf3549ce9b6b8c249173d3f1cad7f6&oe=5918B19D" } }  
//                     />                