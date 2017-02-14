import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style={
textAlign:'center',
margin:"15% 0 15% 0",
fontFamily: 'Kanit',
};

class Body_Homepage extends React.Component{
render(){
return(
  <div style={style}>
      <h1 style={{color:'#3F51B5',fontSize:'50px'}}>BUILD and TEST with Confidence</h1>
      <p style={{fontSize:'25px',color:'#546E7A'}}>StagePiper unifies issues, code review, CI into a single UI</p>
  </div>
);}
}
export default Body_Homepage;
