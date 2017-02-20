import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Request from 'superagent';
import cookie from 'react-cookie';
import {Link,hashHistory} from 'react-router';

class DashNavbar extends React.Component{
	constructor(){
		super();
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLogout()
	{
		cookie.remove("access_token");
		cookie.remove("type");

	}
render(){
return(
  <AppBar title="Stage Piper"   iconElementRight={ <Link to="/"><FlatButton label="Logout" onClick={this.handleLogout}/></Link> }/>

);}
}
export default DashNavbar;
