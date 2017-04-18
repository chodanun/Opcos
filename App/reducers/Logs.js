import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const item_logs = createReducer({},{
	[types.SET_ITEM_LOGS](state, action){
		return action.resp
	}
});
