import { combineReducers } from 'redux'
import * as CosmiticsReducers from './Cosmetics'
import * as Authentications from './Authentications'

export default combineReducers(Object.assign(
	CosmiticsReducers,
	Authentications,
));