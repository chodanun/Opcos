'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class Search extends Component {

	onBarCodeRead(obj){
		// console.log(obj.data)
		this.props.setBarcodeNumber(obj)
		Actions.home() 
		
	}

	render() {
		return (
		  <View style={styles.container}>
			<Camera
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
    flex: 1
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
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  }
})
function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)

// <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>