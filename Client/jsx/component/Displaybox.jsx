import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 600,
  width: 800,
  margin: '50px 0 0 150px',
  textAlign: 'center',
  display: 'inline-block',
};

class Displaybox extends React.Component{
render(){
return(
  <div >

        <Paper style={style} zDepth={2} />
  </div>

);
}}
  export default Displaybox;
