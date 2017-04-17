import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux';
import { Container, Header, Button, Icon, Title, Content, Card, CardItem, Text } from 'native-base';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
export class Comments extends Component {

	constructor(props) {
        super(props);
        this.state = {
          isFinished: false,
        }
	}

  // shouldComponentUpdate(nextProps,nextState){
  //   return this.props.comments != nextProps.comments
  // }

  componentWillMount(){
    let { item_id,item_type,feature,kind} = this.props.data
    console.log(item_id,item_type,feature,kind)
    this.props.queryComments(item_id,item_type,feature,kind).then( ()=> this.setState({isFinished:true}))
  }

  renderData(){
    if (this.state.isFinished)
      return <View>
                {this.props.comments.map( item => {
                  return  <Card key={item.comment_id}>
                              <CardItem header>
                                  <Text>{item.comment_title}</Text>
                              </CardItem>

                              <CardItem>
                                  <Text>{item.comment_com}</Text>
                              </CardItem>
                         </Card>
                })}
            </View>
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
                <Content style={styles.content} >
                  <CardItem header>
                      <Text>KEYWORD: <Text style={{color: this.props.data.kind=="positive"? 'green':'red'}}> {this.props.data.feature.toUpperCase()}</Text> </Text>
                  </CardItem>
                  {this.renderData()}
                </Content>
            </Container>
            
          

    );
  }

}

const styles = StyleSheet.create({
  container :{
    flex:1,
  },
  content:{
    padding:4,
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