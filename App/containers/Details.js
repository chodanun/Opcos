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
      this.setState({
        data_pos: [{
          sticky: 0,
          permeate: 0,
          stain: 0,
          smell: 0,
          moist: 0,
          irritate: 0,
          waterproof: 0,
          sunproof: 0,
        }],
        data_neg: [{
          sticky: 0,
          permeate: 0,
          stain: 0,
          smell: 0,
          moist: 0,
          irritate: 0,
          waterproof: 0,
          sunproof: 0,
        }],
      })
    }
  }

  componentWillReceiveProps(nextprops){
    if (this.props.cosmetic.type == "lipstick"){
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
    else if (this.props.cosmetic.type == "skin protection"){
      this.setState({
        data_pos: [{
          sticky: nextprops.item_details[0].sticky_pos,
          permeate: nextprops.item_details[0].permeate_pos,
          stain: nextprops.item_details[0].stain_pos,
          smell: nextprops.item_details[0].smell_pos,
          moist: nextprops.item_details[0].moist_pos,
          irritate: nextprops.item_details[0].irritate_pos,
          waterproof: nextprops.item_details[0].waterproof_pos,
          sunproof: nextprops.item_details[0].sunproof_pos,
        }],
        data_neg: [{
          sticky: nextprops.item_details[0].sticky_neg,
          permeate: nextprops.item_details[0].permeate_neg,
          stain: nextprops.item_details[0].stain_neg,
          smell: nextprops.item_details[0].smell_neg,
          moist: nextprops.item_details[0].moist_neg,
          irritate: nextprops.item_details[0].irritate_neg,
          waterproof: nextprops.item_details[0].waterproof_neg,
          sunproof: nextprops.item_details[0].sunproof_neg,
        }],
      })
    }

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

                  <Title> Opinion Graph Analysis </Title>

                  <Button transparent>
                      <Icon name="ios-menu" />
                  </Button>
              </Header>
              <Content>
                <Card>
                    <CardItem >
                        <Text>{this.props.cosmetic.name}</Text>
                        <Text note>{this.props.cosmetic.brand}</Text>
                    </CardItem>

                    <CardItem onPress={ () => {console.log(this.props.cosmetic);console.log(this.props.item_details);Actions.comments()} }>
                      <View>
                        <Radar data={this.state.data_pos} options={this.state.options} />
                      </View>
                    </CardItem>
                    <CardItem onPress={ () => console.log("HELLO2") }>
                      <View>
                        <Radar data={this.state.data_neg} options={this.state.options} />
                      </View>  
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
