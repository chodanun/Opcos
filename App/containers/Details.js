import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Container, Header, Button, Icon, Title, Content, Card, CardItem } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export class Details extends Component {

	constructor(props) {
        super(props);
        this.state = {
           
        }
	}

  	render() {
	   return (
            <Container>
                <Header>
                    <Button transparent>
                        <Icon name="ios-arrow-back" />
                    </Button>

                    <Title> Opinion Analysis </Title>

                    <Button transparent>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>
                <Content>
                  <Card>
                          <CardItem>
                              <Text>{this.props.cosmetic.name}</Text>
                              <Text note>{this.props.cosmetic.brand}</Text>
                          </CardItem>

                          <CardItem>
                              <Image style={{ resizeMode: 'contain' }} source={{ uri: this.props.cosmetic.img }} />
                          </CardItem>

                          <CardItem>
                              <Text></Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(Details);
