import firebase from 'firebase';
import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';
import {saveToken} from '../lib/token'
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

export function logOut(token,loginMethod){
	console.log(loginMethod)
    if (loginMethod == "firebase"){
    	firebase.auth().signOut()	
    	Actions.auth()
    }else{
    	LoginManager.logOut()
    	return (dispatch) => {
			// for facebook -> update isLogin in token-table to be false
			let route = `/api/logout/${token}`
			Api.get(route).then(resp => {
				Actions.auth()
				dispatch(clearLoginDetails())
			}).catch( err =>{
				// console.log(err)
			})

			// done by componentwillmount in login (firebase)
			// dispatch(updateStatusUser(logout_obj)) 
		}
    }
    return {
    	type:'UNUSE'
    }
	
}
export function setUserDetails(user_profile){
	return {
		type : types.SET_USER_DETAILS, 
		user_profile,
	}
}

export function setLoginDetails(resp){
	// console.log(resp)
	saveToken(resp)
	return{
		type : types.SET_LOGIN_DETAILS,
		resp
	}
}

export function insertCheckInfo (info){
	return (dispatch)=>{
		const route = `/api/newuser`
		Api.post(route,info).then(resp => {
			dispatch(setLoginDetails(resp))
		}).catch( err =>{
			// console.log(err)
		})
	}
}

export function checkToken(token){
	return (dispatch)=> {
		return new Promise( (resolve, reject)=>{
			let route = `/api/checkToken/${token}`
			Api.get(route).then(resp=>{
				if (resp[0].isLogin == 1){
					// loged in
					Actions.main()
					dispatch(setLoginDetails(resp[0]))
					// dispatch(setUserDetails(resp))
					resolve(resp[0].isLogin)
				}else{
					resolve(resp[0].isLogin)
				}
			}).catch(err=>{
				// console.log(err)
				reject(err)
			})
		})
	}
}

export function clearLoginDetails(){
	let resp = {
		isLogin: 0,
		token: '',
		uid: null,
	}
	return{
		type : types.SET_LOGIN_DETAILS,
		resp
	}
}