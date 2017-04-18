import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';

export function fetchCosmetics(input,option){
	return (dispatch, getState) => {
    const params = [
      `${input}`,
    ].join('&')
    var route = "";
    if (option == "Search by name"){
      route = `/api/search/byName/${params}`
    }
    else if (option == "Search by barcode"){
      route = `/api/search/byBarcode/${params}`
    }
    return Api.get(route).then(resp => {
    	dispatch(setSearchedCosmetics({cosmetics : resp,option}))
      // console.log(resp)
    }).catch( (ex) => {
      console.log(ex);
    })
  }
}

export function queryComments(item_id,type,feature,kind){
  return (dispatch, getState) => {
    route = `/api/search/item-comments/${item_id}/${type}/${feature}/${kind}`
    return Api.get(route).then(resp => {
      dispatch(setComments({comment:resp}))
    }).catch( (ex) => {
      console.log(ex);
    })
  }
}

export function setComments({comment}){
  return {
    type : types.SET_COMMENTS,
    comment
  }
}

export function setSearchedCosmetics({ cosmetics }){
	return {
		type : types.SET_SEARCHED_COSMETICS,
		cosmetics
	}
}

export function loadOpinionFiles(cosmetic){
  var item_id = cosmetic.item_id
  var item_type = cosmetic.type
  return (dispatch, getState) => {
    const route = `/api/search/itemOpinion/${item_type}/${item_id}`
    return Api.get(route).then(resp => {
      dispatch(setItemDetails(resp))
    }).catch( (ex) => {
      console.log(ex);
    })
  }
  
}

export function setItemDetails(cosmetic) {
  return{
    type : types.SET_DETAILS_COSMETIC,
    cosmetic
  }
}

export function setBarcodeNumber(obj) {
  return{
    type: types.SET_BARCODE_NUMBER,
    obj
  }
}
