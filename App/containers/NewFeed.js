import React , { Component } from 'react'
import ReactNative from 'react-native'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Card, CardItem, Thumbnail, InputGroup, Input, Icon, List, ListItem, CheckBox, Button, Text} from 'native-base'
import Autocomplete from 'react-native-autocomplete-input';
import { Icon as Icons } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
const {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} = ReactNative

class NewFeed extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	  
	  }
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

	navToDetailsPage({cosmetic}){
		let item_id = cosmetic.item_id
		let uid = this.props.login_details.uid
		this.props.queryLogs(uid,item_id)
		// console.log(cosmetic)
		Actions.details({cosmetic})
		
	}

	renderRecItems(){
		const items = this.props.recommended_items
		if (items.length>0){
			return <View>
			{items.map( (item)=> {
				return (
					<Card key={item.item_id}>
                        <CardItem onPress={ () => this.navToDetailsPage({cosmetic:item}) }>
                            <Text style={styles.resultHeaderText}>{item.name}</Text>
                            <Text note style={{fontWeight: '400',fontSize: 14,}} >{item.brand}</Text>
                        </CardItem>

                        <CardItem onPress={ () => this.navToDetailsPage({cosmetic:item}) }>
                            <Image style={{ resizeMode: 'contain',width:300,alignSelf: 'center', }} source={{ uri: item.img}} />
                        </CardItem>

                        <CardItem onPress={ () => this.navToDetailsPage({cosmetic:item}) }>
                        	<View style={{flexDirection:'row'}} >
                        		{this.renderStart(item.score)}
                        		<Text> {item.score} ({item.reviews} review{item.reviews>0? 's':''})</Text>
                        	</View>
                        </CardItem>
                   </Card>
                 )
			})}
			</View>
		}
		
	}

	render(){
		return (
			<Container>
				 <ScrollView>
				 	{this.renderRecItems()}
                </ScrollView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
   resultHeaderText : {
  	flex: 1,
  	fontWeight: 'bold',
    fontSize: 15,
  },
});

function mapStateToProps(state){
	return {
		recommended_items: state.recommended_items,
		login_details : state.login_details,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewFeed)