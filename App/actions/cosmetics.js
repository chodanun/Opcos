import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';

export function fetchCosmetics(code){
	return (dispatch, getState) => {
    const params = [
      `i=${code}`,
      'p=1'
    ].join('&')
    return Api.get(`/api/?${params}`).then(resp => {
    	dispatch(setSearchedCosmetics({cosmetics : resp}))
      // Actions.search();
      	// console.log(resp)
    }).catch( (ex) => {
      console.log(ex);
    })
  }
}

export function setSearchedCosmetics({ cosmetics }){
	return {
		type : types.SET_SEARCHED_COSMETICS,
		cosmetics
	}
}

export function add(){
	return {
		type : types.ADD,
	}
}


// react native router flux
// const loginUserSuccess = (dispatch, user) => {
//   dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
 
//   Actions.employeeList();
// };