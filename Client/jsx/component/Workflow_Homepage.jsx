import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

const style = {

  };

const styling = {

};

export default class Homepage extends React.Component {
render() {
return (
<div style={{marginTop:'%'}}>


  <center><h1 style={{fontSize:'35px',marginTop:'10% align:center'}}>Workflow Process</h1></center>
  <br></br>
  <br></br>

  <Paper style={{height: '120px',width: '120px',textAlign: 'center',background: 'white',  display: 'inline-block',marginLeft: '3%'}} zDepth={5}  circle={true} >
    <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/Octocat.png" alt="git" /></Paper>

  <img style={{height:'2%',width:'2%',marginLeft:'1%'}} src="../jsx/images/arrow.jpg" alt="git" />

  <Paper style={{height: '120px',width: '120px',textAlign: 'center',background: 'white',  display: 'inline-block',marginLeft: '4%'}} zDepth={5} circle={true} >
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/build.png"alt="git" /> </Paper>

  <img style={{height:'2%',width:'2%',marginLeft:'1%'}} src="../jsx/images/arrow.jpg" alt="git" />

  <Paper style={{height: '120px',width: '120px',textAlign: 'center',background: 'white',  display: 'inline-block',marginLeft: '4%'}} zDepth={5} circle={true} >
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/eslint.png" alt="git" /> </Paper>

   <img style={{height:'2%',width:'2%',marginLeft:'1%'}} src="../jsx/images/arrow.jpg" alt="git" />

  <Paper style={{height: '120px',width: '120px',textAlign: 'center',background: 'white',  display: 'inline-block',marginLeft: '4%'}} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/whit.png" alt="git" /> </Paper>

  <img style={{height:'2%',width:'2%',marginLeft:'1%'}} src="../jsx/images/arrow.jpg" alt="git" />

  <Paper style={{height: '120px',width: '120px',textAlign: 'center',background: 'white',  display: 'inline-block',marginLeft: '4%'}} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/code-review.png" alt="git" /> </Paper>

   <img style={{height:'2%',width:'2%',marginLeft:'1%'}} src="../jsx/images/arrow.jpg" alt="git" />

  <Paper style={{height: '120px',width: '120px',textAlign: 'center',background: 'white',  display: 'inline-block',marginLeft: '4%'}} zDepth={5}  circle={true}>
  <img style={{height:'50%',width:'50%',margin:'25% 10% 10% 10%'}} src="../jsx/images/codecoverage.png" alt="git" /> </Paper>


<br></br>

<Paper style={{height:'20px',width:'120px',display:'inline-block',marginLeft:'3%',marginRight:'2%',textAlign: 'center'}} zDepth={5}  square={true} >
  Clone</Paper>

<Paper style={{height:'20px',width:'120px',display:'inline-block',marginLeft:'6%',textAlign: 'center',marginBottom:'10%',marginTop:'2%'}} zDepth={5}  square={true} >
    Build</Paper>

  <Paper style={{height:'20px',width:'120px',display:'inline-block',marginLeft:'6%',marginRight:'1%',textAlign: 'center',marginBottom:'10%',marginTop:'2%'}} zDepth={5}  square={true} >
    Lint</Paper>



  <Paper style={{height:'20px',width:'120px',display:'inline-block',marginLeft:'6%',marginRight:'1%',textAlign: 'center',marginBottom:'10%',marginTop:'2%'}} zDepth={5}  square={true} >
    Whitebox</Paper>

  <Paper style={{height:'20px',width:'120px',display:'inline-block',marginLeft:'6%',marginRight:'1%',textAlign: 'center',marginBottom:'10%',marginTop:'2%'}} zDepth={5}  square={true} >
    code review</Paper>

<Paper style={{height:'20px',width:'120px',display:'inline-block',marginLeft:'6%',textAlign: 'center',marginBottom:'10%',marginTop:'2%'}} zDepth={5}  square={true} >
    code coverage</Paper>





  </div>
);
}
}
