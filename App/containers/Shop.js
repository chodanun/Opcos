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
	  	// cosmeticsInput: this.props.barcode? this.props.barcode:'',
	  	searchOption : false,
	  	searchChecked: [true,false,false,false],
	  	searchName : 'Search by name',
	  	cosmetics: [],
      	query: this.props.barcode? this.props.barcode:'',
	  }
	}

	componentWillMount(){
		this.props.queryCosmetics() // for search name -> autoCompleteInput
		if (this.props.barcode){
			this.checkedPress(3)
		}	
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.cosmetics_autocom_details.length>0){
			this.setState({ cosmetics :nextProps.cosmetics_autocom_details});
		} 
	}


	findCosmetic(query) {
		let arr = []
		let count = 1
	    if (query === '') {
	      return arr
	    }
	    const { cosmetics } = this.state;

		// var res = query.split(" ");
		// console.log(res)
	    const regex = new RegExp(`${query.trim()}`, 'i');
	    var check=true
	    for(let i = 0 ; i<this.props.cosmetics_autocom_details.length;i++){
	    	if (count > 8)
	    		return arr
	    	if (cosmetics[i].name.search(regex)>=0){
	    		arr.push(cosmetics[i])
	    		count++
	    	}
	    	// if (cosmetics[i].name.search(regex)>=0) {
	    	// 	res.forEach( item =>{
	    	// 		if (cosmetics[i].name.search(new RegExp(`${res[i]}`, 'i'))<0)
	    	// 			check=false
	    	// 	})
	    	// 	if (check){
	    	// 		arr.push(cosmetics[i])
	    	// 		count++
	    	// 	}
	    		
	    	// }
	    }
	    return arr
	    // return cosmetics.filter( cosmetic => {
	    // 	return cosmetic.name.search(regex) >= 0
	    // });
	}
	
	renderArrSearching(cosmetics){
		return <View>
					<List 
						dataArray={cosmetics}
                    	renderRow={(item) =>
	                        <ListItem TouchableOpacity onPress={() => this.searchedPress(item.name)} >
	                            <Text>{item.name}</Text>
	                        </ListItem>
	                    }>
					</List>
			</View>
	}

	searchedPress(name=null){
		this.setState({ searching:true })
		this.props.fetchCosmetics(name? name: this.state.query,this.state.searchName).then( () => {
			this.setState( {searching: false, query:''})
		})
	}

	cosmetics(){
		return Object.keys(this.props.searchedCosmetics).map( key => this.props.searchedCosmetics[key])
	}

	checkedPress(index){
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
		let item_id = cosmetic.item_id
		let uid = this.props.login_details.uid
		this.props.queryLogs(uid,item_id)
		console.log(cosmetic)
		Actions.details({cosmetic})
		// this.props.navToDeatils({cosmetic})
	}

	renderStart(score){
		var star_half = <View/>
		if (score%1>=0.3 && score%1<=0.7)
			star_half =  <Icons name='star-half' color='red' size={15} />
		else if (score%1>0.7)
			star_half =  <Icons name='star' color='red' size={15} />


		if (score <= 1)
			return <View style={{flexDirection:'row'}} >
						{star_half}
					</View>
		else if (score < 2)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						{star_half}
					</View>
		else if (score < 3)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						{star_half}
					</View>
		else if (score < 4)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						{star_half}
					</View>
		else if (score < 5)
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						{star_half}
					</View>
		else
			return <View style={{flexDirection:'row'}} >
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						<Icons name='star' color='red' size={15} />
						{star_half}
					</View>	
	}

	renderMatching(id){
		if (id==0){
			if (this.props.searchedCosmetics[0].point == 100){
				return <View style={styles.view_header_matching} >
			                <Text style={styles.text_header_matching} >Found 1 item matching!!</Text>
						</View>
			}else if (this.props.searchedCosmetics[0].point < 100){
				return <View style={styles.view_header_matching} >
			                <Text style={styles.text_header_similar} >Found {this.props.cosmeticCount} similar items</Text>
						</View>
			}else{
				return <View/>
			}
		}
		if (id==1 && this.props.searchedCosmetics[0].point == 100){
			return <View style={styles.view_header_matching} >
		                <Text style={styles.text_header_similar} >Found {this.props.cosmeticCount-1} similar items</Text>
					</View>
		}
		
	}

	render(){
		const { query } = this.state;
	    const cosmetics = this.findCosmetic(query);

		return (
			<Container style={styles.container}>
			
			<View style={styles.container}>
					<View style= {styles.searchOption}>
						<InputGroup borderType='rounded' style={styles.searchBar}>
							<Icon
								name='ios-search' 
								style={{paddingLeft:10,}} 
							/>
	            			<Input 
	            				autoCorrect={false}
	            				onFocus = { () => this.setState({searchOption:false,}) }
	            				placeholder= {this.state.searchName}
	            				onChangeText={text => this.setState({ query: text })}
								value={this.state.query}
								onSubmitEditing={()=> this.searchedPress()}
	            			/>
		            	</InputGroup>
		            	<View style={styles.option}>
		            		<Icons name='build' onPress={ ()=> this.searchOptionPress() } color = {this.state.searchOption ? 'black' : 'blue'} />
		            	</View>
	            	</View>
	            	<View>
		            	{this.renderSearchOption()}
	            	</View>
	            	<View>
		            	{this.renderArrSearching(cosmetics)}
	            	</View>
            		<ScrollView style={styles.scrollView} >
							{!this.state.searching && this.cosmetics().map( (cosmetic) => {
								return 	<View key={cosmetic.keyId}>
										{this.renderMatching(cosmetic.keyId)}
										<TouchableOpacity  >
											 <Card >
						                        <CardItem onPress={ () => this.navToDetailsPage({cosmetic}) }>
						                            <Thumbnail source={ { uri: cosmetic.img } }  />
							                            <Text style={styles.resultHeaderText} >{cosmetic.name}</Text>
						                            <Text note style={{fontWeight: '400',fontSize: 11,}} >{cosmetic.brand}</Text>
						                        </CardItem>

						                        <CardItem cardBody onPress={ () => this.navToDetailsPage({cosmetic}) }>
						                        	<View style={{flexDirection:'row',justifyContent:'flex-end'}} >
							                        	<Text style={styles.scoreInfo} >
							                        		{cosmetic.score+' '}({cosmetic.reviews} reviews)
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
									</View>
									
							})}
					</ScrollView>
			</View>
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
  	// paddingBottom: 5
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
  text_header_matching:{
  	paddingTop:5,
  	color:'green',
  	fontWeight:'bold',
  	fontSize: 15,
  },
  view_header_matching:{
  	alignItems:'center',
  	// borderColor:'#BEB5B4',
  	// borderWidth:2,
  	marginTop:5,
  },
  text_header_similar:{
  	paddingTop:5,
  	color:'#D4670B',
  	fontWeight:'bold',
  	fontSize: 15,
  },
  itemText:{
  	flex:0.1
  },
 

});

function mapStateToProps(state){
	return {
		searchedCosmetics : state.searchedCosmetics,
		login_details: state.login_details,
		default: state.default_item_barcode,
		cosmeticCount: state.cosmeticCount,
		cosmetics_autocom_details : state.cosmetics_autocom_details
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop)
