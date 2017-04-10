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
import { Radar } from 'react-native-pathjs-charts'

export class Details extends Component {

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

  componentWillMount(){
    if (this.props.cosmetic.type == "lipstick"){
      this.setState({
        data_pos: [{
          color: 0,
          smell: 0,
          durable: 0,
        }],
        data_neg: [{
          color: 0,
          smell: 0,
          durable: 0,
        }],
      })
    }
    else if (this.props.cosmetic.type == "skin protection"){

    }
  }

  componentWillReceiveProps(nextprops){
    // console.log("NEXT")
    this.setState({
        data_pos: [{
          color: nextprops.item_details[0].color_pos,
          smell: nextprops.item_details[0].smell_pos,
          durable: nextprops.item_details[0].durable_pos,
        }],
        data_neg: [{
          color: nextprops.item_details[0].color_neg,
          smell: nextprops.item_details[0].smell_neg,
          durable: nextprops.item_details[0].durable_neg,
        }],
        
    })

  }

  itemDetails(){
    return Object.keys(this.props.item_details).map( key => this.props.item_details[key])
  }

	render() {
   return (
          <Container>
              <Header>
                  <Button transparent onPress = {()=> Actions.pop()} >
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
                        <View>
                          <Radar data={this.state.data_pos} options={this.state.options} />
                          <Radar data={this.state.data_neg} options={this.state.options} />
                        </View>
                            <Text>{this.props.cosmetic.type}</Text>
                            <Text>{this.props.cosmetic.description}</Text>
                            {this.itemDetails().map( cosmetic => { 
                              return <View key={cosmetic.item_id} >
                                        <Text>item_id : {cosmetic.item_id}</Text> 
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
