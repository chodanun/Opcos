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
           data_pos: [{
           }],
           data_neg: [{
           }],
           options: {
              width: 300,
              height: 300,
              margin: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              r: 120,
              max: 10,
              fill: "#2980B9",
              stroke: "#2980B9",
              animate: {
                type: 'oneByOne',
                duration: 200
              },
              label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                fill: '#34495E'
              }
            },
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
