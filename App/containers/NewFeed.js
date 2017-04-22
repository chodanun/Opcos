import React , { Component } from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Card, CardItem, Thumbnail, InputGroup, Input, Icon, List, ListItem, CheckBox, Button, Text} from 'native-base'
import Autocomplete from 'react-native-autocomplete-input';
const {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
} = ReactNative

class NewFeed extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	  cosmetics: [],
	      query: '',
	  }
	}

	componentWillMount(nextProps){
		this.props.queryCosmetics() // for search name -> autoCompleteInput
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.cosmetics_autocom_details.length>0){
			this.setState({ cosmetics :nextProps.cosmetics_autocom_details});
		}   
	}

	findCosmetic(query) {
	    if (query === '') {
	      return [];
	    }
	    const { cosmetics } = this.state;
	    const regex = new RegExp(`${query.trim()}`, 'i');
	    return cosmetics.filter(cosmetic => cosmetic.name.search(regex) >= 0);
	}

	renderCosmetic(cosmetic) {
	    const { name , description } = cosmetic;
	    return (
	      <View>
	        <Text style={styles.titleText}>{name} , {description}</Text>
	      </View>
	    );
	  }
	
	render(){
		 const { query } = this.state;
	    const cosmetics = this.findCosmetic(query);
	    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

		return (
			<Container>
			<View style={styles.container}>
				
		        <View style={styles.descriptionContainer}>
		          {cosmetics.length > 0 ? (
		            this.renderCosmetic(cosmetics[0])
		          ) : (
		            <Text style={styles.infoText}>
		              ENTER COSMETIC NAME {1}
		            </Text>
		          )}
		        </View>
			</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  
});

function mapStateToProps(state){
	return {
		searchedCosmetics : state.searchedCosmetics,
		cosmetics_autocom_details: state.cosmetics_autocom_details,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewFeed)