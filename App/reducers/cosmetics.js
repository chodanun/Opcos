import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedCosmetics = createReducer({},{

});

export const num = createReducer(0,{
	[types.ADD](state, action){
		return state+10
	}
});