import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ApplicationTabs from './ApplicationTabs'
import Search from './Search'
import LoginForm from './LoginForm'
import RegisterForm  from './RegisterForm'
import Details  from './Details'
import Comments  from './Comments'

 
const RouterComponent = () => {
 return (
   <Router >

		<Scene key="auth"  >
			<Scene key="login" component={LoginForm} title="Authentication" hideNavBar/>
		</Scene>
		<Scene key="regist" component={RegisterForm} title="Register" sceneStyle= {{ paddingTop:65 }} />
		<Scene key="main" >
			<Scene 
				key="home" 
				component={ApplicationTabs}
				title="Opcos"
				onRight={() => Actions.search()}
        		rightTitle="Scan"
        		hideNavBar
        	/>
        	<Scene key="details" component={Details} title="Deatils" />
        	<Scene key="comments" component={Comments} title="Comments" hideNavBar/>
     		<Scene key="barcodeSearch" component={Search} title="Search" hideNavBar/>
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