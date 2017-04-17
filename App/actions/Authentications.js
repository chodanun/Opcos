import firebase from 'firebase';
import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
} = FBSDK;

export function updateStatusUser(obj){
	console.log(obj)
	return (dispatch) => {
		dispatch({
		  	type : types.SET_STATUS_USER,
		  	obj,
		})
		if (obj.isLogin){
		  	Actions.main()
		  	if (obj.loginMethod == "facebook"){
				const route = `/me?fields=id,name,email,birthday,picture.height(400){url}&access_token=${token}`
			    return Api.fb_get(route).then(resp => {
			    	dispatch(setUserDetails({user_profile : resp}))
			      	// console.log(resp)
			    }).catch( (ex) => {
			      console.log(ex);
			    })
			}
			else if (obj.loginMethod == "firebase"){
				dispatch(setUserDetails({email : obj.email}))
			}
		}
		// Default to Actions.auth()
	}
}

export function logOut(){
	let logout_obj = {
		email: '',
		isLogin: false,
		loginMethod: '',
	}
	firebase.auth().signOut()
    LoginManager.logOut()
	Actions.auth()
	return (dispatch) => {
		dispatch(loginTokenFacebook(null))
		dispatch(updateStatusUser(logout_obj))

	}
}
export function setUserDetails(user_profile){
	return {
		type : types.SET_USER_DETAILS, 
		user_profile,
	}
}

export function setUserDetails_noObj(user_profile){
	return {
		type : types.SET_USER_DETAILS,
		user_profile,
	}
}

export function loginTokenFacebook(token){
	return {
		type : types.SET_LOGIN_TOKEN_FACEBOOK,
		token
	}
}

// react native router flux
// const loginUserSuccess = (dispatch, user) => {
//   dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
 
//   Actions.employeeList();
// };