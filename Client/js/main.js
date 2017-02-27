import React from 'react';
import ReactDOM from 'react-dom';
import App from '../jsx/view/App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router,Route,hashHistory} from "react-router";
import Monitoring from "../jsx/component/Monitoring.jsx";
import WorkFlowEdit from "../jsx/component/WorkFlowEdit.jsx";
import WorkFlowList from "../jsx/component/WorkFlowList.jsx";
import Initiate from "../jsx/component/Initiate.jsx";
import AdminInitiate from "../jsx/component/AdminInitiate.jsx";
import User from "../jsx/component/NewUser.jsx";
import cookie from 'react-cookie';
import Dashboard from "../jsx/component/Dashboard.jsx";
import SelectRepo from "../jsx/component/selectRepo.jsx";
import ChooseWorkflow from "../jsx/component/ChooseWorkflow.jsx";
import FinalResult from "../jsx/component/FinalResult.jsx";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan900
,indigo700,white } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
 palette: {
primary1Color:cyan900
,
}
});
function autherize(nextState,replace)
{
    if(cookie.load("access_token")===undefined){
            replace({pathname:'/'});
        }
}
injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
        <Route path={"/"} component={App}/>

        <Route path="/chooseworkflow/:user/:repo"  component={ChooseWorkflow} onEnter={autherize} />
        <Route path={"/user"} component={User} onEnter={autherize}/>
        <Route path={"/finalresult/:jobId"} component={FinalResult} onEnter={autherize}/>
             <Route path={"/dashboard"} component={Dashboard} onEnter={autherize}>
              <Route path={"/monitor"} component={Monitoring} onEnter={autherize}/>
             <Route path={"/edit"} component={WorkFlowEdit} onEnter={autherize}/>
             <Route path={"/workflows"} component={WorkFlowList} onEnter={autherize}/>
             <Route path={"/AdminPipeline"} component={AdminInitiate} onEnter={autherize}/>
        </Route>
     </Router>
    </MuiThemeProvider>, document.getElementById('app'));
