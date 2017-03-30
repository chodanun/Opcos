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

export class Details extends Component {

	constructor(props) {
        super(props);
        this.state = {
           
        }
	}

  itemDetails(){
    return Object.keys(this.props.item_details).map( key => this.props.item_details[key])  
  }
  

	render() {
   return (
          <Container>
              <Header>
                  <Button transparent onPress = {()=> console.log(Actions.pop())} >
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
                            <Text>{this.props.cosmetic.type}</Text>
                            {this.itemDetails().map( cosmetic => { 
                              return <View key={cosmetic.item_id} >
                                        <Text>COLOR_POS : {cosmetic.color_pos}</Text> 
                                        <Text>COLOR_NEG : {cosmetic.color_neg}</Text> 
                                        <Text>SMELL_POS : {cosmetic.smell_pos}</Text> 
                                        <Text>SMELL_NEG : {cosmetic.smell_neg}</Text> 
                                        <Text>DURABLE_POS : {cosmetic.durable_pos}</Text> 
                                        <Text>DURABLE_NEG : {cosmetic.durable_neg}</Text> 
                                    </View>
                            })}
                            
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
    item_details : state.cosmeticDetails,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Details);
