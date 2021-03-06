import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux';
import { Container, Header, Button, Icon, Title, Content, Card, CardItem, Picker} from 'native-base';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native'
import { Pie } from 'react-native-pathjs-charts'
import Modal from 'react-native-modalbox';

export class Details extends Component {

  constructor(props) {
        super(props);
        this.state = {
           searching: false,
           isDisabled: false,
           listItems_neg: [],
           listItems_pos: [],
           data_neg: [],
           data_pos: [],
           selectVal: '',
           color_list_pos: '#004909',
           color_list_neg: '#A80000',
        }
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.props.cosmetic_details != nextState.cosmetic_details
  }

  componentWillMount(){
    this.setState({searching:true})
    this.props.loadOpinionFiles(this.props.cosmetic).then( ()=> {
      this.setState({searching:false})
      if (this.props.cosmetic.type == "lipstick"){   
          var data_neg = this.assignValueToArray(this.props.cosmetic_details,"neg")
          var data_pos = this.assignValueToArray(this.props.cosmetic_details,"pos")
      }
      else if (this.props.cosmetic.type == "skin protection"){
          var data_neg = this.assignValueToArray(this.props.cosmetic_details,"neg")
          var data_pos = this.assignValueToArray(this.props.cosmetic_details,"pos") 
      }
      this.setState({data_pos,data_neg})
    }).catch( err=> console.log(err))

    
  }


  assignValueToArray(cosmetic_obj,key){
    let obj = cosmetic_obj[0]
    let arr = []
    let listItems_pos = []
    let listItems_neg = []
    if (this.props.cosmetic.type == "lipstick"){
      if (key == "pos"){
        if (obj.color_pos>0){
          arr.push({"name":"Color ("+obj.color_pos+")","population":obj.color_pos})
          listItems_pos.push("color")
        }
        if (obj.smell_pos>0){
          arr.push({"name":"Smell ("+obj.smell_pos+")","population":obj.smell_pos})
          listItems_pos.push("smell")
        }
        if (obj.durable_pos>0){
          arr.push({"name":"Durable ("+obj.durable_pos+")","population":obj.durable_pos})
          listItems_pos.push("durable")
        }
      }else{
        if (obj.color_neg>0){
          arr.push({"name":"Color ("+obj.color_neg+")","population":obj.color_neg})
          listItems_neg.push("color")
        }
        if (obj.smell_neg>0){
          arr.push({"name":"Smell ("+obj.smell_neg+")","population":obj.smell_neg})
          listItems_neg.push("smell")
        }
        if (obj.durable_neg>0){
          arr.push({"name":"Durable ("+obj.durable_neg+")","population":obj.durable_neg})
          listItems_neg.push("durable")
        }
      }   
    }
    else if (this.props.cosmetic.type == "skin protection"){
      if(key=="pos"){
        if (obj.sticky_pos>0){
          arr.push({"name":"Sticky ("+obj.sticky_pos+")","population":obj.sticky_pos})
          listItems_pos.push('sticky')
        }
        if (obj.permeate_pos>0){
          arr.push({"name":"Permeate ("+obj.permeate_pos+")","population":obj.permeate_pos})
          listItems_pos.push('permeate')
        }
        if (obj.stain_pos>0){
          arr.push({"name":"Stain ("+obj.stain_pos+")","population":obj.stain_pos})
          listItems_pos.push('stain')
        }
        if (obj.smell_pos>0){
          arr.push({"name":"Smell ("+obj.smell_pos+")","population":obj.smell_pos})
          listItems_pos.push('smell')
        }
        if (obj.moist_pos>0){
          arr.push({"name":"Moist ("+obj.moist_pos+")","population":obj.moist_pos})
          listItems_pos.push('moist')
        }
        if (obj.irritate_pos>0){
          arr.push({"name":"Irritate ("+obj.irritate_pos+")","population":obj.irritate_pos})
          listItems_pos.push('irritate')
        }
        if (obj.waterproof_pos>0){
          arr.push({"name":"Waterproof ("+obj.waterproof_pos+")","population":obj.waterproof_pos})
          listItems_pos.push('waterproof')
        }
        if (obj.sunproof_pos>0){
          arr.push({"name":"Sunproof ("+obj.sunproof_pos+")","population":obj.sunproof_pos})
          listItems_pos.push('sunproof')
        }
      }else{
        if (obj.sticky_neg>0){
          arr.push({"name":"Sticky ("+obj.sticky_neg+")","population":obj.sticky_neg})
          listItems_neg.push('sticky')
        }
        if (obj.permeate_neg>0){
          arr.push({"name":"Permeate ("+obj.permeate_neg+")","population":obj.permeate_neg})
          listItems_neg.push('permeate')
        }
        if (obj.stain_neg>0){
          arr.push({"name":"Stain ("+obj.stain_neg+")","population":obj.stain_neg})
          listItems_neg.push('stain')
        }
        if (obj.smell_neg>0){
          arr.push({"name":"Smell ("+obj.smell_neg+")","population":obj.smell_neg})
          listItems_neg.push('smell')
        }
        if (obj.moist_neg>0){
          arr.push({"name":"Moist ("+obj.moist_neg+")","population":obj.moist_neg})
          listItems_neg.push('moist')
        }
        if (obj.irritate_neg>0){
          arr.push({"name":"Irritate ("+obj.irritate_neg+")","population":obj.irritate_neg})
          listItems_neg.push('irritate')
        }
        if (obj.waterproof_neg>0){
          arr.push({"name":"Waterproof ("+obj.waterproof_neg+")","population":obj.waterproof_neg})
          listItems_neg.push('waterproof')
        }
        if (obj.sunproof_neg>0){
          arr.push({"name":"Sunproof ("+obj.sunproof_neg+")","population":obj.sunproof_neg})
          listItems_neg.push('sunproof')
        }
      }
    }

    if (key=="pos"){
      this.setState({listItems_pos})
    }
    else{
      this.setState({listItems_neg}) 
    }
    
    return arr
  }

