import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Link,hashHistory} from 'react-router';
import request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import cookie from 'react-cookie';

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

cookie.save('userId',this.state.userName);
cookie.save('passwordName',this.state.passwordName);
console.log(this.state,"posting request");

if(this.state.userName==""||this.state.passwordName=="")

{
if(this.state.userName=="")
this.setState({nameError:"Please Enter a User Name"});
if(this.state.passwordName=="")
this.setState({passwordError:"Please Enter a password Name"});
}
else{

request

.post('http://172.23.238.193:8000/UserLogin')
.send({ UserName: this.state.userName, passwordName: this.state.passwordName })
.end((err,res)=>{
console.log("this is result.text : ",res.text);
console.log(res,"this is response",err);
hashHistory.push('/bob');

});
}
}

render() {

return (

<div style={{height:"100%"}}>

<center style={{height:"100%"}}>
<Grid  style={{height:'100%', width:"60%"}}>
<Row style={{ height:'100%',overflow:'hidden',width:"100%"}}>
<Col xs={12} sm={12} md={12} lg={12} style={{height:'100%'}}>
<Paper zDepth={3} style={{width:"100%",height:"100%",marginTop:"30px"}}>
<h2>Log In</h2>
<form onSubmit={this.handleClick}>
<TextField hintText="UserName" style={{marginTop:"50px"}} floatingLabelText="UserName" value={this.state.userName} onChange={this.handleUserNameChange} errorText={this.state.nameError}/><br />
<TextField hintText="password" floatingLabelText="password" value={this.state.passwordName} onChange={this.handlePasswordChange} errorText={this.state.passwordError}/><br />
<RaisedButton label="Login"  style={{marginTop:"50px"}} labelStyle={{color:"white"}} buttonStyle={{background:"#3F51B5 "}} onClick={this.handleClick}/>
</form>

</Paper>
</Col>
</Row>
</Grid>
</center>

</div>
);
}}
