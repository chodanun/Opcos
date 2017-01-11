import { combineReducers } from 'redux'
import * as cosmiticsReducers from './cosmetics'

export default combineReducers(Object.assign(
	cosmiticsReducers,
));