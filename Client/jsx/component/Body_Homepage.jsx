
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import Login from '../component/Login.jsx';

const style={
textAlign:'center',
//margin:"0% 0% 0% 0",
fontFamily: 'Kanit',
};

class Body_Homepage extends React.Component{
render(){
return(
<div styles= {{backgroundcolor:"gainsboro"}}>
<div style = {{marginTop:'8.5%',marginBottom:'5%'}}>
<center><h1> Build and Test with Confidence</h1></center>
<center><p style={{fontSize:'25px',color:'#004D40'}}>Octopus unifies issues, code review, CI into a single UI</p></center>
<center><Login/></center>
</div>
<div style = {{marginTop:'4.5%'}}>
<Card>
<CardMedia
      overlay={<CardTitle title="Deployement Ready!!" subtitle="Easily sync your GitHub projects with Octopus and you will be testing your code in no time.!
" />}
    >
      <img src="../jsx/images/5.jpg" style={{height:'700px',width:'80%',marginTop:-'10%'}} />

    </CardMedia>
		</Card>
</div>
</div>
)
}
}
export default Body_Homepage;
