import firebase from 'firebase';
import React , { Component, PropTypes} from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Card, CardItem, Text} from 'native-base'
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
	  this.state = { searching: false ,cosmeticsInput: ''};
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
			<View style={styles.scene}>
				<View style={styles.searchSection}>
					<TextInput style={styles.searchInput} 
						returnKeyType='search'	
						placeholder='Search name'
						onChangeText={ (cosmeticsInput) => this.setState({cosmeticsInput})}
						value={this.state.cosmeticsInput}
						onSubmitEditing={()=> this.searchedPress()}
					/>
				</View>

				<ScrollView style={styles.scrollSection}>
				<Container>
					<Content>
						<Card>
								{!this.state.searching && this.cosmetics().map( (cosmetic) => {
									return 	<View key={cosmetic.id} style={styles.card} >
											<CardItem header style={styles.resultHeaderText}>
												<Text> {cosmetic.id+1}.  {cosmetic.title} </Text>
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
					</Content>
				</Container>
				</ScrollView>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  searchSection: {
    height: 25,
    // borderBottomColor: '#000',
    // borderBottomWidth: 1,
    padding: 5,
    flexDirection : 'row',
  },
  searchInput: {
  	flex:0.7,
  },
  searchButton: {
  	flex:0.3,
  },
  scrollSection: {
    flex: 0.8,
  },
  
  card : {
  	flex : 1,
  },
  resultHeaderText : {
  	// backgroundColor : '#000',
  	// color : '#FFF',
  	// height : 20 ,
  },
  list : {
  	flexDirection: 'row',
  	// marginTop : 10,
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
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop)