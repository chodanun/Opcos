import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const status_user = createReducer(null,{
	[types.SET_STATUS_USER](state, action){
		// console.log(action.loggedIn)
		return action.status
	}
})

