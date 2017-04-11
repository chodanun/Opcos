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
import { Pie } from 'react-native-pathjs-charts'

export class Details extends Component {

	constructor(props) {
        super(props);
        this.state = {
           searching: false,
        }
	}

  componentWillMount(){
    this.setState({searching:true})
    this.props.navToDeatils(this.props.cosmetic).then( ()=> this.setState({searching:false}) )    
  }

  assignValueToArray(cosmetic_obj,key){
    let obj = cosmetic_obj[0]
    let arr = []
    if (this.props.cosmetic.type == "lipstick"){
      if (key == "pos"){
        if (obj.color_pos>0)
          arr.push({"name":"Color ("+obj.color_pos+")","population":obj.color_pos})
        if (obj.smell_pos>0)
          arr.push({"name":"Smell ("+obj.smell_pos+")","population":obj.smell_pos})
        if (obj.durable_pos>0)
          arr.push({"name":"Durable ("+obj.durable_pos+")","population":obj.durable_pos})
      }else{
        if (obj.color_neg>0)
          arr.push({"name":"Color ("+obj.color_neg+")","population":obj.color_neg})
        if (obj.smell_neg>0)
          arr.push({"name":"Smell ("+obj.smell_neg+")","population":obj.smell_neg})
        if (obj.durable_neg>0)
          arr.push({"name":"Durable ("+obj.durable_neg+")","population":obj.durable_neg})
      }
      
    }
    else if (this.props.cosmetic.type == "skin protection"){

    }
    return arr
  }

  renderGraph(){
    if (!this.state.searching){
      let pallete_pos = [
        {'r':0,'g':0,'b':255},
        {'r':0,'g':204,'b':0},
        {'r':204,'g':0,'b':0},
        {'r':102,'g':0,'b':204},
        {'r':204,'g':204,'b':0},
        {'r':255,'g':128,'b':0},
        {'r':255,'g':51,'b':123},
        {'r':102,'g':51,'b':0}
      ]
      let options = {
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        width: 350,
        height: 250,
        color: '#2980B9',
        r: 35,
        R: 110,
        legendPosition: 'topLeft',
        animate: {
          type: 'oneByOne',
          duration: 200,
          fillTransition: 3
        },
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          color: '#ECF0F1'
        },
      }
      if (this.props.cosmetic.type == "lipstick"){   
          var data_neg = this.assignValueToArray(this.props.cosmetic_details,"neg")
          var data_pos = this.assignValueToArray(this.props.cosmetic_details,"pos")
      }
      else if (this.props.cosmetic.type == "skin protection"){
      }
      if (data_pos.length>0 && data_neg.length >0)
        return <View>
                  <CardItem onPress={ () => {console.log("X") }}>
                    <Text>POSITIVE</Text>
                    <Pie data={data_pos}
                      options={options}
                      accessorKey="population"
                      pallete={
                        pallete_pos
                      }
                      />
                  </CardItem>
                  <CardItem onPress={ () => {console.log("Y") }}>
                    <Text>NEGATIVE</Text>
                    <Pie data={data_neg}
                    options={options}
                    accessorKey="population"
                    pallete={
                      [
                        {'r':25,'g':99,'b':201},
                        {'r':24,'g':175,'b':35},
                        {'r':190,'g':31,'b':69},
                        {'r':100,'g':36,'b':199},
                        {'r':214,'g':207,'b':32},
                        {'r':198,'g':84,'b':45}
                      ]
                    }
                    />
                  </CardItem>
                </View>
      else if (data_pos.length>0)
        return <CardItem onPress={ () => {console.log(Actions.comments()) }}>
                <Text>POSITIVE</Text>
                <Pie data={data_pos}
                  options={options}
                  accessorKey="population"
                  pallete={
                    [
                      {'r':25,'g':99,'b':201},
                      {'r':24,'g':175,'b':35},
                      {'r':190,'g':31,'b':69},
                      {'r':100,'g':36,'b':199},
                      {'r':214,'g':207,'b':32},
                      {'r':198,'g':84,'b':45}
                    ]
                  }
                  />
              </CardItem>
      else
        return <CardItem onPress={ () => {console.log(Actions.comments()) }}>
                <Text>NEGATIVE</Text>
                <Pie data={data_neg}
                  options={options}
                  accessorKey="population"
                  pallete={
                    [
                      {'r':25,'g':99,'b':201},
                      {'r':24,'g':175,'b':35},
                      {'r':190,'g':31,'b':69},
                      {'r':100,'g':36,'b':199},
                      {'r':214,'g':207,'b':32},
                      {'r':198,'g':84,'b':45}
                    ]
                  }
                  />
                </CardItem>
    }
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
                    <CardItem header>
                        <Text>{this.props.cosmetic.name}</Text>
                        <Text note>{this.props.cosmetic.brand}</Text>
                    </CardItem>
                    {this.renderGraph()}
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
    cosmetic_details : state.cosmeticDetails,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Details);
