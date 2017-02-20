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

<RaisedButton label="Login  with  Github" labelStyle={{height: '20px'}} href={"https://github.com/login/oauth/authorize?client_id=f04e898ce84f9ea04158"} style={{marginTop:"50px"}} labelStyle={{color:"white"}} buttonStyle={{background:"#3F51B5 "}} onClick={this.handleClick}/>



</div>
);
}}
