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
	TouchableOpacity,
	StyleSheet,
	TouchableWithoutFeedback,
} = ReactNative
import { Container, Content, Card, CardItem, Thumbnail, InputGroup, Input, Icon, List, ListItem, CheckBox, Button} from 'native-base'
import { Icon as Icons } from 'react-native-elements'
import { RadioButtons } from 'react-native-radio-buttons'
import { Actions } from 'react-native-router-flux';

class Shop extends Component {

	constructor(props) {
	  super(props)
	  this.state = { 
	  	searching: false,
	  	cosmeticsInput: this.props.barcode? this.props.barcode:'',
	  	searchOption : false,
	  	searchChecked: [true,false,false,false],
	  	searchName : 'Search by name',
	  	
	  }
	}

	componentWillMount(){
		if (this.props.barcode){
			this.checkedPress(3)
			// this.setState({ searching:true })
			// this.props.fetchCosmetics(this.props.barcode,"Search by barcode").then( () => {
			// 	this.setState( {searching: false})
			// })
		}
		
	}

	searchedPress(){
		this.setState({ searching:true })
		this.props.fetchCosmetics(this.state.cosmeticsInput,this.state.searchName).then( () => {
			this.setState( {searching: false, cosmeticsInput:''})
		})
	}

	cosmetics(){
		return Object.keys(this.props.searchedCosmetics).map( key => this.props.searchedCosmetics[key])
	}

	checkedPress(index){
		// console.log(obj.target)
		// console.log(this.state.searchChecked[0])
		switch (index){
			case 0 :
			// console.log("0")
				this.setState({ searchChecked: [true,false,false,false] , searchName: 'Search by name'})
				break
			case 1:
				// console.log("1")
				this.setState({ searchChecked: [false,true,false,false], searchName: 'Search by brand' }) 
				break
			case 2:
				this.setState({ searchChecked: [false,false,true,false], searchName: 'Advance searching' }) 
				// console.log("2")
				break
			default :
				this.setState({ searchChecked: [false,false,false,true], searchName: 'Search by barcode' }) 
				// console.log("3")
		}
		// this.setState({searchIndex:0})
	}
	renderSearchOption(){
		if (this.state.searchOption)
			return 	<List>
                        <ListItem>
                            <CheckBox checked={this.state.searchChecked[0]} onPress={ ()=> this.checkedPress(0) }/>
                            <Text>Search by name</Text>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={this.state.searchChecked[1]} onPress={ ()=> this.checkedPress(1) } />
                            <Text>Search by brand</Text>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={this.state.searchChecked[2]} onPress={ ()=> this.checkedPress(2) } />
                            <Text>Advance Searching</Text>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={this.state.searchChecked[3]} onPress={ ()=> this.checkedPress(3) } />
                            <Text>Search by barcode</Text>
                        </ListItem>
                    </List>
	}

	searchOptionPress(){
		this.setState({
			searchOption:!this.state.searchOption
		})
	}

	navToDetailsPage({cosmetic}){
		Actions.details({cosmetic})
		// this.props.navToDeatils({cosmetic})
	}

	renderStart(score){
		if (score <= 1)
			return <Icons name='star' color='red' size={15} />
		else if (score <= 2)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
					</View>
		else if (score <= 3)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
					</View>
		else if (score <= 4)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
					</View>
		else if (score <= 5)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
					</View>					

	}
	render(){
		return (
			<Container style={styles.container}>
				<Content style={styles.content} >
					<View style= {styles.searchOption}>
						<InputGroup borderType='rounded' style={styles.searchBar}>
							<Icon
								name='ios-search' 
								style={{paddingLeft:10,}} 
							/>
	            			<Input 
	            				onFocus = { () => this.setState({searchOption:false,}) }
	            				placeholder= {this.state.searchName}
	            				onChangeText={ (cosmeticsInput) => this.setState({cosmeticsInput})}
								value={this.state.cosmeticsInput}
								onSubmitEditing={()=> this.searchedPress()}
	            			/>
		            	</InputGroup>
		            	<View style={styles.option}>
		            		<Icons name='build' onPress={ ()=> this.searchOptionPress() } color = {this.state.searchOption ? 'black' : 'blue'} />
		            	</View>
	            	</View>
	            	{this.renderSearchOption()}
	            	
            		<ScrollView style={styles.scrollView} >
							{!this.state.searching && this.cosmetics().map( (cosmetic) => {
								return 	<TouchableOpacity key={cosmetic.item_id} >
											 <Card >

						                        <CardItem onPress={ () => this.navToDetailsPage({cosmetic}) }>
						                            <Thumbnail source={ { uri: cosmetic.img } }  />
							                            <Text style={styles.resultHeaderText} >{cosmetic.name}</Text>
						                            <Text note style={{fontWeight: '400',fontSize: 11,}} >{cosmetic.brand}</Text>
						                        </CardItem>

						                        <CardItem cardBody onPress={ () => this.navToDetailsPage({cosmetic}) }>
						                        	<View style={{flexDirection:'row',justifyContent:'flex-end'}} >
							                        	<Text style={styles.scoreInfo} >
							                        		{cosmetic.score}({cosmetic.reviews} reviews)
							                            </Text>
							                            {this.renderStart(cosmetic.score)}
						                            </View>
						                            <Image style={{ resizeMode: 'contain' }} source = { { uri: cosmetic.img } } />
						                            <Text>
						                                {cosmetic.description} 
						                            </Text>
						                             <Text style={styles.textInfo}>
						                                Matching Point : {cosmetic.point}
						                            </Text>
						                        </CardItem>
						                   </Card>
									</TouchableOpacity>
							})}
						
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
  	flex:10,
  },
  scrollView:{
  	flex:1,
  },
  resultHeaderText : {
  	flex: 1,
  	fontWeight: 'bold',
    fontSize: 15,
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
  	
  },
  searchOption:{
  	flexDirection: 'row',
  },
  option:{
  	flex:1,
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	paddingTop:5,
  },
  textInfo:{
  	color: '#87838B',
  	fontSize: 15,
  	paddingTop:4,
  },
  scoreInfo:{
  	color: '#87838B',
  	fontSize: 12,
  },


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
