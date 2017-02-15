import React from 'react';
import ReactDOM from 'react-dom';
import App from '../jsx/view/App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router,Route,hashHistory} from "react-router";
import AddTemplate from "../jsx/component/AddTemplate.jsx";
import Monitoring from "../jsx/component/Monitoring.jsx";
import Dashboard from "../jsx/component/Dashboard.jsx";
import WorkFlowEdit from "../jsx/component/WorkFlowEdit.jsx";
import WorkFlowList from "../jsx/component/WorkFlowList.jsx";
// import Dashboard from "../jsx/component/Dashboard.jsx";

injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider>
	<Router history={hashHistory}>
		<Route path={"/"} component={App} />
		 <Route path={"/dashboard"} component={Dashboard} >
			 <Route path={"/edit"} component={WorkFlowEdit} />
			 <Route path={"/workflows"} component={WorkFlowList} />
			 <Route path={"/monitor"} component={Monitoring} />

		</Route>

	 </Router>
	</MuiThemeProvider>, document.getElementById('app'));
