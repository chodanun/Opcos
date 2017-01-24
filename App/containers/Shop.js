import firebase from 'firebase';
import React , { Component, PropTypes} from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Card, CardItem, Text, InputGroup, Input, Icon, Header, Title, Button} from 'native-base'
const {
	ScrollView,
	View,
	TextInput,
	Image,
	TouchableHighlight,
	StyleSheet,
} = ReactNative



class Shop extends Component {
	constructor(props) {
	  super(props)
	  this.state = { 
	  	searching: false,
	  	cosmeticsInput: '',
	  	
	  }
	}

	searchedPress(){
		this.setState({ searching:true, cosmeticsInput: this.state.cosmeticsInput + " ... in searching " })
		this.props.fetchCosmetics(this.state.cosmeticsInput).then( () => {
			this.setState( {searching: false, cosmeticsInput:''})
		})
	}

	cosmetics(){
		return Object.keys(this.props.searchedCosmetics).map( key => this.props.searchedCosmetics[key])
	}

	render(){
		return (
			<Container style={styles.container}>
				<Content style={styles.content} >
					<InputGroup borderType='rounded' style={styles.searchBar} >
						<Icon 
							name='ios-search' 
							style={{paddingLeft:10,}} 
						/>
            			<Input
            				placeholder='Search option'
            				onChangeText={ (cosmeticsInput) => this.setState({cosmeticsInput})}
							value={this.state.cosmeticsInput}
							onSubmitEditing={()=> this.searchedPress()}
            			/>
	            	</InputGroup>
            		<ScrollView style={styles.scrollView} >
            		<Text>{this.props.barcode_number}</Text>
						<Card>
							{!this.state.searching && this.cosmetics().map( (cosmetic) => {
								return 	<View key={cosmetic.id}  >
										<CardItem header >
											<Text style={styles.resultHeaderText}> {cosmetic.id+1}.  {cosmetic.title} </Text>
										</CardItem>
										<CardItem style={ styles.list }>
											<Image style={styles.resultImageDetail} source={ { uri: cosmetic.thumbnail } }  />
											<View>
												<Text style={{marginTop:5}} >rate : </Text>
												<Text >Description : </Text>
												<Text style={styles.resultDescriptionDetail}> {cosmetic.ingredients} </Text>
											</View>
										</CardItem>
										</View>
							})}
						</Card>
					</ScrollView>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  searchBar:{
  	marginTop:10,
  	marginLeft:10,
  	marginRight:10,
  },
  scrollView:{
  	marginTop:-10,
  },
  resultHeaderText : {
  },
  list : {
  	flexDirection: 'row',
  },
  resultImageDetail : {
  	resizeMode : 'contain',
  	height : 150,
  	width : 150,
  	margin : 10,
  },
  resultDescriptionDetail : {
  	
  }


});

function mapStateToProps(state){
	return {
		searchedCosmetics : state.searchedCosmetics,
		barcode_number : state.barcode_number,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop)

// <Container style={styles.container}>
				
// 				<Content style={styles.content} >
// 					<InputGroup borderType='rounded' >
// 						<Icon 
// 							name='ios-search' 
// 							style={{paddingLeft:10,}} 
// 						/>
//             			<Input
//             				placeholder='Search option'
//             				onChangeText={ (cosmeticsInput) => this.setState({cosmeticsInput})}
// 							value={this.state.cosmeticsInput}
// 							onSubmitEditing={()=> this.searchedPress()}

//             			/>
            			
// 	            	</InputGroup>
//             		<ScrollView style={styles.scrollView} >
//             		<Text>{this.props.barcode_number}</Text>
// 						<Card>
// 							{!this.state.searching && this.cosmetics().map( (cosmetic) => {
// 								return 	<View key={cosmetic.id}  >
// 										<CardItem header >
// 											<Text style={styles.resultHeaderText}> {cosmetic.id+1}.  {cosmetic.title} </Text>
// 										</CardItem>
// 										<CardItem style={ styles.list }>
// 											<Image style={styles.resultImageDetail} source={ { uri: cosmetic.thumbnail } }  />
// 											<View>
// 												<Text style={{marginTop:5}} >rate : </Text>
// 												<Text >Description : </Text>
// 												<Text style={styles.resultDescriptionDetail}> {cosmetic.ingredients} </Text>
// 											</View>
// 										</CardItem>
// 										</View>
// 							})}
// 						</Card>
// 					</ScrollView>
// 				</Content>
// 			</Container>