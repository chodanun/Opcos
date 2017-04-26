'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Spinner } from 'native-base';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  // Button,
} from 'react-native';
import { Button } from 'native-base';
import Camera from 'react-native-camera';
import Modal from 'react-native-modalbox';
class Search extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	barcode: null,
	  	searching:false,
	  	findingButton:false,
	  };
	}

	onCloseModalBox(){
		this.setState({
			searching:false,
			barcode:null,
		})
	}

	findButton(){
		this.setState({searching:false,findingButton:true})
		this.props.fetchCosmetics(this.state.barcode,"Search by barcode").then( ()=>{
			Actions.home()
		})
	}
	onBarCodeRead(obj){
		if (!this.state.searching){
			this.setState({barcode:obj.data,searching:true})
			this.props.queryInfoBarcode(obj.data).then( ()=> {
				this.refs.modal3.open()
			}).catch( ()=> {
				// alert("NOT FOUND ("+this.state.barcode+")")
				this.refs.modal2.open()
			})	
		}
		
	}

	// componentDidMount(){ // debuging
	// 	setInterval( ()=>this.onBarCodeRead({'data':'79666185604'}),2000) 
	// }

	renderButtonModal(){
		if (this.state.findingButton)
			return <Spinner color='black'/>
		else
			return <Button style={[styles.btn,{left:35}]} onPress={()=>this.findButton()} >OPCOS SEARCH</Button>
	}

	renderModal(){		
		return	<View style={{alignItems:'center',justifyContent:'center'}}>
					<Text style={[styles.text,{color:'green'}]}>Barcode : {this.props.default.barcode}</Text>
					<Text style={styles.text}>{this.props.default.name}</Text>
					{this.renderButtonModal()}
				</View>

	}

	renderCamera(){
		if (!this.state.searching)
		return <Camera
					style={styles.preview}
					aspect={Camera.constants.Aspect.fill}
					barcodeScannerEnabled = {true}
					onBarCodeRead={ (obj) => this.onBarCodeRead(obj)}
					ref={(cam) => {
						this.camera = cam;
					}}
				>
					<View style={styles.rectangleContainer}>
						<View style={styles.rectangle} />
					</View>
				</Camera>
	}
	render() {
		return (
				<View style={styles.container}>
					{this.renderCamera()}
					<Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={false} onClosed={ ()=> this.onCloseModalBox()}>
			          {this.renderModal()}
			        </Modal> 
			        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal2"} isDisabled={false} onClosed={ ()=> this.setState({searching:false}) }>
			          <Text style={[styles.text,{color:'red',alignItems:'center'}]}> NOT FOUND</Text>
			           <Text style={[styles.text,{color:'red',alignItems:'center'}]}>"{this.state.barcode}"</Text>
			        </Modal> 
				  </View>
		);
	}

  takePicture() {
	this.camera.capture()
	  .then((data) => console.log(data))
	  .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  preview: {
	flex: 1,
	justifyContent: 'flex-end',
	alignItems: 'center',
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width
  },
  capture: {
	flex: 0,
	backgroundColor: '#fff',
	borderRadius: 5,
	color: '#000',
	padding: 10,
	margin: 40
  },
   rectangleContainer: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'transparent'
  },
  rectangle: {
	height: Dimensions.get('window').height/2,
	width: 220,
	borderWidth: 2,
	borderColor: '#00FF00',
	backgroundColor: 'transparent'
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal3: {
    height: 250,
    width: 250,
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    fontSize: 18,
    padding:5,
    fontWeight:'bold',
  }
})
function mapStateToProps(state){
	return {
		default: state.default_item_barcode
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)

// <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>