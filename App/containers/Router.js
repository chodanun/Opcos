import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ApplicationTabs from './ApplicationTabs'
import Search from './Search'
import LoginForm from './LoginForm'
 
const RouterComponent = () => {
 return (
   <Router sceneStyle= {{ paddingTop:65 }}>
		<Scene key="auth" initial >
			<Scene key="login" component={LoginForm} title="Authentication" />
		</Scene>

		<Scene key="main" >
			<Scene 
				key="home" 
				component={ApplicationTabs} 
				title="Opcos"
				onRight={() => Actions.search()}
        		rightTitle="Scan"/>
     		<Scene key="search" component={Search} title="Search" />
		</Scene>
   </Router>
 );
};
 
export default RouterComponent;