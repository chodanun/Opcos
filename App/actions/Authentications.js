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
		// console.log("fetch facebook user detail")
		const route = `/me?fields=id,name,email,birthday,picture{url}&access_token=${token}`
		// console.log(route)
	    return Api.fb_get(route).then(resp => {
	    	// dispatch(setUserDetails({user_details : resp}))
	      	console.log(resp)
	    }).catch( (ex) => {
	      console.log(ex);
	    })
	}
	}
	else
	  Actions.auth()
	}
}

export function setUserDetails(user_details){
	return {
		type : types.SET_USER_DETAILS,
		user_details
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