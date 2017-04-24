import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';

export function fetchCosmetics(input,option){
	return (dispatch, getState) => {
    let json = {
      "barcode":input,
      "name":input,
    }
    var route = "";
    if (option == "Search by name"){
      route = `/api/search/byName/`
    }
    else if (option == "Search by barcode"){
      route = `/api/search/byBarcode/`
    }
    return Api.post(route,json).then(resp => {
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

export function setItemDetails(cosmetic){
  return{
    type : types.SET_DETAILS_COSMETIC,
    cosmetic
  }
}

export function setBarcodeNumber(obj){
  return{
    type: types.SET_BARCODE_NUMBER,
    obj
  }
}

export function queryInfoBarcode(barcode){
  return (dispatch)=>{
    let route = `/api/search/info_barcode/${barcode}`
    return Api.get(route).then( resp => {
      // console.log(resp)
      dispatch(setDefaultItemBarcode(resp))
    })
  }
}

export function setDefaultItemBarcode(resp){
  return {
    type: types.SET_DEFAULT_ITEM_BARCODE,
    resp
  }
}

export function queryCosmetics(){
  return (dispatch)=>{
    return new Promise ( (resolve, reject)=>{
      let route = `/api/search/all/`
      return Api.get(route).then(res => {
        // console.log(res)
        dispatch(setQueryCosmetics(res))
      })  
    })
  }
}

export function setQueryCosmetics(res){
  return {
    type: types.SET_COSMETICS_AUTOCOMPLETE_INPUT,
    res
  }
}

export function loadRecItems(uid){
  return (dispatch)=>{
    return new Promise ( (resolve, reject)=>{
      let route = `/api/recommendedItems/${uid}`
      return Api.get(route).then(res => {
        // console.log(res)
        dispatch(setRecommendedItems(res))
      })  
    })
  }
}

export function setRecommendedItems(res){
  return {
    type: types.SET_RECOMMENDED_ITEMS,
    res
  }
}
