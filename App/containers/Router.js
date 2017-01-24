import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ApplicationTabs from './ApplicationTabs'
import Search from './Search'
import LoginForm from './LoginForm'
import RegisterForm  from './RegisterForm'

 
const RouterComponent = () => {
 return (
   <Router >

		<Scene key="auth" sceneStyle= {{ paddingTop:65 }} >
			<Scene key="login" component={LoginForm} title="Authentication" />
			<Scene key="regist" component={RegisterForm} title="Register Form" />
		</Scene>

		<Scene key="main" >
			<Scene 
				key="home" 
				component={ApplicationTabs}
				title="Opcos"
				onRight={() => Actions.search()}
        		rightTitle="Scan"
        		hideNavBar
        	/>
     		<Scene key="search" component={Search} title="Search" hideNavBar/>
		</Scene>
   </Router>
 );
};
 
export default RouterComponent;

// <Scene 
// 				key="home" 
// 				component={ApplicationTabs} 
// 				title="Opcos"
// 				onRight={() => Actions.search()}
//         		rightTitle="Scan"/>
//      		<Scene key="search" component={Search} title="Search" />