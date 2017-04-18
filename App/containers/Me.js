import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Container, Content, Tabs, List, ListItem, Button, Spinner } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
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
            searching:false,
        }
	}

	renderImage(){
    if (this.props.user_profile.img != undefined)
        return <Image 
                  style={styles.imageProfile} 
                  source={ { uri: this.props.user_profile.img } }  
                />
    }

    loadItemLogs(){
      this.setState({searching:true})
      this.props.fetchLogs(this.props.login_details.uid).then( ()=> this.setState({searching:false}))
    }

    logs(){
      return Object.keys(this.props.item_logs).map( key => this.props.item_logs[key])
    }
    renderLogs(){
      if (this.state.searching){
        return  <View style={styles.spinner} >
          <Spinner color='#5996F7'/>
        </View>
      }
      else{
        return <View>
                  {this.logs().map(log => {
                    console.log(log.time_stamp)
                    return  <ListItem key={log.id} style={{justifyContent:'center'}}>
                              <Text>Item id : {log.item_id} ; </Text>
                              <Text>Time : {log.time_stamp}</Text>
                            </ListItem>
                    })}
              </View>
      }
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
                                <Text style={{fontWeight: 'bold'}} >Profile</Text>
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
                                <TouchableWithoutFeedback onPress={()=>this.loadItemLogs()}> 
                                  <View>
                                    <Text style={styles.text_header} >Activity Log</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                            </ListItem>  
                            {this.renderLogs()}
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
  text_header:{
    color:'#5996F7',
    fontWeight: 'bold',
  },
  spinner:{
    alignItems:'center',
  }


})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
    user_profile: state.user_profile,
    login_details: state.login_details,
    item_logs: state.item_logs,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Me);

// <Image 
//                     style={styles.imageProfile} 
//                     source={ { uri: "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14724580_10207419760914394_7496170479931945206_n.jpg?oh=54cf3549ce9b6b8c249173d3f1cad7f6&oe=5918B19D" } }  
//                     />                