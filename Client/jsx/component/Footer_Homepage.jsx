import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const style={
};

export default class Footer_Homepage extends React.Component{
render(){
  return(
<div style={style}>

  <Toolbar style={{backgroundColor:'#8C9EFF'}} >
  <ToolbarTitle text="Site Privacy Policy" />
   <ToolbarSeparator />
   <ToolbarTitle text="Advertise"/>
   <ToolbarSeparator />
   <ToolbarTitle text="Terms"/>
   <ToolbarSeparator />
   <ToolbarTitle text="About Us"/>

</Toolbar>
</div>

);}
}
