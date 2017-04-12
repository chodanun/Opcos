import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux';
import { Container, Header, Button, Icon, Title, Content, Card, CardItem } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export class Comments extends Component {

	constructor(props) {
        super(props);
        this.state = {
        }
	}

  
	render() {
   return (
          <Container>
              <Header>
                  <Button transparent onPress = {()=> Actions.pop()} >
                      <Icon name="ios-arrow-back" />
                  </Button>
                  <Title> Comments Analysis </Title>
              </Header>
              
              <Content>
                <Card>
                    <CardItem >
                        <Text>Hello</Text>
                    </CardItem>
                  </Card>
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
