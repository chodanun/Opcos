import {AsyncStorage} from 'react-native'

export async function fetchToken(){
	try {
	  const value = await AsyncStorage.getItem('token');
	  if (value !== null){
	    // We have data!!
	    // console.log(value)
	    return value
	  }
	} catch (error) {
	  // Error retrieving data
	  console.log(error)
	}
}

export async function saveToken(obj){
	try {
	  await AsyncStorage.setItem('token',obj.token);
	} catch (error) {
	  console.log(error)
	}

}

export async function removeToken(obj){
	try {
	  await AsyncStorage.removeItem('token');
	} catch (error) {
	  console.log(error)
	}
}
