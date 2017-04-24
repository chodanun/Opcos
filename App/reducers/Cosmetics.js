import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const cosmetics_autocom_details = createReducer({},{
	[types.SET_COSMETICS_AUTOCOMPLETE_INPUT](state,action){
		// console.log(action.res)
		return action.res
	}
})

export const searchedCosmetics = createReducer({},{
	[types.SET_SEARCHED_COSMETICS](state, action){
		let newState = {}
		var count = 0
		action.cosmetics.forEach( (cosmetic) => {
			newState[count] = Object.assign({keyId: count},cosmetic)
			count+=1
		})
		return newState
	}
});

export const cosmeticDetails = createReducer({},{
	[types.SET_DETAILS_COSMETIC](state, action){
		let newState = Object.assign({},action.cosmetic)
		return newState
	}
});

export const cosmeticCount = createReducer(0,{
	[types.SET_SEARCHED_COSMETICS](state, action){
		return action.cosmetics.length
	}
})

export const comments = createReducer({},{
	[types.SET_COMMENTS](state, action){
		return action.comment
	}
})

export const barcode_number = createReducer(null,{
	[types.SET_BARCODE_NUMBER](state, action){
		return action.obj.data
	}
})

export const default_item_barcode = createReducer({
	name: '',
	barcode:'',
	description:'',
	img:'',
	brand:'',
},{
	[types.SET_DEFAULT_ITEM_BARCODE](state, action){
		return action.resp
	}
})

export const recommended_items = createReducer({},{
	[types.SET_RECOMMENDED_ITEMS](state, action){
		return action.res
	}
})