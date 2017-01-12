import * as types from './types'
import Api from '../lib/api'

export function fetchCosmetics(code){
	return (dispatch, getState) => {
    const params = [
      `i=${encodeURIComponent(code)}`,
      'p=1'
    ].join('&')
    return Api.get(`/api/?${params}`).then(resp => {
    	dispatch(setSearchedCosmetics({cosmetics : resp}))
      	// console.log(resp)
    }).catch( (ex) => {
      console.log(ex);
    });
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