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

export class QueryAll extends Component {

	constructor(props) {
        super(props);
        this.state = {
        }
	}

  commentsKey(){
    return Object.keys(this.props.comments).map( key => this.props.comments[key])
  }

  shouldComponentUpdate(nextProps) {
    return this.props.comments !== nextProps.comments;
  }

	render() {
    console.log("UPDATE QueryAll")
   return <Container>   
            <View>
           {this.commentsKey().map(obj => {
            return <Card key={obj.comment_id}>
                     <CardItem header>
                          <Text>{obj.comment_title}</Text>
                      </CardItem>
                      <CardItem >
                          <Text>{obj.comment_com}</Text>
                      </CardItem>
                   </Card>
           })}
           </View>
          </Container>
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
  	comments: state.comments
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(QueryAll);