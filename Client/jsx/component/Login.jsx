import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Link,hashHistory} from 'react-router';
import request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import Request from 'superagent';

//import FlatButton from 'material-ui/FlatButton';


export default class UserLogin extends Component {
render() {

return (

<div>

<RaisedButton className="GithubLink" label="Login  with  Github" labelStyle={{height: '20px'}} href={"https://github.com/login/oauth/authorize?client_id=7342dac8b3d3acbcbe2c"} labelStyle={{color:"white"}} buttonStyle={{background:"#FF5722 "}} onClick={this.handleClick} icon={<i className="material-icons" style={{color: 'white'}}>account_box
</i>}/>



</div>
);
}}
