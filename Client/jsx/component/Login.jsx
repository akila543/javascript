import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Link,hashHistory} from 'react-router';
import request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import Request from 'superagent';
import FlatButton from 'material-ui/FlatButton';


export default class UserLogin extends Component {
constructor(props) {
super(props);
this.state={
userName:"",
password:"",
socket: null,
nameError:"",
passwordError:""
}

this.handleUserNameChange=this.handleUserNameChange.bind(this);
this.handlePasswordChange=this.handlePasswordChange.bind(this);
this.handleClick=this.handleClick.bind(this);

}

componentDidMount() {

}

handleUserNameChange(e){
this.setState({userName:e.target.value,nameError:""})
}

handlePasswordChange(e){
this.setState({passwordName:e.target.value,passwordError:""})

}

handleClick(){


//hashHistory.push('/dashboard');

}


render() {

return (
<div>
<RaisedButton label="Login"  href={"https://github.com/login/oauth/authorize?client_id=7342dac8b3d3acbcbe2c&scope=user"} style={{marginTop:"50px"}} labelStyle={{color:"white"}} buttonStyle={{background:"#3F51B5 "}} onClick={this.handleClick}/>
</div>
);
}}