  renderElementGraph(data,prompt){
    let pallete_pos = [
        // {'r':0,'g':39,'b':9},
        {'r':0,'g':73,'b':9},
        {'r':4,'g':107,'b':0},
        {'r':11,'g':133,'b':0},
        {'r':0,'g':178,'b':21},
        {'r':74,'g':229,'b':74},
        {'r':164,'g':251,'b':166},
        
        {'r':201,'g':223,'b':138},
        {'r':240,'g':247,'b':218},
    ]
    let pallete_neg =[
      {'r':104,'g':7,'b':23},
      {'r':149,'g':34,'b':53},
      {'r':184,'g':39,'b':62},
      {'r':224,'g':68,'b':91},
      {'r':225,'g':103,'b':124},

      {'r':255,'g':186,'b':186},
      {'r':255,'g':212,'b':212},

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
        fontSize: 12,
        fontWeight: true,
        color: '#ECF0F1'
      },
    }
    let pallete = prompt=="POSITIVE"? pallete_pos:pallete_neg;
    // onPress={ () => { Actions.comments({ cosmetic : this.props.cosmetic,details:this.props.cosmetic_details[0], prompt: prompt})}}
    return  <TouchableWithoutFeedback onPress={ ()=> {this.refs.modal3.open();this.setState({selectVal:prompt})} } >
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color: prompt=="POSITIVE"? 'green':'red',fontWeight:'bold',fontSize:15}} >{prompt}</Text>
                <Pie data={data}
                  options={options}
                  accessorKey="population"
                  pallete={
                    pallete
                  }
                  />
              </View>
            </TouchableWithoutFeedback>
  }
  
  renderGraph(){
    if (!this.state.searching){
      var data_pos = this.state.data_pos
      var data_neg = this.state.data_neg
      if (data_pos.length>0 && data_neg.length >0)
        return <View style={{flex:1}}>
                  {this.renderElementGraph(data_pos,"POSITIVE")}
                  {this.renderElementGraph(data_neg,"NEGATIVE")}
                </View>
      else if (data_pos.length>0)
        return <View style={{flex:1}}>
                  {this.renderElementGraph(data_pos,"POSITIVE")}
                </View>
      else if (data_neg.length>0)
        return <View style={{flex:1}}>
                  {this.renderElementGraph(data_neg,"NEGATIVE")}
                </View>
    }
  }

  // dropListColorTone(){
  //   this.setState({
  //     color_list_pos:'green',
  //     color_list_neg:'red',
  //   })
  // }

  navToComments(feature,kind){
    // this.dropListColorTone()
    kind = kind.toLowerCase()
    let item_id = this.props.cosmetic.item_id
    let item_type = this.props.cosmetic.type
    // this.props.queryComments(item_id,type,feature,kind)
    let data ={
      item_id,
      item_type,
      feature,
      kind,
    }
    Actions.comments({data})
  }

  renderModal(){
    let arr = []
    if (this.state.selectVal == "POSITIVE"){
      this.state.listItems_pos.map(obj => {
        arr.push(<TouchableWithoutFeedback  key={obj} onPress={ ()=> this.navToComments(obj,this.state.selectVal) }>
                    <View>
                      <Text style={[styles.listText,{color:this.state.color_list_pos}]}>{obj.toUpperCase()}</Text>
                    </View>
                  </TouchableWithoutFeedback>)
      })
    }else{
      this.state.listItems_neg.map(obj => {
        arr.push(<TouchableWithoutFeedback  key={obj} onPress={ ()=> this.navToComments(obj,this.state.selectVal) }>
                    <View>
                      <Text style={[styles.listText,{color:this.state.color_list_neg}]}>{obj.toUpperCase()}</Text>
                    </View>
                  </TouchableWithoutFeedback>)
      })
    }
    return arr
  }
  render() {
   return (
          <Container stlye={styles.wrapper}>
              <Header>
                  <Button transparent onPress = {()=> Actions.pop()} >
                      <Icon name="ios-arrow-back" />
                  </Button>
                  <Title> Opinion Analysis Graph</Title>
                  <Button transparent>
                      <Icon name="ios-menu" />
                  </Button>
              </Header>

              <View style={{flex:1}}>
                  {this.renderGraph()}
                  <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                    <Text style={styles.text}>{this.state.selectVal}</Text>
                    {this.renderModal()}
                  </Modal>
              </View>

          </Container>    

    );
  }

}

const styles = StyleSheet.create({
   wrapper: {
    paddingTop: 50,
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 300,
    width: 300
  },
  text: {
    color: "black",
    fontSize: 22,
    padding:10,

  },
  listText: {
    color: "black",
    fontSize: 15,
    padding:4,
    fontWeight:'bold',
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    padding: 10,

  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 
    num : state.num,
    cosmetic_details : state.cosmeticDetails,
    login_details: state.login_details
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);

// <Button onPress={() => this.setState({isDisabled: !this.state.isDisabled})} style={styles.btn}>Disable ({this.state.isDisabled ? "true" : "false"})</Button>