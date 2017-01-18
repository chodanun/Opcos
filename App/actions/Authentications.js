import firebase from 'firebase';
import * as types from './types'
import Api from '../lib/api'
import { Actions } from 'react-native-router-flux';

export function updateStatusUser(status){
	return (dispatch) => {
		dispatch({
	  type : types.SET_STATUS_USER,
	  status,
	})
	if (status)
	  Actions.main()
	else
	  Actions.auth()
	}
}


// react native router flux
// const loginUserSuccess = (dispatch, user) => {
//   dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
 
//   Actions.employeeList();
// };