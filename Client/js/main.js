import React from 'react';
import ReactDOM from 'react-dom';
import App from '../jsx/view/App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router,Route,hashHistory} from "react-router";
import Monitoring from "../jsx/component/Monitoring.jsx";
import Dashboard from "../jsx/component/Dashboard.jsx";
import WorkFlowEdit from "../jsx/component/WorkFlowEdit.jsx";
import WorkFlowList from "../jsx/component/WorkFlowList.jsx";
import List_User from "../jsx/component/List_User.jsx";
import Initiate from "../jsx/component/Initiate.jsx";
import User_Dashboard from "../jsx/component/User_Dashboard.jsx";
import cookie from 'react-cookie';
// import Dashboard from "../jsx/component/Dashboard.jsx";


function autherize(nextState,replace)
{
	if(cookie.load("access_token")===undefined){
			replace({pathname:'/'});
		}
}

injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider>
	<Router history={hashHistory}>
		<Route path={"/"} component={App}/>
		<Route path={"/user"} component={User_Dashboard} onEnter={autherize}>
				<Route path={"/monitori"} component={Monitoring} onEnter={autherize} />
				<Route path={"/pipeline"} component={Initiate} onEnter={autherize} />
		</Route>
		 <Route path={"/dashboard"} component={Dashboard} onEnter={autherize}>
			  <Route path={"/monitor"} component={Monitoring} onEnter={autherize}/>
			 <Route path={"/edit"} component={WorkFlowEdit} onEnter={autherize}/>
			 <Route path={"/workflows"} component={WorkFlowList} onEnter={autherize}/>

		</Route>


	 </Router>
	</MuiThemeProvider>, document.getElementById('app'));
