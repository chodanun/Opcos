import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';

export function fetchLogs(uid){
  return (dispatch)=>{
    const route = `/api/log/fetches/${uid}`
      return Api.get(route).then(resp => {
        dispatch(storeLogs(resp))
      }).catch(err=>{
        console.log(err)
      })  
  }
}

export function storeLogs(resp){
  return{
    type: types.SET_ITEM_LOGS,
    resp
  }
}

export function queryLogs(uid,item_id){
  // console.log(item_id,uid)
  return (dispatch)=>{
    const route = `/api/log/stores/${uid}/${item_id}`
      return Api.get(route).then(resp => {
        console.log(resp)
        return{
          type: 'STORES_LOG',
        }
      })  
  }
}