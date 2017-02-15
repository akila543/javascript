import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

const style = {
  height: 120,
  width: 120,
  margin: 20,
  background: 'white',
  textAlign: 'center',
  display: 'inline-block',
  marginTop:'10%',
  };

const styling = {
  height: 20,
  width: 120,
  margin: 20,
  color: 'blue',
  background: 'white',
  textAlign: 'center',
  display: 'inline-block',
  marginBottom:'10%'
};

export default class Homepage extends React.Component {
render() {
return (
<div>

  <Paper style={style} zDepth={5}  circle={true} >
    <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/Octocat.png" alt="git" /></Paper>

  <Paper style={style} zDepth={5} circle={true} >
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/build.png" alt="git" /> </Paper>

  <Paper style={style} zDepth={5} circle={true} >
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/eslint.png" alt="git" /> </Paper>

  <Paper style={style} zDepth={5} circle={true} >
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}}src="../jsx/images/download.jpg" alt="git" /> </Paper>

  <Paper style={style} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/whit.png" alt="git" /> </Paper>

  <Paper style={style} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/code-review.png" alt="git" /> </Paper>

  <Paper style={style} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/codecoverage.png" alt="git" /> </Paper>

  <Paper style={style} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/execute.jpg" alt="git" /> </Paper>
<br></br>

<Paper style={styling} zDepth={5}  square={true} >
  Clone</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    Build</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    eslint</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    htmlhint</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    Whitebox</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    code review</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    code coverage</Paper>

<Paper style={styling} zDepth={5}  square={true} >
    execute</Paper>



  </div>
);
}
}
