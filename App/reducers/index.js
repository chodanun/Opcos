import { combineReducers } from 'redux'
import * as CosmiticsReducers from './Cosmetics'
import * as Authentications from './Authentications'
import * as Logs from './Logs'

export default combineReducers(Object.assign(
	CosmiticsReducers,
	Authentications,
	Logs,
));