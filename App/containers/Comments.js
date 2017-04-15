import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux';
import { Container, Header, Button, Icon, Title, Content, Card, CardItem, Tabs } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
export class Comments extends Component {

	constructor(props) {
        super(props);
        this.state = {
          selectedIndex: 0,
          arr: [],
        }
	}

  commentsKey(){
    return Object.keys(this.props.comments).map( key => this.props.comments[key])
  }

	render() {
    // console.log(this.props.details)
    // console.log(this.props.cosmetic)
   return (
          <Container>
              <Header>
                  <Button transparent onPress = {()=> Actions.pop()} >
                      <Icon name="ios-arrow-back" />
                  </Button>
                  <Title> Comments Analysis </Title>
              </Header>
              
              <Content>
                
              </Content>
          </Container>
            
          

    );
  }

}

const styles = StyleSheet.create({
  container :{
    flex:1,
  },

})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
  	num : state.num,
    comments: state.comments
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
// {this.state.arr[this.state.selectedIndex]=="All" && this.commentsKey().map(obj => {
//                   return <Card key={obj.comment_id}>
//                            <CardItem header>
//                                 <Text>{obj.comment_title}</Text>
//                             </CardItem>
//                             <CardItem >
//                                 <Text>{obj.comment_com}</Text>
//                             </CardItem>
//                          </Card>
//                  })}