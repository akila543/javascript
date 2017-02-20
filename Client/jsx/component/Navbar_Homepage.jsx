import React from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
//import Login from '../component/Login.jsx';

const styles = {
  title: {
    cursor: 'pointer',
  },
  appBar:{
    position:'fixed',
    opacity:0.8,
    background:'black'
  }
};

class Navbar_Homepage extends React.Component{

render(){
return(

  <AppBar title="Octopus" style={styles.appBar}  >

</AppBar>

);}
}
  export default Navbar_Homepage;
