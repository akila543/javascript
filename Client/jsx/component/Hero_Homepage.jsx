import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style={

  width:'100%'
};

class Hero_Homepage extends React.Component{

render(){
return(
  <div >
  <Card style={style}>

  <CardMedia>

  <img src="../jsx/images/hero2.png" />


  </CardMedia>
  </Card>

  </div>
  );}
}
export default Hero_Homepage;
