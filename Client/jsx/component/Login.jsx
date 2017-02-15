import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Link,hashHistory} from 'react-router';
import request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
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


hashHistory.push('/dashboard');

}


render() {

return (

<div>
<FlatButton label="Sign in with Github" style={{marginTop:'8%'}} onClick={this.handleClick}/>
</div>
);
}}
