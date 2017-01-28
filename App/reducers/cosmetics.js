import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedCosmetics = createReducer({},{
	[types.SET_SEARCHED_COSMETICS](state, action){
		let newState = {}
		action.cosmetics.forEach( (cosmetic) => {
			newState[cosmetic.id] = Object.assign(cosmetic)
		})
		return newState
	}
});

export const cosmeticCount = createReducer(0,{
	[types.SET_SEARCHED_COSMETICS](state, action){
		return action.cosmetics.length
	}
})

// export const num = createReducer(0,{
// 	[types.ADD](state, action){
// 		return state+10
// 	}
// })

export const barcode_number = createReducer(null,{
	[types.SET_BARCODE_NUMBER](state, action){
		return action.obj.data
	}
})

