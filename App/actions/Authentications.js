import firebase from 'firebase';
import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';

export function updateStatusUser(status,login_method,token){
	return (dispatch) => {
		dispatch({
		  	type : types.SET_STATUS_USER,
		  	status,
		  	login_method,
		})
		if (status){
		  	Actions.main()
		  	if (login_method == "facebook"){
				const route = `/me?fields=id,name,email,birthday,picture.height(400){url}&access_token=${token}`
			    return Api.fb_get(route).then(resp => {
			    	dispatch(setUserDetails({user_profile : resp}))
			      	// console.log(resp)
			    }).catch( (ex) => {
			      console.log(ex);
			    })
			}
		}
		// Default to Actions.auth()
	
	}
}

export function setUserDetails({user_profile}){
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

export function loginToken(token){
	return {
		type : types.SET_LOGIN_TOKEN,
		token
	}
}

// react native router flux
// const loginUserSuccess = (dispatch, user) => {
//   dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
 
//   Actions.employeeList();
// };