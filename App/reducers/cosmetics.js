import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedCosmetics = createReducer({},{
	[types.SET_SEARCHED_COSMETICS](state, action){
		let newState = {}
		let id = 0
		action.cosmetics.forEach( (cosmetic) => {
			// console.log(cosmetic)
			newState[id] = Object.assign(cosmetic,{id})
			id++
		})
		return newState
	}
});

export const cosmeticCount = createReducer(0,{
	[types.SET_SEARCHED_COSMETICS](state, action){
		return action.cosmetics.length
	}
})

export const num = createReducer(0,{
	[types.ADD](state, action){
		return state+10
	}
})

export const barcode_number = createReducer(0,{
	[types.SET_BARCODE_NUMBER](state, action){
		return action.obj.data
	}
})

