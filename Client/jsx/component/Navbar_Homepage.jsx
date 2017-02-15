import React from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
  appBar:{
    position:'fixed',
    opacity:0.8
  }
};

class Navbar_Homepage extends React.Component{

render(){
return(

  <AppBar title="StagePiper" style={styles.appBar} >
      <a href="https://github.com/login/oauth/authorize?client_id=58edf1ba4d5ee26c7673">
    <Tabs>
        <Tab label="Login" />
    </Tabs>
      </a>

</AppBar>

);}
}
  export default Navbar_Homepage;
