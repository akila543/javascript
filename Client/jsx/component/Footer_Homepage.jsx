import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const style={
  
};

export default class Footer_Homepage extends React.Component{
render(){
  return(
<div style={style}>

  <Toolbar style={{backgroundColor:'#8C9EFF'}} >

  <FlatButton label="Site Privacy" />
   <ToolbarSeparator />
   <FlatButton label="Advertise" />
   <ToolbarSeparator />
   <FlatButton label="Terms" />
   <ToolbarSeparator />
   <FlatButton label="About Us" />

</Toolbar>
</div>

);}
}
