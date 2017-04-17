import firebase from 'firebase';
import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
} = FBSDK;

export function updateStatusUser(obj){
	return (dispatch) => {
		dispatch({
		  	type : types.SET_STATUS_USER,
		  	obj,
		})
		if (obj.isLogin){
		  	Actions.main()
		  	if (obj.loginMethod == "facebook"){
		  		let token = obj.token
				const route = `/me?fields=id,name,email,birthday,picture.height(400){url}&access_token=${token}`
			    return Api.fb_get(route).then(resp => {
			    	dispatch(setUserDetails(resp))
			      	dispatch(insertCheckInfo(resp))
			    }).catch( (ex) => {
			      console.log(ex);
			    })
			}
			else if (obj.loginMethod == "firebase"){
				dispatch(setUserDetails({email: obj.email}))
			}
		}
		// Default to Actions.auth()
	}
}

export function logOut(){
	firebase.auth().signOut()
    LoginManager.logOut()
	Actions.auth()
	return (dispatch) => {
		dispatch(loginTokenFacebook(null))
		// done by componentwillmount in login (firebase)
		// dispatch(updateStatusUser(logout_obj)) 
	}
}
export function setUserDetails(user_profile){
	return {
		type : types.SET_USER_DETAILS, 
		user_profile,
	}
}

export function setLoginDetails(resp){
	console.log(resp)
	return{
		type : types.SET_LOGIN_DETAILS,
		resp
	}
}

export function insertCheckInfo (info){
	return (dispatch)=>{
		// console.log(info)
		const route = `/api/newuser`
		Api.post(route,info).then(resp => {
			// console.log(resp)
			dispatch(setLoginDetails(resp))
		}).catch( err =>{
			console.log(err)
		})

	}
	
}