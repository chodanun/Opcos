import firebase from 'firebase';
import React , { Component, PropTypes} from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const {
	ScrollView,
	View,
	TextInput,
	Text,
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
		this.setState({ searching:true })
		this.props.fetchCosmetics(this.state.cosmeticsInput).then( () => {
			this.setState( {searching: false})
		})
	}

	cosmetics(){
		return Object.keys(this.props.searchedCosmetics).map( key => this.props.searchedCosmetics[key])
	}

	render(){
		// console.log(this.cosmetics())
		return (
			<View style={styles.scene}>
				<View style={styles.searchSection}>
					<TextInput style={styles.searchInput} 
						returnKeyType='search'	
						placeholder='search cosmetics'
						onChangeText={ (cosmeticsInput) => this.setState({cosmeticsInput})}
						value={this.state.cosmeticsInput}
					/>
					<TouchableHighlight onPress={()=> this.searchedPress()} style={styles.searchButton}>
						<Text>
							Fetch Cosmetics
						</Text>
					</TouchableHighlight>
				</View>
				<ScrollView style={styles.scrollSection}>
					{!this.state.searching && this.cosmetics().map( (cosmetic) => {
						return <View key={cosmetic.id} >
							<Image source={ { uri: cosmetic.thumbnail } } style={styles.resultImage} />
							<Text style={styles.resultText} > {cosmetic.title} </Text>
						</View>
					})}
					{this.state.searching ? <Text> Searching</Text> : null} 
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20,
  },
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
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
  resultImage : {
  	height : 150,
  },
  resultText : {
  	backgroundColor : '#000',
  	color : '#FFF',
  	height : 20 ,
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