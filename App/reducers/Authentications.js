import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const status_user = createReducer(null,{
	[types.SET_STATUS_USER](state, action){
		// console.log(action.loggedIn)
		return action.obj.isLogin
	}
})

export const login_method = createReducer(null,{
	[types.SET_STATUS_USER](state, action){
		return action.obj.loginMethod
	}
})

export const login_token = createReducer(null,{
	[types.SET_LOGIN_TOKEN_FACEBOOK](state, action){
		return action.token
	}
})

export const user_profile = createReducer({},{
	[types.SET_USER_DETAILS](state, action){
		return action.user_profile
	}
})