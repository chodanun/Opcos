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
import QueryAll from './QueryAll'
export class Comments extends Component {

	constructor(props) {
        super(props);
        this.state = {
          selectedIndex: 0,
          arr: [],
        }
	}

  componentWillMount(){
    this.props.queryComments(this.props.cosmetic.type,this.props.cosmetic.item_id)

    let arr = ["All"]
    if (this.props.cosmetic.type == "lipstick"){
      if (this.props.prompt == "POSITIVE"){
        if (this.props.details.color_pos>0) arr.push("Color")
        if (this.props.details.smell_pos>0) arr.push("Smell")
        if (this.props.details.durable_pos>0) arr.push("Durable")
      }else{
        if (this.props.details.color_neg>0) arr.push("Color")
        if (this.props.details.smell_neg>0) arr.push("Smell")
        if (this.props.details.durable_neg>0) arr.push("Durable")
      }    
    }else{
      if (this.props.prompt == "POSITIVE"){
        if (this.props.details.sticky_pos>0) arr.push("Sticky")
        if (this.props.details.permeate_pos>0) arr.push("Permeate")
        if (this.props.details.stain_pos>0) arr.push("Stain")
        if (this.props.details.smell_pos>0) arr.push("Smell")
        if (this.props.details.moist_pos>0) arr.push("Moist")
        if (this.props.details.irritate_pos>0) arr.push("Irritate")
        if (this.props.details.waterproof_pos>0) arr.push("Waterproof")
        if (this.props.details.sunproof_pos>0) arr.push("Sunproof")
      }else{
        if (this.props.details.sticky_neg>0) arr.push("Sticky")
        if (this.props.details.permeate_neg>0) arr.push("Permeate")
        if (this.props.details.stain_neg>0) arr.push("Stain")
        if (this.props.details.smell_neg>0) arr.push("Smell")
        if (this.props.details.moist_neg>0) arr.push("Moist")
        if (this.props.details.irritate_neg>0) arr.push("Irritate")
        if (this.props.details.waterproof_neg>0) arr.push("Waterproof")
        if (this.props.details.sunproof_neg>0) arr.push("Sunproof")
      }
    }
    this.setState({arr})
  }

  handleIndexChange(index){
    this.setState({
      selectedIndex: index,
    })
  }
  
  renderSegments(){
    
    return <SegmentedControlTab
            values={this.state.arr}
            selectedIndex={this.state.selectedIndex}
            onTabPress={ (index) => this.handleIndexChange(index) }
            />
  }

  commentsKey(){
    return Object.keys(this.props.comments).map( key => this.props.comments[key])
  }

  renderData(){

    return  <View>    
                      <Tabs>
                        <QueryAll tabLabel="One" />
                        <QueryAll tabLabel="Two" />
                        <QueryAll tabLabel="Three" />
                        <QueryAll tabLabel="four" />
                        <QueryAll tabLabel="four1" />
                        <QueryAll tabLabel="four2" />
                        <QueryAll tabLabel="four3" />
                        <QueryAll tabLabel="four4" />
                        </Tabs>
            </View>
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
                
                 
                        <Tabs>
                        <QueryAll tabLabel="One" />
                        <QueryAll tabLabel="Two" />
                        
                        <QueryAll tabLabel="four4" />
                        </Tabs>
                        
                 
                 
                 
                 

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